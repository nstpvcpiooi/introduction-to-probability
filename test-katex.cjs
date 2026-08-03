const katex = require('./node_modules/katex');

const formulas = [
  { f: '\\lim_{x \\to a} f(x) = L', display: false },
  { f: '\\lim_{x \\to a} f(x) = L', display: true },
  { f: '\\displaystyle\\lim_{x \\to 3}(2x + 1) = 7', display: false },
  { f: '\\varepsilon', display: false },
  { f: '\\delta', display: false },
  { f: 'f: A \\to B', display: false },
];

formulas.forEach(({ f, display }) => {
  try {
    const html = katex.renderToString(f, { displayMode: display, throwOnError: true });
    console.log(`OK [${display ? 'block' : 'inline'}]:`, f.substring(0, 40));
  } catch (e) {
    console.log(`ERR [${display ? 'block' : 'inline'}]:`, f.substring(0, 40), '->', e.message.substring(0, 120));
  }
});
