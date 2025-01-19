const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

const writableStream = fs.createWriteStream(
  path.resolve(__dirname, 'text.txt'),
);
stdout.write('Hello friend! Please enter text\n-');
stdin.on('data', (text) => {
  if (text.toString().slice(0, -2) === 'exit') {
    stdout.write('-By friend!');
    process.exit();
  } else {
    stdout.write('-');
    writableStream.write(text.toString());
  }
});
process.on('SIGINT', () => {
  stdout.write('By friend!');
  process.exit();
});
