function addStateToList() {

	// TODO: Multiple choice
	
	var name = document.getElementById("name").value;
	if(name == "") {
		alert("void name");
		return;
	}
	var type = document.getElementById("type").value;
	var str = "AlteredStates['" + name + "'] = new AlteredState(";
	str += "'" + name + "', '" + type + "', new Statistics({";
	var first = true;
	for (var i = 0; i < Statistics.fields.length; i++) {
		var key = Statistics.fields[i];
		var control = document.getElementById(key);
		if (control != null) {
			var val = parseInt(control.value);
			if (!Number.isNaN(val) && val != 0) {
				if (!first) { str += ", "; }
				str += "'" + key + "':" + val;
				first = false;
			}
		}
	}
	str += "}), new Statistics({"
	first = true;
	for (var i = 0; i < Statistics.fields.length; i++) {
		var key = Statistics.fields[i];
		var control = document.getElementById(key+"_");
		if (control != null) {
			var val = parseFloat(control.value);
			if (!Number.isNaN(val) && val != 0) {
				if (!first) { str += ", "; }
				str += "'" + key + "':" + val;
				first = false;
			}
		}
	}
	var c = document.getElementById('conditions').value;
	str += "}), [ Conditions['"+c+"'] ]);\n";
	
	
	var e = document.getElementById('created-textarea');
	e.value += str;
}

function addSetEquipmentConditionToList() {
	var name = document.getElementById("name-set").value;
	if(name == "") {
		alert("void name");
		return;
	}
	
	var eqs = document.getElementById("equipmentNamesRequired").value;
	if(eqs == "") {
		alert("void equipments required");
		return;
	}
	
	var str = "Conditions['" + name + "'] = new SetEquipmentCondition('" + name + "', [";
	
	var eqsSplit = eqs.split(",");
	var first = true;
	for (var i = 0; i < eqsSplit.length; i++) {
		var key = eqsSplit[i].trim();
		if (key != "") {
			if (!first) { str += ", "; }
			str += "'" + key + "'";
			first = false;
		}
			
	}
	
	str += "]);\n";
	
	var e = document.getElementById('created-textarea');
	e.value += str;
}

function addStatisticsConditionToList() {
	var name = document.getElementById("name-statistics").value;
	if(name == "") {
		alert("void name");
		return;
	}
	
	minHp = parseNumberFromId("minHp");
	maxHp = parseNumberFromId("maxHp");
	minCp = parseNumberFromId("minCp");
	maxCp = parseNumberFromId("maxCp");
	minMp = parseNumberFromId("minMp");
	maxMp = parseNumberFromId("maxMp");
	
	
	var str = "Conditions['" + name + "'] = new StatisticsCondition('" + name + "', "+minHp+", "+maxHp+", "+minCp+", "+maxCp+", "+minMp+", "+maxMp+");\n";
	
	var e = document.getElementById('created-textarea');
	e.value += str;
}

function populateConditionNames() {
	var select = document.getElementById('conditions');
	for (var p in Conditions) {
		var opt = document.createElement('option');
		opt.innerHTML = p;
		select.appendChild(opt);
	}
}

function populateAlteredStatesNames() {
	var select = document.getElementById('altered_state');
	for (var p in AlteredStates) {
		var opt = document.createElement('option');
		opt.innerHTML = p;
		select.appendChild(opt);
	}
}

function parseNumberFromId(id) {
	var n = parseFloat(document.getElementById(id).value);
	if (Number.isNaN(n)) {
		n = 0;
	}
	return n;
}