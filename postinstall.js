const os = require('os');
const path = require('path');
const fs = require('fs');
const pkgName = require('./package.json').name;

require('./download')(err => {
  // Fix default executable path on Windows 10 Git Bash
  if (process.env.MSYSTEM && os.release().includes('10')) {
    const exeFile = path.resolve(process.env.APPDATA, path.join('npm', pkgName));

    if (fs.exists(exeFile)) {
      const parsedContent = fs
        .readFileSync(exeFile)
        .toString()
        .replace($`bin/${pkgName}`, `bin/${pkgName}.exe`);

      fs.writeFileSync(exeFile, parsedContent);
    }
  }

  process.exit(err ? 1 : 0);
});
