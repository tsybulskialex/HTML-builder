const fs = require('fs');
const path = require('path');
const pathToFolder = path.join(__dirname, './secret-folder');

fs.promises
  .readdir(pathToFolder, { withFileTypes: true })
  .then((filenames) => {
    for (let file of filenames) {
      if (file.isFile()) {
        const nameFile = file.name.split('.')[0];
        const extNameFile = path.extname(path.join(file.path, file.name));
        fs.stat(path.join(file.path, file.name), (err, data) => {
          if (!err) {
            console.log(`${nameFile} - ${extNameFile.slice(1)} - ${data.size}`);
          } else {
            console.log(err);
          }
        });
      } else {
        continue;
      }
    }
  })
  .catch((err) => {
    console.log(err);
  });
