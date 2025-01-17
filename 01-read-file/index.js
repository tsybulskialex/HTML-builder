const fs = require('fs');
const path = require('path');
const scrFile = 'text.txt';
const pathToFile = path.join(__dirname, scrFile);
const readSream = fs.createReadStream(pathToFile);
readSream.on('data', (content) => {
  console.log(content.toString());
});
