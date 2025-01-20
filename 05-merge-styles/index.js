const fs = require('fs');
const path = require('path');

const pathToFolderStyles = path.join(__dirname, 'styles');
const pathToBundle = path.join(__dirname, 'project-dist');
const writableStream = fs.createWriteStream(
  path.resolve(pathToBundle, 'bundle.css'),
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
