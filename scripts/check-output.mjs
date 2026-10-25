#!/usr/bin/env node
// Checks the built site (dist/) for the brief's hard rules:
//  - no banned words (WhatsApp, misspelled brand names)
//  - no third-party resources (src, link href, CSS url(), srcset)
//  - no inline <script> other than JSON-LD data blocks, no inline style attributes/blocks
//  - every internal link resolves to a built file or #fragment on that page
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative, posix } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const errors = [];

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

const exists = async (p) => {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
};

const banned = [
  /whats\s?app/i,
  /get\s?assisted/i,
  /\bGetAssist\b/,
  /gate\s?assist/i,
  /gat\s?assist/i,
  /asisist/i,
  // Brand name glued to a neighbouring word (formatter dropped a space).
  /Get Assist[a-z]/,
  /[a-z]Get Assist/,
];
const files = [];
for await (const f of walk(root)) files.push(f);

const htmlIds = new Map();
for (const file of files.filter((f) => f.endsWith('.html'))) {
  const html = await readFile(file, 'utf8');
  htmlIds.set(file, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}

for (const file of files) {
  const rel = relative(root, file).replaceAll('\\', '/');
  if (!/\.(html|css|js|xml|txt|svg|json)$/.test(file)) continue;
  const text = await readFile(file, 'utf8');

  for (const re of banned) {
    if (re.test(text)) errors.push(`${rel}: banned term ${re}`);
  }

  if (rel.endsWith('.css')) {
    for (const m of text.matchAll(/url\(\s*['"]?(https?:)?\/\//g)) {
      errors.push(`${rel}: external CSS url(): ${m[0]}`);
    }
    continue;
  }
  if (!rel.endsWith('.html')) continue;

  // Resource-loading attributes must be same-origin.
  for (const m of text.matchAll(/<(script|img|link|source|iframe|video|audio)\b[^>]*>/g)) {
    const tag = m[0];
    const kind = m[1];
    const rels = /\brel="([^"]+)"/.exec(tag)?.[1] ?? '';
    const isNavigationalLink = kind === 'link' && /\b(canonical|sitemap)\b/.test(rels);
    for (const a of tag.matchAll(/\b(src|href|srcset)="([^"]+)"/g)) {
      if (isNavigationalLink) continue;
      if (/(^|,\s*)(https?:)?\/\//.test(a[2]))
        errors.push(`${rel}: external ${kind} ${a[1]}=${a[2]}`);
    }
  }
  for (const m of text.matchAll(/<script\b([^>]*)>/g)) {
    const attrs = m[1];
    if (!/\bsrc=/.test(attrs) && !/type="application\/ld\+json"/.test(attrs)) {
      errors.push(`${rel}: inline script (breaks CSP)`);
    }
  }
  if (/<style\b/.test(text)) errors.push(`${rel}: inline <style> block (breaks CSP)`);
  if (/\sstyle="/.test(text)) errors.push(`${rel}: inline style attribute (breaks CSP)`);

  // Internal links.
  const dir = posix.dirname('/' + rel);
  for (const m of text.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = m[1];
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    const [pathPart, frag] = href.split('#');
    let target = file;
    if (pathPart) {
      const abs = pathPart.startsWith('/') ? pathPart : posix.join(dir, pathPart);
      const candidates =
        abs === '/'
          ? ['index.html']
          : [abs.slice(1), `${abs.slice(1)}.html`, `${abs.slice(1)}/index.html`];
      target = null;
      for (const c of candidates) {
        if (await exists(join(root, c))) {
          target = join(root, c);
          break;
        }
      }
      if (!target) {
        errors.push(`${rel}: broken link ${href}`);
        continue;
      }
    }
    if (frag && htmlIds.has(target) && !htmlIds.get(target).has(frag)) {
      errors.push(`${rel}: missing anchor ${href}`);
    }
  }
}

if (errors.length) {
  console.error(`check-output: ${errors.length} problem(s)\n  ` + errors.join('\n  '));
  process.exit(1);
}
console.log(
  `check-output: ${files.length} files OK (no banned terms, no external resources, links resolve).`,
);
