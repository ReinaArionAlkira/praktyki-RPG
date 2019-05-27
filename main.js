
let test = require("./oracle.js");
const readlineSync = require('readline-sync');

while (true) {
  test.cmdRecognition(readlineSync.question('Podaj komendę: '));
}

