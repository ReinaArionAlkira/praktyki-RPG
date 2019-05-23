const readlineSync = require('readline-sync');
let add = /add{1}\s[A-Z]{1}\w+\s[A-Z]?[\w]*\s?([1][0-5]|[1-9]){1}\sPHY\s([1][0-5|[1-9]){1}\sMEN\s([1][0-5]|[1-9]){1}\sVIT\s([1][0-5]|[1-9]){1}\sLUC\s/;
var a = readlineSync.question();


//let setDifficulty = ;
//let attackslet buys = ;
//let checkAbility = ;

let regex = /([1][0-5]|[1-9])/g;
let regexAdd = a.match(regex);

console.log(regexAdd);
