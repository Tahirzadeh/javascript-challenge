/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/

"use-strict"; //detect errors

document.addEventListener('DOMContentLoaded', function() {
	var signup = document.getElementById('signup'); //loads state list into var
	var usStatesSelect = signup.elements['state']; //loads state name into state var
	var state; //creates variables
	var option; 
	for (var i = 0; i < usStates.length; i++) { //goes through every 'number' in the states array
		option = document.createElement('option');
		state = usStates[i]; //sets states to a variable number in an array
		option.value = state.code;
		option.innerHTML = state.name;
		usStatesSelect.appendChild(option); // appends value of option to var
	}
	var occupation = signup.elements['occupation']; 
	occupation.addEventListener('change', showOther); //listens for and shows the changed 'option' value
	var cancelButton = document.getElementById('cancelButton');
	cancelButton.addEventListener('click', alert); //alerts user when click event ocurs
	signup.addEventListener('submit', onSubmit); //submits the signup form
});

function showOther() { //shows or hides occ. field
	var signup = document.getElementById('signup');
	var otherOccupation = signup.elements['occupationOther'];
	if (this.value == 'other') {
		otherOccupation.style.display = 'block'; //blocks occupation from showing
	} 
	else {
		otherOccupation.style.display = 'none'; //reveals occupation field
	}
}

function alert() { //redirect function for cancel button to google
	if(window.confirm('Are you sure you want to leave?')) {
		window.location = 'http://www.google.com';
	}
}

function onSubmit(evt) { //uses data from the form and calls validateform function
	var valid = true;
    try{ 
    	valid = validateForm(this);
    }
    catch(err){
    	valid = !valid
    }
    if (!valid) {
        var errorMsg = document.getElementById('error-message');
        errorMsg.innerHTML = 'Please provide values for the fields outlined in red!';
        errorMsg.style.display = 'block';
    }
    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }
    evt.returnValue = valid;
    return valid;
}

function validateForm(form) { //collects data from fields of the form that need to be checked
	var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
	var valid = true;
	var occ = form.elements['occupation'];
    if(occ.value == 'other'){
        requiredFields.push('occupationOther');
    }
    for(var i = 0; i < requiredFields.length; i++) {
        valid &= validateRequiredField(form.elements[requiredFields[i]]);
    }
    var zipCodeField = form.elements['zip'] //validate zip code field
    var zipRegExp = new RegExp('^\\d{5}$');
    if(!zipRegExp.test(zipField.value)) {
    	valid = false;
    	zipField.className = 'form-control invalid-form';
    }
    var birthday = form.elements['birthdate']; //validates birthdate
    var birthdayError = document.getElementById('birthdateMessage');
    var age = calculateAge(birthday.value);
    if(age < 13) { //checks if user is greater than 13 by calculated age
    	valid = false;
    	birthday.className = 'form-control invalid-form';
    	birthdayError.style.display = 'block';
    	birthdayError.innerHTML = "You must be at least 13 years old to sign up."
    }
    else {
    	birthdayError.style.display = 'none';
    }
    return valid;
}

function validateRequiredField(field) {
    var fieldValue = field.value;
    fieldValue = fieldValue.trim();
    var zipRegExp = new RegExp('^\\d{5}$');
    var valid = fieldValue.length > 0;
    if (field.name == 'zip') { //checks field if zip is 5 num.
    	valid &= zipRegExp.test(value);
    }
    if (field.name == 'birthdate') { //sees if birthdate is a num.
    	var test = value.replace(/\//g,''); //removes slashes
    	test = !isNaN(test);
    	valid &= test;
    	console.log(test);
    }
    if (valid) {
        field.className = 'form-control'; //checks field data is valid or not
    } else {
        field.className = 'form-control invalid-field';
    }
    return valid;
} 

function calculateAge(birthDate) { //calculates the age of user using birth date
	birthDate = new Date(birthDate);
	var today = new Date();
	var yearsDiff = today.getFullYear() - birthDate.getUTCFullYear(); //uses current date to calc. age
	var monthsDiff = today.getMonth() - dob.getUTCMonth();
	var daysDiff = today.getDate() - dob.getUTCDate();

	if (monthsDiff < 0 || (0 == monthsDiff && daysDiff < 0)) {
		yearsDiff--;
	}
	return yearsDiff;
}