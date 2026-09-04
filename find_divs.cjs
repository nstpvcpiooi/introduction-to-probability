const fs = require('fs');
const content = fs.readFileSync('src/content/ch8/s9.md', 'utf8');
const blocks = content.split('<div class="exercise-block"');
for (let i = 1; i < blocks.length; i++) {
  const block = '<div class="exercise-block"' + blocks[i];
  const titleMatch = block.match(/data-toc-title="([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : 'Unknown';
  const openDivs = (block.match(/<div[\s>]/g) || []).length;
  const closeDivs = (block.match(/<\/div>/g) || []).length;
  if (openDivs !== closeDivs) {
    console.log(title, 'Open:', openDivs, 'Close:', closeDivs, 'Diff:', openDivs - closeDivs);
  }
}
