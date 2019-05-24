/**
 * Equipment object containing equipment's contructors
 * @module equipment
 *
 * @typedef {Object} Equipment
 *
 * @property {Function} Melee melee weapon's contructor
 * @property {Function} Projectile ranged weapon's contructor
 * @property {Function} Armor armor's contructor
 *
 * @exports equipment
 */
module.exports = {
  /**
   * Melee weapon
   * @class
   *
   * @constructor
   *
   * @property {string} name name of weapon
   * @property {number} phy PHY stat of weapon (like damage)
   * @property {number} price cost of weapon
   */
  Melee: function (name, phy, price) {
    this.name = name;
    this.phy = phy;
    this.price = price;
  },
  /**
   * Projectile (ranged) weapon
   * @class
   *
   * @constructor
   *
   * @property {string} name name of weapon
   * @property {number} combatDices number of dices used to attack with this weapon
   * @property {number} price cost of weapon
   */
  Projectile: function (name, combatDices, price) {
    this.name = name;
    this.combatDices = combatDices;
    this.price = price;
  },
  /**
   * Armor
   * @class
   *
   * @constructor
   * 
   * @property {string} name name of armor
   * @property {number} phy should be <0, number of PHY subtracted from player while using this armor
   * @property {number} dmgReduction defines how much damage will be reduced by this armor
   * @property {number} price cost of armor
   */
  Armor: function (name, phy, dmgReduction, price) {
    this.name = name;
    this.phy = phy;
    this.dmgReduction = dmgReduction;
    this.price = price;
  }
}
