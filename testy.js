const readlineSync = require('readline-sync');

let add = /add{1}\s[A-Z]{1}\w+\s[A-Z]?[\w]*\s?([1][0-9]|[1-9]){1}\sPHY\s([1][0-9]|[1-9]){1}\sMEN\s([1][0-9]|[1-9]){1}\sVIT\s([1][0-9]|[1-9]){1}\sLUC/g;
let diff = /set\sdifficulty\s(trivial|easy|moderate|difficult|nearly\simpossible){1}/g;
let attacks = /[A-Z]{1}\w+\s[A-Z]?[\w]*\s?attacks\s[A-Z]{1}\w+\s?[A-Z]?[\w]*/g;
let buys = /[A-Z]{1}\w+\s[A-Z]?[\w]*\s?buys\s[A-Z]{1}\w+/g ;
let checkAbility = /check\sability\s[A-Z]{1}\w+\s[A-Z]?[\w]*\s?(VIT\s?|LUC\s?|MEN\s?|PHY\s?){1,4}/g;

let a = '';
while(true) {
  let a = readlineSync.question('Podaj komendę: ');
  if (add.test(a)) {
    let regAdd = /([1][0-5]|[1-9])/g;
    let atribs = a.match(regAdd);
    console.log(atribs);
    break;
  }
  if (diff.test(a)) {
    let regDiff = /(trivial|easy|moderate|difficult$|nearly\simpossible){1}/g;
    let difficulty = a.match(regDiff);
    console.log(difficulty);
    break;
  }
  if(attacks.test(a)) {
    let regAtt = /(^attacks)/g;
    let attack = a.match(regAtt);
    console.log(attack);
    break;
  }
}





/*function command(){
  if (a.match(regex)) {
  } {
  }
}*/
