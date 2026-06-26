const { test, describe } = require('node:test');
const assert = require('node:assert');
const {
  normalizeBundleDocPath,
  bundlePathForDocFile,
  isBundleDocFile,
} = require('./generate-docs-bundle');

describe('normalizeBundleDocPath', () => {
  test('keeps md files as md', () => {
    assert.strictEqual(normalizeBundleDocPath('guides/config-files.md'), 'guides/config-files.md');
  });

  test('converts mdx files to md', () => {
    assert.strictEqual(
      normalizeBundleDocPath('guides/recipes/index.mdx'),
      'guides/recipes/index.md'
    );
  });

  test('preserves nested paths', () => {
    assert.strictEqual(
      normalizeBundleDocPath('guides/context-engineering/subagents.mdx'),
      'guides/context-engineering/subagents.md'
    );
  });
});

describe('bundlePathForDocFile', () => {
  test('places docs under docs directory', () => {
    assert.strictEqual(
      bundlePathForDocFile('getting-started/providers.md'),
      'docs/getting-started/providers.md'
    );
  });

  test('normalizes mdx files under docs directory', () => {
    assert.strictEqual(
      bundlePathForDocFile('guides/recipes/index.mdx'),
      'docs/guides/recipes/index.md'
    );
  });
});

describe('isBundleDocFile', () => {
  test('includes getting-started markdown files', () => {
    assert.strictEqual(isBundleDocFile('getting-started/installation.md'), true);
  });

  test('includes guide mdx files', () => {
    assert.strictEqual(isBundleDocFile('guides/security/index.mdx'), true);
  });

  test('excludes files outside bundled docs sections', () => {
    assert.strictEqual(isBundleDocFile('troubleshooting/known-issues.md'), false);
  });

  test('excludes non-markdown files', () => {
    assert.strictEqual(isBundleDocFile('guides/images/diagram.png'), false);
  });
});
