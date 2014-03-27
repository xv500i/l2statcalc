test( "Constructor", function() {
	var obj = new Statistics();
	ok( obj != null && obj != undefined, "Constructor gives something" );
	
	ok( obj.cp != undefined ,"cp");
	ok( obj.maxCp != undefined, "maxCp");
	ok( obj.hp != undefined, "hp");
	ok( obj.maxHp != undefined, "maxHp" );
	ok( obj.mp != undefined, "mp" );
	ok( obj.maxMp != undefined, "maxMp" );
	ok( obj.pAttack != undefined, "pAttack" );
	ok( obj.mAttack != undefined, "mAttack" );
	ok( obj.speed != undefined, "speed" );
	ok( obj.pSpeed != undefined, "pSpeed" );
	ok( obj.cSpeed != undefined, "cSpeed" );
	ok( obj.pCriticChance != undefined, "pCriticChance" );
	ok( obj.mCriticChance != undefined, "mCriticChance" );
	ok( obj.pCriticDamage != undefined, "pCriticDamage" );
	ok( obj.mCriticDamage != undefined, "mCriticDamage" );
	ok( obj.pDefense != undefined, "pDefense" );
	ok( obj.mDefense != undefined, "mDefense" );
	ok( obj.pEvasion != undefined, "pEvasion" );
	ok( obj.mEvasion != undefined, "mEvasion" );
	ok( obj.pAccuracy != undefined, "pAccuracy" );
	ok( obj.mAccuracy != undefined, "mAccuracy" );
	ok( obj.INT != undefined, "INT" );
	ok( obj.MEN != undefined, "MEN" );
	ok( obj.CON != undefined, "CON" );
	ok( obj.STR != undefined, "STR" );
	ok( obj.DEX != undefined, "DEX" );
	ok( obj.WIT != undefined, "WIT" );
	ok( obj.fire != undefined, "fire" );
	ok( obj.water != undefined, "water" );
	ok( obj.wind != undefined, "wind" );
	ok( obj.earth != undefined, "earth" );
	ok( obj.dark != undefined, "dark" );
	ok( obj.holy != undefined, "holy" );
});

test( "Combine", function() {
	var stat1 = new Statistics({"holy": 10, "mDefense": 20});
	var stat2 = new Statistics();
	
	stat2.combine(stat1);
	
	equal( stat2["holy"], 10, "combine holy");
	equal( stat2["mDefense"], 20, "combine mDefense");
	equal( stat2["pDefense"], 0, "combine pDefense");
});

test( "Combine Proportional", function() {
	var stat1 = new Statistics({"holy": 10, "mDefense": 20});
	var stat2 = new Statistics({"holy": 50, "mDefense": 25});
	
	stat1.combineProportional(stat2);
	
	equal( stat1["holy"], 15, "combine proportional holy");
	equal( stat1["mDefense"], 25, "combine proportional mDefense");
	equal( stat1["pDefense"], 0, "combine proportional pDefense");
});
// ok( truthy [, message ] )
// equal( actual, expected [, message ] )