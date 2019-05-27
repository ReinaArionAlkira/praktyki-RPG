let Equipment = require("./equipment.js");
let Participant = require("./participant.js");
const readlineSync = require('readline-sync');
/**
 * Oracle object
 * @module oracle
 *
 * @typedef {Object} Oracle
 *
 * @property {Function} cmdRecognition recognition of provided command
 * @property {Array} participantsList list of all participants in game
 * @property {number} standardModifier modificates difficulty of game
 * @property {Array} availableSkills list of all availabe in game skill
 * @property {Array} availableEquipment list of all availabe in game equipment
 *
 * @exports oracle
 */
module.exports = {
  cmdRecognition: function () {
    let add = /add{1}\s.*[A-Z]?\w+\s[A-Z]?[\w]*\s?((([1][0-5]|[1-9])\sLUC|([1][0-5]|[1-9])\sVIT|([1][0-5]|[1-9])\sMEN|([1][0-5]|[1-9])\sPHY)\s?){4}/g;
    let diff = /set\sdifficulty\s(trivial|easy|moderate|difficult|nearly\simpossible){1}/g;
    let attacks = /\D+\s\D*\s?attacks\s\D+\s\D*\s?/g;
    let buys = /\D+\s\D*\s?buys\s\D+/g ;
    let checkAbility = /check\sability\s\D+\s\D*\s?(VIT\s?|LUC\s?|MEN\s?|PHY\s?){1,4}(athletics|lore|martial|medicine|psionic|rhetoric|science|subterfuge|survival|vocation){0,10}/g;
    let regAtrName = /(VIT|MEN|PHY|LUC)/g;
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
        cmdAdd();
      }
      if (diff.test(a)) {
        let regDiff = /(trivial|easy|moderate|difficult$|nearly\simpossible){1}/g;
        let difficulty = a.match(regDiff);
        cmdSetDifficulty();
      }
      if (attacks.test(a)) {
        let b = a.split(' attacks ', );
        let attacker = b[0];
        let attacked = b[1];
        cmdAttacks();
      }
      if (buys.test(a)) {
        let b = a.split(' buys ', );
        let buyer = b[0];
        let item = b[1];
        cmdBuys();
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
        let atribs = new Array ();
        var i = 0;
        while (regAtrName .test(c[i])) {
          atribs[i] = c[i];
          i++;
          c.slice(1, );
        }
        skills = c.slice(atribs.length, );
        cmdCheckAbility();
      }
    }
  },

  cmdAdd: function (player, atribs, skills) {
    this.participantsList.push(new participant(player, atribs, skills));
    console.log(participantsList);
  },

  /**
   * Sets difficulty of game
   *
   * @param {string} difficulty difficulty you want to set
   *
   * @returns {bool} false on error, true if difficulty was set correctly
   */
  cmdSetDifficulty: function (difficulty = "") {
    switch (difficulty.toLowerCase()) {
      case "trivial":
        this.standardModifier = 5;
        break;
      case "easy":
        this.standardModifier = 0;
        break;
      case "moderate":
        this.standardModifier = -5;
        break;
      case "difficult":
        this.standardModifier = -10;
        break;
      case "nearly impossible":
        this.standardModifier = -15;
        break;
      default:
        return false;
    }
    return true;
    console.log(standardModifier);
  },
/*  cmdAttacks: function () {},
  cmdBuys: function () {},
  cmdCheckAbility: function () {},
*/
  participantsList: [],

  standardModifier: 0,

  /**
   * availableSkills[0] <- Athletic
   * availableSkills[1] <- Lore
   * availableSkills[2] <- Martial
   * availableSkills[3] <- Medicine
   * availableSkills[4] <- Psionics
   * availableSkills[5] <- Rhetoric
   * availableSkills[6] <- Science
   * availableSkills[7] <- Subterfuge
   * availableSkills[8] <- Survival
   * availableSkills[9] <- Vocations
   *
   * @type {Array}
   */
  availableSkills: [
    "athletic",
    "lore",
    "martial",
    "medicine",
    "psionics",
    "rhetoric",
    "science",
    "subterfuge",
    "survival",
    "vocation"
  ],

  /**
   * availableEquipment[0] <- Melee - dagger
   * availableEquipment[1] <- Melee - sword
   * availableEquipment[2] <- Melee - battle axe
   * availableEquipment[3] <- Projectile - slingshot
   * availableEquipment[4] <- Projectile - longbow
   * availableEquipment[5] <- Projectile - crossbow
   * availableEquipment[6] <- Armor - leather tunic
   * availableEquipment[7] <- Armor - chain mail
   * availableEquipment[8] <- Armor - iron armor
   *
   * @type {Array}
   */
   /*
  availableEquipment: [
    new Equipment.Melee("dagger", 1, 5),
    new Equipment.Melee("sword", 2, 25),
    new Equipment.Melee("battle axe", 3, 75),
    new Equipment.Projectile("slingshot", 5, 50),
    new Equipment.Projectile("longbow", 8, 100),
    new Equipment.Projectile("crossbow", 11, 250),
    new Equipment.Armor("leather tunic", (-1), 1, 50),
    new Equipment.Armor("chain mail", (-2), 2, 300),
    new Equipment.Armor("iron armor", (-5), 3, 1500)
  ],*/
}
