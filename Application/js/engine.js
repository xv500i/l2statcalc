function addStateToList() {
	
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
	str += "}), []);\n";
	
	var e = document.getElementById('created-textarea');
	e.value += str;
}

function createAlteredStateFromForm(formId) {

}