/* hw3b.js */

/* 
 * P3B - Kate de Bethune - April 20, 2015
 *
 * I have implemented solutions to problems 1 through 4. 
 * 
 * My solution to problem 3 borrows from Rob Frenette's & Larry's examples.
 * Other attributions are given inline.
 *
 */

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
	
	// Page starts by hiding the pwdMatch message "Passwords Match!"
	document.getElementById("pwdMatch").style.display = "none";

	// password1 validation
	password1.addEventListener("focus", function() {
		var min_char = 8;
		
		// Use keyup event listener to count chars in the password field.
		// Remove warning message once 8 chars have been typed.
		this.addEventListener("keyup", function () {
			if ( this.value.length < min_char ) {
				document.getElementById("pwd1Hint").style.display = "inline";
			}
			else {
				document.getElementById("pwd1Hint").style.display = "none";
			}
		});
		
		// assign this.value to p1_value for use in password2 comparison.
		this.addEventListener("blur", function() {
			console.log(this.value);
			p1_value = this.value;
		});
	});

	// password2 validation
	password2.addEventListener("focus", function() {
		// If a value is associated with password2 and the text box
		// receives focus again, set its value to null.
		if ( this.value ) {
			this.value = null;
			document.getElementById("pwdMatch").style.display = "none";
		}
	
		// Assumes the this.value for password2 == null and p1_value has been
		// instantiated.
		if ( p1_value ) {
			document.getElementById("pwd2Hint").style.display = "inline";
		}
	
		// password2 keyup function watches for a match on p1_value:
		// Displays "no match" message until / unless the two strings match.
		this.addEventListener("keyup", function () {
			if ( this.value != p1_value ) {
				document.getElementById("pwd2Hint").style.display = "inline";
			}
			else {
				document.getElementById("pwd2Hint").style.display = "none";
			}
		});
	
		// On password2 blur, a "passwords match" message is displayed if the two 
		// strings match. Otherwise, the password2.value is reset to null and the focus
		// is set to the password2 text box.
		this.addEventListener("blur", function() {
			if ( this.value != p1_value ) {
				document.getElementById("pwd2Hint").style.display = "inline";
				password2.value = null;
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
		// the idea for this block came from: 
		// http://stackoverflow.com/questions/10414420/how-to-prevent-user-to-enter-text-in-textarea-after-reaching-max-character-limit
		// the input box prevents overflow characters.
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
	
	// Flag variable for use in finite state machine logic
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
		var myVal = selectField.value;
	
		// a little bit of finite state machine logic here to clear the subSelect fields
		// when a new main selection is chosen.		
		if ( subSelectSet == 'TRUE' ) {
			// http://www.2ality.com/2012/12/clear-array.html
			optionsSubSelect = [];
			// http://www.somacon.com/p542.php
			subSelectField.options.length = 0;
			// subselect has been cleared, set flag to false.
			subSelectSet == 'FALSE';
		}
		
		// Populate optionsSubSelect array for current main select.
		for(var j = 0 ; j < myObj[selectField.value].length; j++) {
			optionsSubSelect.push(myObj[selectField.value][j]);
		} 
		 
		// Create DOM elements from optionsSubSelect array
		for ( var k = 0 ; k < optionsSubSelect.length ; k++ ) {

			//create an option tag
			var element2 = document.createElement("option");

			//add the strings from your array into each option tag
			var words2 = document.createTextNode(optionsSubSelect[k]);

			//set the value of each option to the strings from your array
			element2.value = optionsSubSelect[k];

			//append each Text Node to each option tag.
			element2.appendChild(words2);

			//append each option tag to to the select field
			subSelectField.appendChild(element2);
			
			//set finite state machine flag to indicate subselect is populated.
			subSelectSet = 'TRUE';
		}
	});
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


