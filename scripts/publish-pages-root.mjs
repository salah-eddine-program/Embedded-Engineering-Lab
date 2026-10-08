import { cp, copyFile, mkdir, readdir, rm, stat } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const buildDirectory = join(projectRoot, 'dist', 'pages');
const requiredFiles = ['index.html', '.nojekyll', 'favicon.svg', 'manus-routes.json'];
const buildAssets = join(buildDirectory, 'page-assets');
const publishedAssets = join(projectRoot, 'page-assets');
const mirrorDirectory = join(projectRoot, 'docs');

for (const filename of requiredFiles) {
  const source = join(buildDirectory, filename);
  if (!(await stat(source).catch(() => null))?.isFile()) {
    throw new Error(`Missing generated Pages file: ${filename}`);
  }
  await copyFile(source, join(projectRoot, filename));
}

if (!(await stat(buildAssets).catch(() => null))?.isDirectory()) {
  throw new Error('Missing generated Pages asset directory: page-assets');
}

await rm(publishedAssets, { recursive: true, force: true });
await cp(buildAssets, publishedAssets, { recursive: true });
await rm(mirrorDirectory, { recursive: true, force: true });
await mkdir(mirrorDirectory, { recursive: true });
for (const entry of await readdir(buildDirectory)) {
  await cp(join(buildDirectory, entry), join(mirrorDirectory, entry), { recursive: true });
}

console.log('GitHub Pages bundle copied to repository root and mirrored to docs/.');
