let Equipment = require("./equipment.js");
let Participant = require("./participant.js");


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
  cmdRecognition: function (a) {
    let add = /add{1}\s.*[A-Z]?\w+\s[A-Z]?[\w]*\s?((([1][0-5]|[1-9])\sLUC|([1][0-5]|[1-9])\sVIT|([1][0-5]|[1-9])\sMEN|([1][0-5]|[1-9])\sPHY)\s?){4}(\s?athletics|\s?lore|\s?martial|\s?medicine|\s?psionic|\s?rhetoric|\s?science|\s?subterfuge|\s?survival|\s?vocation){2}/g;
    let diff = /set\sdifficulty\s(trivial|easy|moderate|difficult|nearly\simpossible){1}/g;
    let attacks = /\D+\s\D*\s?attacks\s\D+\s?\D*/g;
    let buys = /\D+\s\D*\s?buys\s\D+/g ;
    let checkAbility = /check\sability\s\D+\s\D*\s?(VIT\s?|LUC\s?|MEN\s?|PHY\s?){1,4}(athletics|lore|martial|medicine|psionic|rhetoric|science|subterfuge|survival|vocation){0,10}/g;
    let regAtrName = /(VIT|MEN|PHY|LUC)/g;
    let regSkill = /(athletics|lore|martial|medicine|psionic|rhetoric|science|subterfuge|survival|vocation)/g

    if (add.test(a)) {
      let b = a.split(' ', );
      let c = b.slice(1, (b.length - 10));
      let regAdd = /([1][0-5]|[1-9])/g;
      let player = '';
      if (c.length == 1) {
        player = c[0];
      } else{
        player = c[0] + ' ' + c[1];
      }
      let attribs = a.match(regAdd);
      let atrName = a.match(regAtrName);
      skills = b.slice(b.length - 2, );
      for (var i = 0; i < attribs.length; i++) {
        attribs[i] = parseInt(attribs[i]);
      }

      this.cmdAdd(player, attribs, skills);
    }
    if (diff.test(a)) {
      let regDiff = /(trivial|easy|moderate|difficult$|nearly\simpossible){1}/g;
      let difficulty = a.match(regDiff)[0];
      this.cmdSetDifficulty(difficulty);
    }
    if (attacks.test(a)) {
      let b = a.split(' attacks ', );
      let attackerName = b[0];
      let victimName = b[1];
      this.cmdAttacks(attackerName, victimName);
    }
    if (buys.test(a)) {
      let b = a.split(' buys ', );
      let buyer = b[0];
      let item = b[1];
      this.cmdBuys(buyer, item);
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
      let attribs = new Array ();
      var i = 0;
      while (regAtrName .test(c[i])) {
        attribs[i] = c[i];
        i++;
        c.slice(1, );
      }
      skills = c.slice(attribs.length, );
      this.cmdCheckAbility(player, attribs, skills);
    }
  },

  cmdAdd: function (player, attribs, skills) {
    this.participantsList.push(new Participant(player, attribs, skills));
    console.log(this.participantsList);
  },
  /**
   * Sets difficulty of game
   *
   * @param {string} difficulty difficulty you want to set
   *
   * @returns {bool} false on error, true if difficulty was set correctly
   */
  cmdSetDifficulty: function (difficulty = "") {
    let message = "";
    switch (difficulty.toLowerCase()) {
      case "trivial":
        this.standardModifier = 5;
        message = "I see, that we have some cowards here."
        break;
      case "easy":
        this.standardModifier = 0;
        message = "That game will not be a challenge."
        break;
      case "moderate":
        this.standardModifier = -5;
        message = "You will not regret that decision."
        break;
      case "difficult":
        this.standardModifier = -10;
        message = "I am glad to see so brave people here."
        break;
      case "nearly impossible":
        this.standardModifier = -15;
        message = "I hope you know this game will be worse than hell."
        break;
      default:
        return false;
    }
    console.log("The Oracle: " + message);
    return true;
  },
  /**
   * Simulates first player attacks second
   *
   * @param {string} attackerName name of attacker
   * @param {string} victimName name of victim
   *
   * @returns {bool} false on error, true if attack was carried on
   */
  cmdAttacks: function (attackerName, victimName) {
    console.log(attackerName, victimName)
    let dices =
      this.getParticipantAttrib(attackerName, "phy") +
      this.getEquipmentBoosts(attackerName)[0] +
      this.hasParticipantSkill(attackerName, "martial");

    if (dices < this.getEquipmentBoosts(attackerName)[1]) {
      dices = this.getEquipmentBoosts(attackerName)[1];
    }
    dices += this.standardModifier;
console.log(dices);
    /** Make throws */
    let dmg = 0 - this.getEquipmentBoosts(victimName)[2];
    for (let i = 0; i < dices; i++){
      if ((Math.floor(Math.random() * 6) + 1) === 1) dmg++;
    }

    if (dmg > 0) {
      let index = this.findParticipantIndex(victimName);
      this.participantsList[index].attribs[2] -= dmg;
      if (this.participantsList[index].attribs[2] <= 0) {
        this.participantsList[index].alive = false;
      }
      console.log("zaatakowano.")
    }
  },
  cmdBuys: function () {

  },
  cmdCheckAbility: function () {
    
  },

  // <editor-fold desc="participants">
  participantsList: [],

  /**
   * Searches for index of participant in participantsList
   *
   * @param {string} participantName name of participant you want to check
   *
   * @returns {number} index of participant in participantsList
   */
  findParticipantIndex: function (participantName) {
    for (let i = 0; i < this.participantsList.length; i++) {
      if (this.participantsList[i].name === participantName) return i;
    }
    return -1;
  },
  /**
   * Searches for value of specified participant's attribute
   *
   * @param {string} participantName name of participant you want to check
   * @param {string} attribName name of attrib you want to check
   *
   * @return {number} participant's attrib value
   **/
  getParticipantAttrib: function (participantName, attribName) {
    let index = this.findParticipantIndex(participantName);
    if (index === -1) return -1;

    attribName = attribName.toLowerCase();
    let attrib;
    switch (attribName) {
      case "phy":
        attrib = 0;
        break;
      case "men":
        attrib = 1;
        break;
      case "vit":
        attrib = 2;
        break;
      case "luc":
        attrib = 3;
        break;
      default:
        return -1
        break;
    }
    return this.participantsList[index].attribs[attrib];
  },
  /**
   * Checks if player has specified skill
   *
   * @param {string} participantName name of participant you want to check
   * @param {string} skillName name of skill you want to check
   *
   * @returns {bool} true if player has that skill
   */
  hasParticipantSkill: function (participantName, skillName) {
    let index = this.findParticipantIndex(participantName);
    if (index === -1) return false;

    for (let i = 0; i < this.participantsList[index].skills.length; i++) {
      if (this.participantsList[index].skills[i] === skillName) return true;
    }
    return false;
  },
  /**
   * Returns how many boost (PHY / dices / dmg reduciton) player has
   *
   * @param {string} participantName name of participant you want to check
   *
   * @returns {Array} [0] - PHY, [1] - c. dices, [2] - dmg reduction
   */
   getEquipmentBoosts: function (participantName) {
    let index = this.findParticipantIndex(participantName);
    if (index === -1) return [-1,-1,-1];

    let result = [0,0,0]
    for (let i = 0; i < this.participantsList[index].inventory.length; i++) {
      if (this.participantsList[index].inventory[i] instanceof Equipment.Melee) {
        result[0] += this.participantsList[index].inventory[i].phy;
      } else if (this.participantsList[index].inventory[i] instanceof Equipment.Projectile) {
        result[1] += this.participantsList[index].inventory[i].combatDices;
      } else {
        result[0] += this.participantsList[index].inventory[i].phy;
        result[2] += this.participantsList[index].inventory[i].dmgReduction;
      }
    }

    return result;
   },
  // </editor-fold>
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
  ],
}
