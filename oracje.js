/**
 * Oracle object
 * @module oracle
 *
 * @typedef {Object} Oracle
 *
 * @property {Function} cmdRecognition
 * @property {Function} cmdAdd
 * @property {Function} cmdSetDifficulty
 * @property {Function} cmdAttacks
 * @property {Function} cmdBuys
 * @property {Function} cmdCheckAbility
 * @property {Array} participantsList list of all participants in game
 * @property {number} standardModificator modificates difficulty of game
 * @property {Array} availableSkills list of all availabe in game skill
 * @property {Array} availableEquipment list of all availabe in game equipment
 *
 * @exports oracle
 */
module.exports = {
  cmdRecognition: function () {},

  cmdAdd: function () {},
  cmdSetDifficulty: function () {},
  cmdAttacks: function () {},
  cmdBuys: function () {},
  cmdCheckAbility: function () {},

  participantsList: [],

  standardModificator: 0,

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

  availableEquipment: [
    //...
  ],
}
