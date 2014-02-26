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

Statistics.prototype.combine = function(anotherStat) {
	for (var i = 0; i < Statistics.fields.length; i++) {
		this[Statistics.fields[i]] += anotherStat[Statistics.fields[i]];
	}
}

Statistics.prototype.combineProportional = function(anotherStat) {
	for (var i = 0; i < Statistics.fields.length; i++) {
		this[Statistics.fields[i]] *= (1 + anotherStat[Statistics.fields[i]]/100);
	}
}

/*

function Character() {
	this.basicStats = new Statistics({});
	
	this.calculatedStats = null;
	this.leftWeapon = null;
	this.rightWeapon = null;
	this.helmet = null;
	this.boots = null;
	this.body = null;
	this.legs = null;
	this.gloves = null;
	this.necklace = null;
	this.leftRing = null;
	this.rightRing = null;
	this.leftEaring = null;
	this.righEaring = null;
	
	this.buffs = new Array();
	this.debuffs = new Array();
	this.pasives = new Array();
	this.lvl = 1;
	this.gender = "male";
}

Character.prototype.calculate = function() {
	var c = new Statistics({});
	var p = new Statistics({});
	var eqs = [this.leftWeapon, this.rightWeapon, this.helmet, this.boots, this.body, this.legs, this.gloves, this.necklace, this.leftRing, this.rightRing, this.leftEarng, this.rightEaring];
	for(var i = 0; i < eqs.length; i++) {
		var eq = eqs[i];
		if (eq != null) {
			c.combine(eq.StatisticsAdded);
			p.combine(eq.StatisticsProportional);
		}
	}
	for(var i = 0; i < this.buffs.length; i++) {
		var eq = this.buffs[i];
		c.combine(eq.StatisticsAdded);
		p.combine(eq.StatisticsProportional);		
	}
	
	// check buffs
	// check debuffs
	// check pasives
	this.calculatedStats = c;
	this.calculatedStats.combine(this.basicStats);
	this.calculatedStats.combineProportional(p);
	
}

Character.prototype.hasEquiped = function(name) {
	var eqs = [this.leftWeapon, this.rightWeapon, this.helmet, this.boots, this.body, this.legs, this.gloves, this.necklace, this.leftRing, this.rightRing, this.leftEarng, this.rightEaring];
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
*/

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

function Bonus(statisticsAdded, statisticsProportional) {
	this.statisticsAdded = statisticsAdded;
	this.statisticsProportional = statisticsProportional;
}

function AlteredState(name, type, statisticsAdded, statisticsProportional, conditions) {
	this.name = name;
	this.type = type;
	this.bonus = new Bonus(statisticsAdded, statisticsProportional);
	this.conditions = conditions;
}

AlteredState.prototype.applies = function(character) {
	var b = true;
	var i = 0;
	while (b && this.conditions.length > i) {
		b = this.conditions[i].isSatisfied(character);
		i++;
	}
	return b;
}

function Condition(name) {
	this.name = name;
}

function AlwaysCondition(name) {
	Condition.call(this);
}

AlwaysCondition.prototype.isSatisfied = function(character) {
	return true;
}

function SetEquipmentCondition(name, equipmentNamesRequired) {
	Condition.call(this);
	this.equipmentNamesRequired = equipmentNamesRequired;
}

SetEquipmentCondition.prototype.isSatisfied = function(character) {
	var b = true;
	var i = 0;
	while(b && i < this.equipmentNamesRequired.length) {
		b = (character.hasEquiped(this.equipmentNamesRequired[i]));
		i++;
	}
	return b;
}

function StatisticsCondition(name, minHp, maxHp, minCp, maxCp, minMp, maxMp) {
	Condition.call(this);
	this.maxCp = maxCp;
	this.minCp = minCp;
	this.maxMp = maxMp;
	this.minMp = minMp;
	this.maxHp = maxHp;
	this.minHp = minHp;
}

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