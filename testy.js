const readlineSync = require('readline-sync');

let add = /add{1}\s.*[A-Z]?\w+\s[A-Z]?[\w]*\s?((([1][0-5]|[1-9])\sLUC|([1][0-5]|[1-9])\sVIT|([1][0-5]|[1-9])\sMEN|([1][0-5]|[1-9])\sPHY)\s?){4}(\s?athletics|\s?lore|\s?martial|\s?medicine|\s?psionic|\s?rhetoric|\s?science|\s?subterfuge|\s?survival|\s?vocation){2}/g;
let diff = /set\sdifficulty\s(trivial|easy|moderate|difficult|nearly\simpossible){1}/g;
let attacks = /\D+\s\D*\s?attacks\s\D+\s?\D*/g;
let buys = /\D+\s\D*\s?buys\s\D+/g ;
let checkAbility = /check\sability\s\D+\s\D*\s?(VIT\s?|LUC\s?|MEN\s?|PHY\s?){1,4}(athletics|lore|martial|medicine|psionic|rhetoric|science|subterfuge|survival|vocation){0,10}/g;
let regAtrName = /(VIT|MEN|PHY|LUC)/;
let regSkill = /(athletics|lore|martial|medicine|psionic|rhetoric|science|subterfuge|survival|vocation)/g

let a = '';
while (true) {
  let a = readlineSync.question('Podaj komendę: ');
  if (add.test(a)) {
    let b = a.split(' ', );
    let c = b.slice(1, (b.length - 8));
    let regAdd = /([1][0-5]|[1-9])/g;
    let player = '';
    if (c.length == 1) {
      player = c[0];
    } else{
      player = c[0] + ' ' + c[1];
    }
    let atribs = a.match(regAdd);
    let atrName = a.match(regAtrName);
    for (var i = 0; i < atribs.length; i++) {
      atribs[i] = parseInt(atribs[i]);
    }
    skills = b.slice(b.length - 2, );
    console.log(skills)
    console.log("a: ", );
    console.log(atrName);
    console.log(atribs);
    console.log(player);
  }
  if (diff.test(a)) {
    let regDiff = /(trivial|easy|moderate|difficult$|nearly\simpossible){1}/g;
    let difficulty = a.match(regDiff);
    console.log(difficulty);
  }
  if (attacks.test(a)) {
    let b = a.split(' attacks ', );
    let attacker = b[0];
    let attacked = b[1];
    console.log(attacker);
    console.log(attacked);
  }
  if (buys.test(a)) {
    let b = a.split(' buys ', );
    let buyer = b[0];
    let item = b[1];
    console.log(buyer, item);
  }
  if (checkAbility.test(a)) {
    let b = a.split(' ', );
    let c = b.slice(2, );
    if (regAtrName.test(c[1])){
      player = c[0];
      c = c.slice(1, );
    } else {
      player = c[0] + ' ' + c[1];
      c = c.slice(2, );
    }
    let attribs = [];
    var i = 0;
    while (regAtrName.test(c[i])) {
      attribs[i] = c[i];
      i++;
      c.slice(1, );
    }
    skills = c.slice(attribs.length, );
    console.log(attribs);
    console.log(skills);
    console.log(player);
  }
}
