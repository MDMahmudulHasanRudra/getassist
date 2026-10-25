#!/usr/bin/env node
// Fails when any [[OWNER: ...]] placeholder remains in the built site (dist/).
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const pattern = /\[\[OWNER: ([^\]]+)\]\]/g;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (/\.(html|xml|txt|json)$/.test(entry.name)) yield path;
  }
}

const found = new Map();
for await (const file of walk(root)) {
  const text = await readFile(file, 'utf8');
  for (const match of text.matchAll(pattern)) {
    const need = match[1];
    if (!found.has(need)) found.set(need, new Set());
    found.get(need).add(relative(root, file).replaceAll('\\', '/'));
  }
}

if (found.size === 0) {
  console.log('check-placeholders: no owner placeholders left.');
  process.exit(0);
}

console.error(`check-placeholders: ${found.size} owner fact(s) still missing:\n`);
for (const [need, files] of found) {
  console.error(`  - ${need}\n      in ${[...files].sort().join(', ')}`);
}
process.exit(1);
