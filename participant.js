/**
 * Participant constructor
 * @module participant
 *
 * @class
 *
 * @constructor
 *
 * @property {number} id the participant's id
 * @property {string} name the participant's firstname and lastname or nick
 * @property {Array} attribs table, which contains points assigned to attributes
 * @property {Array} skills table, which contains skills owned by participant
 * @property {number} gold number of gold/golden coins owned by participant
 * @property {Array} inventory table, which contains weapons' or armors' objects used by participant
 *
 * @exports participant
 */
module.exports = function (name = "", atribs = [1,1,1,1], skills = []) {
  this.name = name;

  /**
   * attribs[0] <- PHY
   * attribs[1] <- MEN
   * attribs[2] <- VIT
   * attribs[3] <- LUC
   *
   * @type {Array}
   */
  this.attribs = atribs;
  /**
   * Table contains indexes of two skills
   * indexes based on Oracle.availableSkills[]
   *
   * @type {Array}
   */
  this.skills = skills;

  /**
   * Gold owned by participant
   *
   * @type {number}
   */
  this.gold = attribs[3] * 15;

  /**
   * Equipment owned by participant
   * Contains objects
   *
   * @type {Array}
   */
  this.inventory = [];
}
