/* hw3b.js */

//window.onload = problem3;
window.addEventListener("load", problem1);
window.addEventListener("load", problem2);
window.addEventListener("load", problem3);
window.addEventListener("load", problem4);

/************ START PROBLEM 1 ************************/
function problem1 () {
	'use strict';
	var password1 = document.getElementById("pwd1");
	var password2 = document.getElementById("pwd2");
	var p1_value = null;
	var p2_value = null;
	document.getElementById("pwdMatch").style.display = "none";

	password1.addEventListener("focus", function() {
		var min_char = 8;
	
		if ( !this.value || this.value.length < min_char ) {
			document.getElementById("pwd1Hint").style.display = "inline";
		}
	
		this.addEventListener("keyup", function () {
			if ( this.value.length < min_char ) {
				document.getElementById("pwd1Hint").style.display = "inline";
			}
			else {
				document.getElementById("pwd1Hint").style.display = "none";
			}
		});
	
		this.addEventListener("blur", function() {
			console.log(this.value);
			p1_value = this.value;
		});
	});

	password2.addEventListener("focus", function() {
		if ( this.value ) {
			this.value = "";
			document.getElementById("pwdMatch").style.display = "none";
		}
	
		if ( p1_value ) {
			document.getElementById("pwd2Hint").style.display = "inline";
		}
	
		this.addEventListener("keyup", function () {
			if ( this.value != p1_value ) {
				document.getElementById("pwd2Hint").style.display = "inline";
			}
			else {
				document.getElementById("pwd2Hint").style.display = "none";
			}
			//console.log(this.value);
		});
	
		this.addEventListener("blur", function() {
			if ( this.value != p1_value ) {
				document.getElementById("pwd2Hint").style.display = "inline";
				password2.value = "";
				password2.focus();
			}
			else {
				document.getElementById("pwdMatch").style.display = "inline";
				document.getElementById("pwdMatch").style.color = "green";
			}
		});
	
	});


}
/************ END PROBLEM 1 ************************/



/************ START PROBLEM 2 ************************/
function problem2 () {
	'use strict';
	var txt = document.getElementById("bio");
	var char_limit = 140;
	
	txt.addEventListener("keyup", function () {
		if ( this.value.length <= char_limit ) {
			document.getElementById("charsLeft").innerHTML = (char_limit - this.value.length);
		}
		//the idea for this block came from: http://stackoverflow.com/questions/10414420/how-to-prevent-user-to-enter-text-in-textarea-after-reaching-max-character-limit
		else {
			this.value = this.value.substring(0, char_limit);
		}
	});
}
/************ END PROBLEM 2 ************************/

/************ START PROBLEM 3 ************************/
function problem3 () {
	'use strict';
	//get the select field by id
	var selectField = document.getElementById("firstSelect"); 

	var subSelectField = document.getElementById("secondSelect"); 
	
	var subSelectSet = 'FALSE';

	//create an array with the options for the select field
	var optionsSelect = ["Strings", "Woodwinds", "Brass", "Percussion", "Keyboard"]; 
	var optionsSubSelect = [];

	//Loop through the array
	for(var i = 0; i < optionsSelect.length; i++) {
	
		//create an option tag
		var element = document.createElement("option");

		//add the strings from your array into each option tag
		var words = document.createTextNode(optionsSelect[i]);
	
		//set the value of each option to the strings from your array
		element.value = optionsSelect[i];
	
		//append each Text Node to each option tag.
		element.appendChild(words);
	 
		//append each option tag to to the select field
		selectField.appendChild(element);
	}

	// Create an object with the options from your first select field as the properties. 
	// Store the options for the second select field in each property.
	var myObj ={
		Strings:["Violin", "Viola", "Cello", "Double Bass", "Harp"],
		Woodwinds:["Oboe", "Clarinet", "Flute", "Bassoon"],
		Brass:["Trumpet", "Trombone", "Euphonium", "Tuba", "French Horn"],
		Percussion:["Timpani", "Snare Drum", "Triangle"],
		Keyboard:["Piano", "Harpsichord", "Celeste"]
	}

	// When an option is selected, use the value of the selectField to select the property of your object
	// 1. call the second function to build up the second select box
	// 2. pass the original select through to the second function
	selectField.addEventListener("change", function(){
	//selectField.onchange = function(){
		var myVal = selectField.value;
	
	
		//console.log(myVal);
		//console.log(selectField.value.length);
		//console.log(myObj[selectField.value]);
		//console.log(myObj[selectField.value].length);
		//console.log(myObj[selectField.value][0]);
		//alert("optionsSubselectLength is " + optionsSubSelect.length);
		//clear out subSelect if there are any values in there
		
		if ( subSelectSet == 'TRUE' ) {
			// http://www.2ality.com/2012/12/clear-array.html
			optionsSubSelect = [];
			// http://www.somacon.com/p542.php
			subSelectField.options.length = 0;
			subSelectSet == 'FALSE';
		}
		//alert("optionsSubselectLength is " + optionsSubSelect.length);
		//alert("subSelectField.options.length is " + subSelectField.options.length);
		
		
		for(var j = 0 ; j < myObj[selectField.value].length; j++) {
			console.log(myObj[selectField.value][j]);
			optionsSubSelect.push(myObj[selectField.value][j]);
		} 
		//alert("this is optionsSubSelect " + optionsSubSelect);
	
		//subSelectField.addEventListener("change", function(){
		//subSelectField.onchange = function() {
			//alert("subSelectField fired");
		
		// Want this to run all the time, we just want to removeChild if
		// a set of menu options is already in there.
		 
		for ( var k = 0 ; k < optionsSubSelect.length ; k++ ) {

			//create an option tag
			var element2 = document.createElement("option");

			//add the strings from your array into each option tag
			var words2 = document.createTextNode(optionsSubSelect[k]);
			//console.log("this is words2 " + optionsSubSelect[k]);

			//set the value of each option to the strings from your array
			element2.value = optionsSubSelect[k];
			//console.log("this is element2.value " + element2.value);

			//append each Text Node to each option tag.
			element2.appendChild(words2);

			// set value="" on the <option>
			element2.setAttribute("value", words2);

			//append each option tag to to the select field
			subSelectField.appendChild(element2);
			
			//set flag
			subSelectSet = 'TRUE';
		}
	});
	
	/*
	subSelectField.addEventListener("change", function(){
		alert("subSelectField triggered.");
	}); */

}  
/************ END PROBLEM 3 ************************/

/************ START PROBLEM 4 ************************/
function problem4() {
	'use strict';
	document.getElementById("secondInstrumentDetail").style.visibility = "hidden";
	// Solution adapted from this SO post: 
	// http://stackoverflow.com/questions/8922002/attach-event-listener-through-javascript-to-radio-button
		var x = document.getElementsByName("secondInstRadio");
		for(var i = 0 ; i < x.length ; i ++) {
			x[i].onclick = function() {
				if ( this.value == "No" ) {
					document.getElementById("secondInstrumentDetail").style.visibility = "hidden";
				}
				else {
					document.getElementById("secondInstrumentDetail").style.visibility = "visible";
				}
			}
		}
}
/************ END PROBLEM 4 ************************/