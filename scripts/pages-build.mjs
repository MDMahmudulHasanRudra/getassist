#!/usr/bin/env node
// Cloudflare Pages build command: `npm run build:pages`.
// Production branch builds must pass check-placeholders; preview branches may
// keep [[OWNER: ...]] placeholders (the staging equivalent of ALLOW_PLACEHOLDERS=1).
import { execSync } from 'node:child_process';

const productionBranch = process.env.PRODUCTION_BRANCH ?? 'main';
const branch = process.env.CF_PAGES_BRANCH;
const isProduction = !branch || branch === productionBranch;
const run = (cmd) => execSync(cmd, { stdio: 'inherit' });

run('npm run build');
run('npm run check:output');
if (isProduction) {
  run('npm run check:placeholders');
} else {
  console.log(`pages-build: preview branch "${branch}", placeholders allowed.`);
}
