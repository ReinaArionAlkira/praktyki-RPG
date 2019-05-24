let Equipment = require("./equipment.js");

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
  cmdRecognition: function () {},

  cmdAdd: function () {},
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
    let dices =
      this.findParticipantAttrib(attackerName, "phy") +
      //modyfikatory broni +
      this.hasParticipantSkill(attackerName, "martial");
    /* if (combatDices < Projectile Combat Dices) {Projectile Combat Dices} */
    dices += this.standardModifier;

    /** Make throws */
    let oneCount = 0;
    for (let i = 0; i < dices; i++) {
      if ((Math.floor(Math.random() * 6) + 1) === 1) oneCount++;
    }

  },
  cmdBuys: function () {},
  cmdCheckAbility: function () {},

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
    return this.participantsList.map(function (e,i,a,participantName) {
      if (e.name === participantName) return i;
    });
  },
  /**
   * Searches for value of specified participant's attribute
   *
   * @param {string} participantName name of participant you want to check
   * @param {string} attribName name of attrib you want to check
   *
   * @return {number} participant's attrib value
   **/
  findParticipantAttrib: function (participantName, attribName) {
    attribName = attribName.toLowerCase();
    attrib = attribName === "phy" ? 0 : (attribName === "men" ? 1 : (attribName === "vit" ? 2 : (attribName === "luc" ? 3 : false)));
    if (attrib === false) return undefined;

    return this.participantsList.map(function (e,i,a,participantName,attribName) {
      if (e.name === participantName) return e.attribs[attrib];
    });
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
    return (this.participantsList.map(function (e,i,a,participantName,skillName) {
      if (e.name === participantName) {
        e.skills.map(function (e,i,a,skillName) {
          if (e === skillName) return true;
        });
      }
      return false;
    });
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
