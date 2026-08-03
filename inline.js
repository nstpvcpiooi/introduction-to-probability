import { readFileSync, writeFileSync, existsSync, statSync, readdirSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const distDir = join(__dirname, 'dist');
const indexPath = join(distDir, 'index.html');
const outputPath = join(__dirname, 'bundle.html');

if (!existsSync(indexPath)) {
  console.error('❌ dist/index.html not found. Run vite build first.');
  process.exit(1);
}

let html = readFileSync(indexPath, 'utf8');

// Inline CSS <link rel="stylesheet"> tags
html = html.replace(/<link rel="stylesheet" crossorigin href="([^"]+)">/g, (match, href) => {
  const filePath = join(distDir, href.replace(/^\//, ''));
  if (existsSync(filePath)) {
    const css = readFileSync(filePath, 'utf8');
    return `<style>${css}</style>`;
  }
  return match;
});

// Inline <script type="module" src="..."> tags
html = html.replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/g, (match, src) => {
  const filePath = join(distDir, src.replace(/^\//, ''));
  if (existsSync(filePath)) {
    const js = readFileSync(filePath, 'utf8');
    return `<script type="module">${js}</script>`;
  }
  return match;
});

// Remove modulepreload links
html = html.replace(/<link rel="modulepreload" crossorigin href="[^"]+">\s*/g, '');

// Embed KaTeX CSS with base64-encoded fonts
console.log('📐 Embedding KaTeX CSS with base64 fonts...');

// Find KaTeX dist directory
const katexDistDir = join(__dirname, 'node_modules', 'katex', 'dist');
const katexCssPath = join(katexDistDir, 'katex.min.css');

if (existsSync(katexCssPath)) {
  let katexCss = readFileSync(katexCssPath, 'utf8');
  
  // Replace all font url() references with base64 data URIs
  katexCss = katexCss.replace(/url\(([^)]+)\)/g, (match, fontRef) => {
    // Remove quotes if present
    const fontPath = fontRef.replace(/['"]/g, '');
    // Only handle local font files (not http:// etc)
    if (fontPath.startsWith('http') || fontPath.startsWith('data:')) {
      return match;
    }
    
    // Resolve the font path relative to katex dist directory
    const fullFontPath = join(katexDistDir, fontPath);
    if (existsSync(fullFontPath)) {
      const ext = extname(fullFontPath).toLowerCase().slice(1);
      const mimeTypes = {
        woff2: 'font/woff2',
        woff: 'font/woff',
        ttf: 'font/truetype',
        otf: 'font/opentype',
      };
      const mimeType = mimeTypes[ext] || 'font/truetype';
      const fontData = readFileSync(fullFontPath);
      const base64 = fontData.toString('base64');
      return `url(data:${mimeType};base64,${base64})`;
    }
    return match;
  });
  
  html = html.replace('</head>', `<style id="katex-css">${katexCss}</style>\n</head>`);
  console.log('✅ KaTeX CSS with fonts embedded');
} else {
  console.warn('⚠️  KaTeX CSS not found, using CDN fallback');
  const cdnLink = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css" crossorigin="anonymous">`;
  html = html.replace('</head>', cdnLink + '\n</head>');
}

// Inject Google Fonts link
const googleFontsLink = `
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
`;
html = html.replace('</head>', googleFontsLink + '</head>');

writeFileSync(outputPath, html, 'utf8');

const size = (statSync(outputPath).size / 1024 / 1024).toFixed(2);
console.log(`\n✅ Bundle complete!`);
console.log(`📄 Output: bundle.html (${size} MB)`);
console.log(`\nNote: Fonts are base64-encoded inline, so the file is larger but fully self-contained.`);
