const fs = require('fs');
const path = require('path');
const pathToFolder = path.join(__dirname, 'files');

fs.stat(path.join(__dirname, 'files-copy'), (err) => {
  if (err) {
    fs.promises.mkdir(path.join(__dirname, 'files-copy'), {
      recursive: true,
    });
  }
});

fs.promises
  .readdir(pathToFolder, { withFileTypes: true })
  .then((filenames) => {
    const pathCopyFilesFolder = path.join(__dirname, 'files-copy');
    for (let file of filenames) {
      const currFile = path.join(file.path, file.name);
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
