const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const DOCS_ROOT = path.join(__dirname, '..');
const DOCS_DIR = path.join(DOCS_ROOT, 'docs');
const DOCS_MAP = path.join(DOCS_ROOT, 'static', 'goose-docs-map.md');
const TMP_DIR = path.join(DOCS_ROOT, '.tmp', 'goose-docs-bundle');
const STAGE_DIR = path.join(TMP_DIR, 'goose-docs');
const OUTPUT_FILE = path.join(DOCS_ROOT, 'goose-docs.tar.gz');

function toPosixPath(file) {
  return file.replace(/\\/g, '/');
}

function normalizeBundleDocPath(relativeFile) {
  return toPosixPath(relativeFile).replace(/\.mdx$/, '.md');
}

function bundlePathForDocFile(relativeFile) {
  return path.posix.join('docs', normalizeBundleDocPath(relativeFile));
}

function isBundleDocFile(relativeFile) {
  const normalized = toPosixPath(relativeFile);
  const isMarkdown = /\.(md|mdx)$/.test(normalized);
  const isIncludedSection =
    normalized.startsWith('getting-started/') || normalized.startsWith('guides/');

  return isMarkdown && isIncludedSection;
}

function resolveDocsPath(relativeFile) {
  return path.join(DOCS_DIR, ...toPosixPath(relativeFile).split('/'));
}

function resolveStagePath(bundlePath) {
  return path.join(STAGE_DIR, ...toPosixPath(bundlePath).split('/'));
}

async function main() {
  const { globby } = await import('globby');

  if (!fs.existsSync(DOCS_MAP)) {
    throw new Error('Missing static/goose-docs-map.md. Run scripts/generate-docs-map.js first.');
  }

  fs.rmSync(TMP_DIR, { recursive: true, force: true });
  fs.rmSync(OUTPUT_FILE, { force: true });

  try {
    fs.mkdirSync(STAGE_DIR, { recursive: true });
    fs.copyFileSync(DOCS_MAP, path.join(STAGE_DIR, 'goose-docs-map.md'));

    const files = await globby(['getting-started/**/*.{md,mdx}', 'guides/**/*.{md,mdx}'], {
      cwd: DOCS_DIR,
    });

    for (const file of files.filter(isBundleDocFile).sort()) {
      const destination = resolveStagePath(bundlePathForDocFile(file));
      fs.mkdirSync(path.dirname(destination), { recursive: true });
      fs.copyFileSync(resolveDocsPath(file), destination);
    }

    execFileSync('tar', ['-czf', OUTPUT_FILE, '-C', TMP_DIR, 'goose-docs'], { stdio: 'inherit' });
  } finally {
    fs.rmSync(TMP_DIR, { recursive: true, force: true });
  }

  console.log(`[generate-docs-bundle] Generated: ${OUTPUT_FILE}`);
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { normalizeBundleDocPath, bundlePathForDocFile, isBundleDocFile };
