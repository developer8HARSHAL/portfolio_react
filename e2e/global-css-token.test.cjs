'use strict';

/**
 * Static design-token guard for the React source tree.
 *
 * Run from the project root after placing this file at scripts/global-css-token.test.cjs:
 *   node --test scripts/global-css-token.test.cjs
 *
 * Policy: component code should use semantic theme tokens (for example
 * bg-canvas, text-foreground, border-line) rather than literal colors or
 * Tailwind's raw palette. The global token stylesheet is the source of truth
 * and is intentionally allowed to define literal palette values.
 *
 * This test intentionally does not ban all inline styles: data-driven styles
 * such as star coordinates may be legitimate. It does flag literal visual
 * token values in component code and literal color declarations in component CSS.
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');

const CODE_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx', '.css']);
const GLOBAL_STYLESHEETS = new Set([
  'src/index.css',
  'src/global.css',
  'src/globals.css',
  'src/styles/tokens.css',
  'src/styles/design-tokens.css',
]);

const HEX_COLOR = /#[\da-f]{3,4}(?:[\da-f]{2}){0,2}\b/i;
const FUNCTIONAL_COLOR = /\b(?:rgb|rgba|hsl|hsla)\s*\(/i;
const GRADIENT_FUNCTION = /\b(?:repeating-)?(?:linear|radial)-gradient\s*\(/i;

// These are raw Tailwind palette utilities, not project semantic tokens.
const RAW_TAILWIND_COLOR = /(?:^|\s)(?:[a-z-]+:)*(?:bg|text|border|from|via|to|ring|outline|fill|stroke|decoration|placeholder)-(?:black|white|slate(?:-\d{1,3})?|gray(?:-\d{1,3})?|zinc(?:-\d{1,3})?|neutral(?:-\d{1,3})?|stone(?:-\d{1,3})?|red(?:-\d{1,3})?|orange(?:-\d{1,3})?|amber(?:-\d{1,3})?|yellow(?:-\d{1,3})?|lime(?:-\d{1,3})?|green(?:-\d{1,3})?|emerald(?:-\d{1,3})?|teal(?:-\d{1,3})?|cyan(?:-\d{1,3})?|sky(?:-\d{1,3})?|blue(?:-\d{1,3})?|indigo(?:-\d{1,3})?|violet(?:-\d{1,3})?|purple(?:-\d{1,3})?|fuchsia(?:-\d{1,3})?|pink(?:-\d{1,3})?|rose(?:-\d{1,3})?)(?:\/(?:\d{1,3}|\[[^\]]+\]))?(?=\s|["'`]|$)/i;

const ARBITRARY_COLOR_UTILITY = /(?:^|\s)(?:[a-z-]+:)*(?:bg|text|border|from|via|to|ring|outline|fill|stroke)-\[(?:#[\da-f]{3,8}\b|(?:rgb|rgba|hsl|hsla)\s*\(|(?:repeating-)?(?:linear|radial)-gradient\s*\()/i;

const CSS_COLOR_PROPERTY = /(?:^|[;{}\n])\s*(?:color|background(?:-color)?|border(?:-[\w-]+)?-color|outline-color|text-decoration-color|fill|stroke|caret-color|box-shadow)\s*:\s*([^;{}]+)/gi;
const ALLOWED_COLOR_KEYWORDS = /^(?:var\(|currentColor$|transparent$|inherit$|initial$|unset$|none$|revert$)/i;
const NAMED_RAW_COLORS = /\b(?:black|white|red|green|blue|yellow|orange|purple|pink|gray|grey|silver|maroon|navy|teal|lime|olive|aqua|fuchsia)\b/i;

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    // Keep the source audit focused on authored code, not generated/dependency folders.
    if (entry.name === 'node_modules' || entry.name === 'build' || entry.name === 'dist' || entry.name === 'coverage') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(full));
    else if (CODE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) results.push(full);
  }
  return results;
}

function relative(file) {
  return path.relative(ROOT, file).split(path.sep).join('/');
}

function stripLineComments(line, extension) {
  if (extension === '.css') return line.replace(/\/\*.*?\*\//g, '');
  // Avoid treating URL protocols as JS line comments by only stripping comments
  // that begin the line or are preceded by whitespace.
  return line.replace(/(^|\s)\/\/.*$/, '$1').replace(/\/\*.*?\*\//g, '');
}

function scanFile(file) {
  const rel = relative(file);
  const ext = path.extname(file).toLowerCase();
  const isGlobalCss = ext === '.css' && GLOBAL_STYLESHEETS.has(rel.toLowerCase());
  const source = fs.readFileSync(file, 'utf8');
  const lines = source.split(/\r?\n/);
  const found = [];

  for (let i = 0; i < lines.length; i += 1) {
    const rawLine = lines[i];
    const line = stripLineComments(rawLine, ext);
    if (!line.trim()) continue;

    if (ext === '.css') {
      // Global stylesheets are allowed to define the literal palette/tokens.
      // Other CSS files must consume var(--color-...) instead.
      if (!isGlobalCss) {
        CSS_COLOR_PROPERTY.lastIndex = 0;
        let match;
        while ((match = CSS_COLOR_PROPERTY.exec(line)) !== null) {
          const value = match[1].trim();
          if (!ALLOWED_COLOR_KEYWORDS.test(value) && (HEX_COLOR.test(value) || FUNCTIONAL_COLOR.test(value) || NAMED_RAW_COLORS.test(value))) {
            found.push(`${rel}:${i + 1} — literal color in CSS declaration: ${match[0].trim()}`);
          }
        }
      }
      continue;
    }

    // Detect hardcoded colors in JSX/TSX/JS, including SVG fill/stroke and inline styles.
    if (HEX_COLOR.test(line)) found.push(`${rel}:${i + 1} — hex color literal found`);
    if (FUNCTIONAL_COLOR.test(line)) found.push(`${rel}:${i + 1} — rgb()/hsl() color literal found`);
    if (GRADIENT_FUNCTION.test(line) && !/var\(--[\w-]+\)/.test(line)) {
      found.push(`${rel}:${i + 1} — inline gradient should live in global CSS and use design tokens`);
    }

    if (RAW_TAILWIND_COLOR.test(line)) found.push(`${rel}:${i + 1} — raw Tailwind palette class; use a semantic project token`);
    if (ARBITRARY_COLOR_UTILITY.test(line)) found.push(`${rel}:${i + 1} — arbitrary Tailwind color; use a semantic project token`);

    // Catch common literal visual properties even if they use a named color.
    if (/\b(?:color|background|backgroundColor|borderColor|fill|stroke)\s*:\s*(['"`])(?:black|white|red|green|blue|yellow|orange|purple|pink|gray|grey|silver|maroon|navy|teal|lime|olive|aqua|fuchsia)\1/i.test(line)) {
      found.push(`${rel}:${i + 1} — named color literal in component style`);
    }
  }

  return [...new Set(found)];
}

test('component styles use global semantic CSS tokens instead of hardcoded colors', () => {
  assert.ok(fs.existsSync(SRC), `Expected source directory at ${SRC}. Run this test from the project that contains src/.`);

  const files = walk(SRC);
  const violations = files.flatMap(scanFile);
  const message = violations.length
    ? `Found ${violations.length} hardcoded-style violation(s):\n\n${violations.map((item) => `  - ${item}`).join('\n')}\n\nMove literal colors/gradients into the global token stylesheet and use semantic tokens such as bg-canvas, text-foreground, border-line, or var(--color-*).`
    : `Scanned ${files.length} authored source file(s): no hardcoded color or gradient values were found outside the global token stylesheets.`;

  assert.equal(violations.length, 0, message);
});
