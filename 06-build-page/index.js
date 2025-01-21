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

function copyAssets() {
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
        fs.mkdir(path.join(pathCopyFilesFolder, file.name), (err) => {
          if (err) {
            return;
          }
        });
      }
      return filenames;
    })
    .then((filenames) => {
      /* console.log(filenames); */
      for (let folder of filenames) {
        const pathCopyFilesFolder = path.join(
          __dirname,
          'project-dist',
          'assets',
        );
        const pathToFolder = path.join(__dirname, 'assets');
        let currFile = path.join(pathToFolder, folder.name);
        fs.promises
          .readdir(currFile, { withFileTypes: true })
          .then((readFolder) => {
            /* console.log(readFolder); */
            for (let file of readFolder) {
              currFile = path.join(pathToFolder, folder.name, file.name);
              const pathToCopyFile = path.join(
                pathCopyFilesFolder,
                folder.name,
                file.name,
              );
              fs.promises.copyFile(currFile, pathToCopyFile);
            }
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
copyAssets();

// create index.html and copy content from template.html in index.html
const pathToTemplate = path.join(__dirname, 'template.html');
fs.promises.copyFile(
  pathToTemplate,
  path.join(__dirname, 'project-dist', 'index.html'),
);
// add components in index.html file
async function fillIndexHtmlFile() {
  const pathIndexFile = path.join(__dirname, 'project-dist', 'index.html');

  const components = await fs.promises.readdir(
    path.resolve(__dirname, 'components'),
    { withFileTypes: true },
  );
  for (let component of components) {
    const pathToComponentsFile = path.resolve(
      path.resolve(__dirname, 'components'),
      component.name,
    );
    let textIndexFile = await fs.promises.readFile(pathIndexFile);
    /* console.log(textIndexFile); */
    if (component.isFile() && path.extname(pathToComponentsFile) === '.html') {
      const textComponent = await fs.promises.readFile(pathToComponentsFile);
      const componentName = component.name.split('.')[0];
      textIndexFile = textIndexFile
        .toString()
        .replace(`{{${componentName}}}`, textComponent);
      /* console.log(textIndexFile); */
      await fs.promises.writeFile(pathIndexFile, textIndexFile);
    }
  }
}
fillIndexHtmlFile();
