const fs = require('fs');
const path = require('path');

// create folder project-dist

fs.mkdir(path.join(__dirname, 'project-dist'), (err) => {
  if (err) {
    return;
  }
});
// merge styles
function mergeStyles() {
  const pathToFolderStyles = path.join(__dirname, 'styles');
  const pathToFileStyles = path.join(__dirname, 'project-dist');
  const writableStream = fs.createWriteStream(
    path.resolve(pathToFileStyles, 'style.css'),
  );
  fs.promises
    .readdir(pathToFolderStyles, { withFileTypes: true })
    .then((filenames) => {
      for (let file of filenames) {
        const extNameFile = path.extname(path.join(file.path, file.name));
        if (file.isFile() && extNameFile === '.css') {
          const currFile = path.join(file.path, file.name);
          const readbleSream = fs.createReadStream(currFile);
          readbleSream.on('data', (styles) => {
            writableStream.write(styles.toString());
          });
        } else {
          continue;
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
mergeStyles();

// copy folder assets
fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), (err) => {
  if (err) {
    return;
  }
});

/* function copyAssets() {
  const pathToFolder = path.join(__dirname, 'assets');
  fs.promises
    .readdir(pathToFolder, { withFileTypes: true })
    .then((filenames) => {
      const pathCopyFilesFolder = path.join(
        __dirname,
        'project-dist',
        'assets',
      );
      for (let file of filenames) {
        const currFile = path.join(file.path, file.name);
        if (file.isDirectory()) {
        }
        const copyFolderFile = path.join(pathCopyFilesFolder, file.name);
        fs.copyFile(currFile, copyFolderFile, (err) => {
          if (err) {
            console.log(err);
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
copyAssets(); */
