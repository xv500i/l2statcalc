var allBuffs = {};
var allWeapons = {};
var noStats = new Stadistics({});
var automatic = new AlwaysCondition();
allBuffs["Might 1"] = new Buff("Might 1", noStats, new Stadistics({"pAttack":5}), automatic);
allWeapons["Tallum Blade"] = new Weapon("Tallum Blade", "A", new Stadistics({"pAttack": 125, "pCriticChance": 50}), noStats, "fast", "1h sword");
allWeapons["Elysian"] = new Weapon("Elysian", "A", new Stadistics({"pAttack": 125, "pCriticChance": 25}), noStats, "fast", "1h blunt");