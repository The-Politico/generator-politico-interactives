const copytext = require('copytext');
const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

module.exports = (cb) => {
  const safePattern = /^[a-z0-9_\/\-.,?:@#%^+=\[\]]*$/i;
  const safeishPattern = /^[a-z0-9_\/\-.,?:@#%^+=\[\]{}|&()<>; *']*$/i;

  function bashEscape(arg) {
    // These don't need quoting
    if (safePattern.test(arg)) return arg;

    // These are fine wrapped in double quotes using weak escaping.
    if (safeishPattern.test(arg)) return `"${arg}"`;

    arg = arg.replace(/(\r\n|\n|\r)/gm, '');

    // Otherwise use strong escaping with single quotes
    arg = arg.replace(/'+/g, function(val) {
      // But we need to interpolate single quotes efficiently

      // One or two can simply be '\'' -> ' or '\'\'' -> ''
      if (val.length < 3) return "'" + val.replace(/'/g, "\\'") + "'";

      // But more in a row, it's better to wrap in double quotes '"'''''"' -> '''''
      return "'\"" + val + "\"'";
    });

    return "'" + arg + "'";
  }

  const filename = execSync(`gdrive export ${process.env.SHEETID} --mime application/vnd.openxmlformats-officedocument.spreadsheetml.sheet | awk -F\\' '{print $2}'`);
  const xlsxPath = path.resolve(process.cwd(), 'src/data/data.xlsx');
  const jsonPath = path.resolve(process.cwd(), 'src/data/data.json');

  execSync(`mv ${bashEscape(filename.toString()).trim()} ${xlsxPath}`);
  const data = copytext.process(xlsxPath, {
    processor: 'table',
  });
  fs.writeJsonSync(jsonPath, data);
  cb();
  process.exit();
};
