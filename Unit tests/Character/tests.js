test( "Constructor", function() {
	var obj = new Character();
	ok( obj !== null && obj !== undefined, "Constructor gives something" );

	ok( obj.basicStats !== undefined, "basicStats");
	ok( obj.calculatedStats !== undefined, "calculatedStats");
	
	ok( obj.shield !== undefined, "shield");
	ok( obj.weapon !== undefined, "weapon");
	ok( obj.belt !== undefined, "belt");
	ok( obj.helmet !== undefined, "helmet");
	ok( obj.hairAccesory !== undefined, "hairAccesory");
	ok( obj.necklace !== undefined, "necklace");
	ok( obj.earing !== undefined, "earing");
	ok( obj.bracelet !== undefined, "bracelet");
	ok( obj.gloves !== undefined, "gloves");
	ok( obj.boots !== undefined, "boots");
	ok( obj.ring !== undefined, "ring");
	ok( obj.body !== undefined, "body");
	ok( obj.legs !== undefined, "legs");
	ok( obj.cloak !== undefined, "cloak");
	
	ok( obj.affectedBy !== undefined, "affectedBy");
	ok( obj.lvl !== undefined, "lvl");
	ok( obj.class !== undefined, "class");
	ok( obj.gender !== undefined, "gender");
	ok( obj.currentAction !== undefined, "currentAction");
});

test( "Calculate", function() {
	// TODO: more thorough test
	var obj = new Character();
	
	obj.calculate();
	
	ok ( obj.calculatedStats !== null , "statistics updated");
});

test( "hasEquiped", function() {
	// TODO: more thorough test
	var obj = new Character();
	
	// inject equipment stubs
	var e1 = {name: "Elysian"};
	var e2 = {name: "Moirai helmet"};
	var e3 = {name: "Dinasty ring"};
	var e4 = {name: "Zaken cloak"};
	
	ok( !obj.hasEquiped("Dinasty ring"), "ring not equiped" );
	obj.ring[0] = e3;
	ok( obj.hasEquiped("Dinasty ring"), "ring not recognized" );
	
	ok( !obj.hasEquiped("Elysian"), "weapon not equiped" );
	obj.ring[0] = e1;
	ok( obj.hasEquiped("Elysian"), "weapon not recognized" );
	
	ok( !obj.hasEquiped("Moirai helmet"), "helmet not equiped" );
	obj.ring[0] = e2;
	ok( obj.hasEquiped("Moirai helmet"), "helmet not recognized" );
	
	ok( !obj.hasEquiped("Zaken cloak"), "cloak not equiped" );
	obj.cloak = e4;
	ok( obj.hasEquiped("Zaken cloak"), "cloak not recognized" );
	
	
});
// ok( truthy [, message ] )
// equal( actual, expected [, message ] )