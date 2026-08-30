const fs = require('fs');
const path = require('path');

function checkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkDir(fullPath);
    } else if (entry.name.endsWith('.jsx') || entry.name.endsWith('.js')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const importRegex = /from\s+['"]([^'"]+)['"]/g;
      let match;
      while ((match = importRegex.exec(content)) !== null) {
        const mod = match[1];
        if (mod.startsWith('.') || mod.startsWith('/')) {
          const resolved = path.resolve(path.dirname(fullPath), mod);
          const exts = ['', '.js', '.jsx', '.ts', '.tsx', '/index.js', '/index.jsx'];
          const found = exts.some(e => fs.existsSync(resolved + e));
          if (!found) {
            console.log('MISSING: ' + path.relative('./src', fullPath) + ' -> ' + mod);
          }
        }
      }
    }
  }
}

checkDir('./src');
console.log('Import check complete');
