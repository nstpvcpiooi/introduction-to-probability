const fs = require('fs');
const path = require('path');

const ch7Dir = path.join(__dirname, '../src/content/ch7');

function formatFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Fix `math-box-content` newlines
    // Make sure there is exactly one blank line after `<div class="math-box-content">`
    content = content.replace(/<div class="math-box-content">\s*/g, '<div class="math-box-content">\n\n');
    
    // Make sure there is exactly one blank line before `</div>` that closes a math-box
    // To do this safely, we find `</div>\n</div>` and replace the preceding whitespace.
    content = content.replace(/\s*<\/div>\s*<\/div>/g, '\n\n</div>\n</div>');

    // 2. Fix `$$...$$` inside math-boxes to have blank lines around them
    // This just ensures blank lines before and after block math.
    // Replace whitespace before $$ with \n\n
    content = content.replace(/([^\n])\s*\$\$/g, '$1\n\n$$$$');
    // Replace whitespace after $$ with \n\n (if it is closing)
    // Wait, replacing $$ is tricky because both opening and closing use $$.
    // Let's use a non-greedy regex to match the whole block.
    content = content.replace(/\s*\$\$\s*([\s\S]*?)\s*\$\$\s*/g, '\n\n$$$$\n$1\n$$$$\n\n');
    
    // 3. Convert `#### X.Y.Z Tên` -> `### X.Y.Z Tên`
    content = content.replace(/^#### (.*)$/gm, '### $1');

    // 4. Convert Image blocks
    // Format: <div style="text-align: center;"><img src="..." alt="..." width="..." /></div>\n\n### HÌNH X.Y\n\nCaption
    const imgRegex = /<div style="text-align: center;">\s*<img src="(imgs\/[^"]+)"[^>]*width="([^"%]+)%?"[^>]*\/>\s*<\/div>\s*### HÌNH (\d+\.\d+)\s*(.*?)(?=\n\n|\n*$)/gs;
    content = content.replace(imgRegex, (match, src, width, imgNum, caption) => {
        caption = caption.replace(/\r?\n/g, ' ').trim();
        return `<div style="text-align: center; margin: 2.5rem 0; color: var(--text-muted); font-size: 0.9rem;">
  <img src="${src}" alt="Hình ${imgNum}" style="max-width: ${width}%; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); margin-bottom: 0.75rem;" />

**HÌNH ${imgNum}:** ${caption}
</div>`;
    });

    // 5. Convert raw Definition/Theorem/Example headings that weren't formatted.
    // Example: Định nghĩa 7.1.7 (Độc lập...). -> Needs manual wrapping, so let's log them to manually fix.
    const rawHeadings = [...content.matchAll(/^(Định nghĩa|Định lý|Ví dụ|Hệ quả|Bổ đề|Mệnh đề)\s+(\d+\.\d+\.\d+)(?:\s+\(([^)]+)\))?\.?\s*/gm)];
    if (rawHeadings.length > 0) {
        console.warn(`[WARNING] Found raw headings in ${path.basename(filePath)} that need manual wrapping:`);
        rawHeadings.forEach(h => console.warn(`  - ${h[0]}`));
    }
    
    // 6. Clean up multiple newlines to max 2
    content = content.replace(/\n{3,}/g, '\n\n');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Processed: ${path.basename(filePath)}`);
}

function run() {
    const files = fs.readdirSync(ch7Dir).filter(f => f.endsWith('.md'));
    for (const file of files) {
        formatFile(path.join(ch7Dir, file));
    }
}

run();
