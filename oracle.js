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

  cmdAdd: function () {
    
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
  },
  cmdAttacks: function () {},
  cmdBuys: function () {},
  cmdCheckAbility: function () {},

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
