const fs = require('fs');
const path = require('path');

const scriptContent = fs.readFileSync(
  path.join(__dirname, '../public/dashboard-console-capture.js'),
  'utf8'
);

const scriptTag = `<script>${scriptContent}</script>`;

function injectScript(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  if (content.includes('dashboard-console-capture')) return;
  
  content = content.replace('</head>', `${scriptTag}</head>`);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Injected console capture into ${filePath}`);
}

const outDir = path.join(__dirname, '../out');
if (fs.existsSync(outDir)) {
  const htmlFiles = [];
  
  function findHtmlFiles(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findHtmlFiles(filePath);
      } else if (file.endsWith('.html')) {
        htmlFiles.push(filePath);
      }
    });
  }
  
  findHtmlFiles(outDir);
  htmlFiles.forEach(injectScript);
  console.log(`Processed ${htmlFiles.length} HTML files`);
}