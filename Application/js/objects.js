/**
 * Class definition for the simulator model.
 * @version 0.1
 * @author Alex Soms Batalla
 */

/**
 * Statistics object constructor. Creates a Statistics objects with the members specified.
 * If not specified, the member gets a 0 value.
 * @version 0.1
 * @author Alex Soms Batalla
 * @constructor
 * @param {Array} stateArray - Associative array containing 0 or more items in Statistics.Fields
 * @returns {Statistics} - The object populated with the information on stateArray
 * @since 0.1
 */
function Statistics(stateArray) {
	this.cp = 0;
	this.maxCp = 0;
	this.hp = 0;
	this.maxHp = 0;
	this.mp = 0;
	this.maxMp = 0;
	this.pAttack = 0;
	this.mAttack = 0;
	this.speed = 0;
	this.pSpeed = 0;
	this.cSpeed = 0;
	this.pCriticChance = 0;
	this.mCriticChance = 0;
	this.pCriticDamage = 0;
	this.mCriticDamage = 0;
	this.pDefense = 0;
	this.mDefense = 0;
	this.pEvasion = 0;
	this.mEvasion = 0;
	this.pAccuracy = 0;
	this.mAccuracy = 0;
	this.INT = 0;
	this.MEN = 0;
	this.CON = 0;
	this.STR = 0;
	this.DEX = 0;
	this.WIT = 0;
	this.fire = 0;
	this.water = 0;
	this.wind = 0;
	this.earth = 0;
	this.dark = 0;
	this.holy = 0;
	if (stateArray != undefined) {
		for (var index in stateArray) {
			this[index] = stateArray[index];
		}
	}
}

Statistics.fields = ["cp", "maxCp", "hp", "maxHp", "mp", "maxMp", "pAttack", "mAttack", "speed", "pSpeed", "cSpeed", "pCriticChance", "mCriticChance", "pCriticDamage", "mCriticDamage", "pDefense", "mDefense", "pEvasion", "mEvasion", "pAccuracy", "mAccuracy", "INT", "MEN", "CON", "STR", "DEX", "WIT", "fire", "water", "wind", "earth", "dark", "holy"];

/**
 * Combines (adds) the members of two Statistics objects.
 * @version 0.1
 * @author Alex Soms Batalla
 * @param {Statistics} anotherStat - The stat to be combined with this
 * @returns {this}
 * @since 0.1
 */
Statistics.prototype.combine = function(anotherStat) {
	for (var i = 0; i < Statistics.fields.length; i++) {
		this[Statistics.fields[i]] += anotherStat[Statistics.fields[i]];
	}
}

/**
 * Combines (multiplies by %) the members of two Statistics objects.
 * @version 0.1
 * @author Alex Soms Batalla
 * @param {Statistics} anotherStat - The stat to be combined with this
 * @returns {this}
 * @since 0.1
 */
Statistics.prototype.combineProportional = function(anotherStat) {
	for (var i = 0; i < Statistics.fields.length; i++) {
		this[Statistics.fields[i]] *= (1 + anotherStat[Statistics.fields[i]]/100);
	}
}

/**
 * Character object constructor. The character created has any object equipped.
 * @version 0.1
 * @author Alex Soms Batalla
 * @constructor
 * @abstract
 * @returns {Character} - The object created
 * @since 0.1
 */
function Character() {
	this.basicStats = new Statistics({});
	this.calculatedStats = null;
	
	this.shield = null;
	this.weapon = null;
	this.belt = null;
	this.helmet = null;
	this.hairAccesory = null;
	this.necklace = null;
	this.earing = [null, null];
	this.bracelet = null;
	this.gloves = null;
	this.boots = null;
	this.ring = [null, null];
	this.body = null;
	this.legs = null;
	this.cloak = null;
	
	this.affectedBy = new Array();
	this.lvl = 40;
	this.class = "Arbalester";
	this.gender = "Female";
	this.currentAction = "Stand";
}

/**
 * Updates the statistics of the character.
 * @version 0.1
 * @author Alex Soms Batalla
 * @returns {this}
 * @since 0.1
 */
Character.prototype.calculate = function() {
	var c = new Statistics({});
	var p = new Statistics({});
	var eqs = [this.shield, this.weapon, this.belt, this.helmet, this.hairAccesory, this.necklace, this.earing[0], this.earing[1], this.bracelet, this.gloves, this.boots, this.ring[0], this.ring[1], this.body, this.legs, this.cloak];
	for(var i = 0; i < eqs.length; i++) {
		var eq = eqs[i];
		if (eq != null) {
			c.combine(eq.equipmentAlteredState.bonus.StatisticsAdded);
			p.combine(eq.equipmentAlteredState.StatisticsProportional);
		}
	}
	for(var i = 0; i < this.affectedBy.length; i++) {
		var altState = this.affectedBy[i];
		if (altState.applies(this)) {
			c.combine(altState.bonus.StatisticsAdded);
			p.combine(altState.bonus.StatisticsProportional);		
		}
	}
	
	this.calculatedStats = c;
	this.calculatedStats.combine(this.basicStats);
	this.calculatedStats.combineProportional(p);
	
}

/**
 * Tests if a character has a given equipment.
 * @version 0.1
 * @author Alex Soms Batalla
 * @param {String} name - The name of the equipment
 * @returns {Boolean} - The character has equipped somewhere an equipment with the given name
 * @since 0.1
 */
Character.prototype.hasEquiped = function(name) {
	var eqs = [this.shield, this.weapon, this.belt, this.helmet, this.hairAccesory, this.necklace, this.earing[0], this.earing[1], this.bracelet, this.gloves, this.boots, this.ring[0], this.ring[1], this.body, this.legs, this.cloak];
	var i = 0;
	var b = false;
	while (!b && i < eqs.length) {
		if (eqs[i] != null) {
			b = (eqs[i].name == name);
		}
		i++;
	}
	return b;
}

/*
function Skill() {

}

function ActiveSkill() {
	Skill.call(this);
}

ActiveSkill.prototype = Object.create(Skill.prototype);

function PasiveSkill() {
	Skill.call(this);
}

PasiveSkill.prototype = Object.create(Skill.prototype);
*/

/**
 * Bonus object constructor. The Bonus object contains two statistics objects.
 * @version 0.1
 * @author Alex Soms Batalla
 * @constructor
 * @param {Statistics} statisticsAdded - The scalar state
 * @param {Statistics} statisticsProportional - The proportional state
 * @returns {this}
 * @since 0.1
 */
function Bonus(statisticsAdded, statisticsProportional) {
	this.statisticsAdded = statisticsAdded;
	this.statisticsProportional = statisticsProportional;
}

/**
 * AlteredState object constructor. Contains the information about the bonus, name, type and conditions
 * to apply the state.
 * @version 0.1
 * @author Alex Soms Batalla
 * @constructor
 * @param {String} name - The name of the AlteredState
 * @param {String} type - The type of the AlteredState
 * @param {Statistics} statisticsAdded - The scalar Statistics
 * @param {Statistics} statisticsProportional - The proportional Statistics
 * @returns {this}
 * @since 0.1
 */
function AlteredState(name, type, statisticsAdded, statisticsProportional, conditions) {
	this.name = name;
	this.type = type;
	this.bonus = new Bonus(statisticsAdded, statisticsProportional);
	this.conditions = conditions;
}

/**
 * Tests if the bonus should be applied to a given Character.
 * @version 0.1
 * @author Alex Soms Batalla
 * @param {Character} character - The character to test the appliance of the bonuses.
 * @returns {Bolean} - The bonus should apply
 * @since 0.1
 */
AlteredState.prototype.applies = function(character) {
	var b = true;
	var i = 0;
	while (b && this.conditions.length > i) {
		b = this.conditions[i].isSatisfied(character);
		i++;
	}
	return b;
}

/**
 * Condition object constructor. It models the conditions to apply a bonus.
 * @version 0.1
 * @author Alex Soms Batalla
 * @constructor
 * @param {String} name - The name of the condition
 * @returns {this}
 * @since 0.1
 */
function Condition(name) {
	this.name = name;
}

/**
 * AlwaysCondition object constructor. This condition is always fulfilled.
 * @version 0.1
 * @author Alex Soms Batalla
 * @constructor
 * @param {String} name - The name of the condition
 * @returns {this}
 * @since 0.1
 */
function AlwaysCondition(name) {
	Condition.call(this, name);
}
AlwaysCondition.prototype = Object.create(Condition.prototype);

/**
 * Tests the Condition.
 * @version 0.1
 * @author Alex Soms Batalla
 * @constructor
 * @returns {Boolean} - The Condition should be applied
 * @since 0.1
 */
AlwaysCondition.prototype.isSatisfied = function(character) {
	return true;
}

/**
 * SetEquipmentCondition object constructor. This condition is fulfilled when a list of equipments are equiped.
 * @version 0.1
 * @author Alex Soms Batalla
 * @constructor
 * @param {String} name - The name of the condition
 * @param {Array} equipmentNamesRequired - The names of the required equipments
 * @returns {this}
 * @since 0.1
 */
function SetEquipmentCondition(name, equipmentNamesRequired) {
	Condition.call(this, name);
	this.equipmentNamesRequired = equipmentNamesRequired;
}
SetEquipmentCondition.prototype = Object.create(Condition.prototype);

/**
 * Tests the Condition.
 * @version 0.1
 * @author Alex Soms Batalla
 * @constructor
 * @returns {Boolean} - The Condition should be applied
 * @since 0.1
 */
SetEquipmentCondition.prototype.isSatisfied = function(character) {
	var b = true;
	var i = 0;
	while(b && i < this.equipmentNamesRequired.length) {
		b = (character.hasEquiped(this.equipmentNamesRequired[i]));
		i++;
	}
	return b;
}

/**
 * StatisticsCondition object constructor. It fulfills based on Character's Statistics
 * @version 0.1
 * @author Alex Soms Batalla
 * @constructor
 * @param {String} name - The name of the condition
 * @param {Number} minHP - The percent of minimum HP
 * @param {Number} maxHP - The percent of maximum HP
 * @param {Number} minMP - The percent of minimum MP
 * @param {Number} maxMP - The percent of maximum MP
 * @param {Number} minCP - The percent of minimum CP
 * @param {Number} maxCP - The percent of maximum CP
 * @returns {this}
 * @since 0.1
 */

function StatisticsCondition(name, minHp, maxHp, minCp, maxCp, minMp, maxMp) {
	Condition.call(this);
	this.maxCp = maxCp;
	this.minCp = minCp;
	this.maxMp = maxMp;
	this.minMp = minMp;
	this.maxHp = maxHp;
	this.minHp = minHp;
}
StatisticsCondition.prototype = Object.create(Condition.prototype);

/**
 * Tests the Condition.
 * @version 0.1
 * @author Alex Soms Batalla
 * @constructor
 * @returns {Boolean} - The Condition should be applied
 * @since 0.1
 */
StatisticsCondition.prototype.isSatisfied = function(character) {
	var cp = character.cp / character.maxCp * 100;
	var mp = character.mp / character.maxMp * 100;
	var hp = character.hp / character.maxHp * 100;
	return cp >= this.minCp && cp <= this.maxCp && mp >= this.minMp && mp <= this.maxMp && hp >= this.minHp && hp <= this.maxHp;
}

/*
function Buff(name, StatisticsAdded, StatisticsProportional, condition) {
	AlteredState.call(this, name, StatisticsAdded, StatisticsProportional, condition);
}

Buff.prototype = Object.create(AlteredState.prototype);

function Debuff(name, StatisticsAdded, StatisticsProportional, condition) {
	AlteredState.call(this, name, StatisticsAdded, StatisticsProportional, condition);
}

Debuff.prototype = Object.create(AlteredState.prototype);

function PasiveSkill() {
	AlteredState.call(this, name, StatisticsAdded, StatisticsProportional, condition);
}

PasiveSkill.prototype = Object.create(AlteredState.prototype);

function Equipment(name, grade, StatisticsAdded, StatisticsProportional) {
	this.name = name;
	this.grade = grade;
	this.StatisticsAdded = StatisticsAdded;
	this.StatisticsProportional = StatisticsProportional;
}

function Weapon(name, grade, StatisticsAdded, StatisticsProportional, attackSpeed, type) {
	Equipment.call(this, name, grade, StatisticsAdded, StatisticsProportional);
	this.attackSpeed = attackSpeed;
	this.type = type;
}

Weapon.prototype = Object.create(Equipment.prototype);

function Armor(name, grade, StatisticsAdded, StatisticsProportional) {
	Equipment.call(this, name, grade, StatisticsAdded, StatisticsProportional);
}

Armor.prototype = Object.create(Equipment.prototype);

function Jewelry(name, grade, StatisticsAdded, StatisticsProportional) {
	Equipment.call(this, name, grade, StatisticsAdded, StatisticsProportional);
}

Jewelry.prototype = Object.create(Equipment.prototype); 
*/