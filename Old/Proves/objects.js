function Stadistics(stateArray) {
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
	if (stateArray != undefined) {
		for (var index in stateArray) {
			this[index] = stateArray[index];
		}
	}
}

Stadistics.prototype.combine = function(anotherStat) {
	var fields = ["cp", "maxCp", "mp", "maxMp", "hp", "maxHp", "pAttack"];
	for (var i = 0; i < fields.length; i++) {
		this[fields[i]] += anotherStat[fields[i]];
	}
}

Stadistics.prototype.combineProportional = function(anotherStat) {
	var fields = ["cp", "maxCp", "mp", "maxMp", "hp", "maxHp", "pAttack"];
	for (var i = 0; i < fields.length; i++) {
		this[fields[i]] *= (1 + anotherStat[fields[i]]/100);
	}
}

function Character() {
	this.basicStats = new Stadistics({});
	
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
	var c = new Stadistics({});
	var p = new Stadistics({});
	var eqs = [this.leftWeapon, this.rightWeapon, this.helmet, this.boots, this.body, this.legs, this.gloves, this.necklace, this.leftRing, this.rightRing, this.leftEarng, this.rightEaring];
	for(var i = 0; i < eqs.length; i++) {
		var eq = eqs[i];
		if (eq != null) {
			c.combine(eq.stadisticsAdded);
			p.combine(eq.stadisticsProportional);
		}
	}
	for(var i = 0; i < this.buffs.length; i++) {
		var eq = this.buffs[i];
		c.combine(eq.stadisticsAdded);
		p.combine(eq.stadisticsProportional);		
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

function AlteredState(name, stadisticsAdded, stadisticsProportional, conditions) {
	this.name = name;
	this.stadisticsAdded = stadisticsAdded;
	this.stadisticsProportional = stadisticsProportional;
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

function AlwaysCondition() {
}

AlwaysCondition.prototype.isSatisfied = function(character) {
	return true;
}

function SetEquipmentCondition(equipmentNamesRequired) {
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

function Buff(name, stadisticsAdded, stadisticsProportional, condition) {
	AlteredState.call(this, name, stadisticsAdded, stadisticsProportional, condition);
}

Buff.prototype = Object.create(AlteredState.prototype);

function Debuff(name, stadisticsAdded, stadisticsProportional, condition) {
	AlteredState.call(this, name, stadisticsAdded, stadisticsProportional, condition);
}

Debuff.prototype = Object.create(AlteredState.prototype);

function PasiveSkill() {
	AlteredState.call(this, name, stadisticsAdded, stadisticsProportional, condition);
}

PasiveSkill.prototype = Object.create(AlteredState.prototype);

function Equipment(name, grade, stadisticsAdded, stadisticsProportional) {
	this.name = name;
	this.grade = grade;
	this.stadisticsAdded = stadisticsAdded;
	this.stadisticsProportional = stadisticsProportional;
}

function Weapon(name, grade, stadisticsAdded, stadisticsProportional, attackSpeed, type) {
	Equipment.call(this, name, grade, stadisticsAdded, stadisticsProportional);
	this.attackSpeed = attackSpeed;
	this.type = type;
}

Weapon.prototype = Object.create(Equipment.prototype);

function Armor(name, grade, stadisticsAdded, stadisticsProportional) {
	Equipment.call(this, name, grade, stadisticsAdded, stadisticsProportional);
}

Armor.prototype = Object.create(Equipment.prototype);

function Jewelry(name, grade, stadisticsAdded, stadisticsProportional) {
	Equipment.call(this, name, grade, stadisticsAdded, stadisticsProportional);
}

Jewelry.prototype = Object.create(Equipment.prototype);