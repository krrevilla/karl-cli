const fs = require('fs');
const path = require('path');
const { errorChalk, successChalk, boldSuccessChalk } = require('../utils/helpers');

const workingDir = process.cwd();
const pageTemplateDir = path.join(__dirname, '../src/page');

function writePageFile({ resultPath, pageName }) {
  ['index.js', 'screen.js'].forEach((file) => {
    fs.readFile(`${pageTemplateDir}/${file}`, 'utf8', (readError, data) => {
      if (readError) {
        console.log(errorChalk(readError));
      } else {
        const result = data.replace(/PageNameReplace/g, pageName);

        fs.writeFile(`${resultPath}/${file}`, result, 'utf8', (err) => {
          if (err) {
            console.log(errorChalk(err));
          } else {
            const pathLog = boldSuccessChalk(`${resultPath}/${file}`);
            console.log(successChalk(`\u{2714} "${pathLog}" created`));
          }
        });
      }
    });
  });
}

function pageMake({ root, pagename }) {
  const page = pagename.replace(/\s/g, '');
  const rootDir = `${workingDir}/${root}`;
  const containersDir = `${rootDir}/containers`;
  const pageDir = `${containersDir}/${page}`;

  /**
   * Check and create selected `root` directory
   */
  if (fs.existsSync(rootDir)) {
    console.log(successChalk(`\u{2714} "${root}" exists`));
  } else {
    console.log(successChalk(`\u{2714} "${root}" directory created.`));
    fs.mkdirSync(rootDir);
  }

  /**
   * Check and create `containers` directory
   */
  if (fs.existsSync(containersDir)) {
    console.log(successChalk('\u{2714} "containers" exists'));
  } else {
    console.log(successChalk('\u{2714} "containers" directory created.'));
    fs.mkdirSync(containersDir);
  }

  /**
   * `pageDir` is equals to page name (removed whitespace).
   * Throws error if already exists
   */
  if (fs.existsSync(pageDir)) {
    throw new Error(errorChalk(`${page} already exists`));
  }

  fs.mkdirSync(pageDir);
  console.log(successChalk(`\u{2714} ${pageDir} directory created.`));

  writePageFile({ resultPath: pageDir, pageName: page });
}

module.exports = {
  pageMake,
};
