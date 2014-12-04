/*
    Signup Form Script
    This script will load the state select list and validate the form before submission
*/
"use strict"; //detects errors

document.addEventListener('DOMContentLoaded', function(){
    var form = document.getElementById('signup'); //loads state list into var
    var usStatesSelect = form.elements['state']; //loads state name into state var.
    var option; //creates variables
    var state;
    for (var i = 0; i < usStates.length; i++) { //goes through every 'number' in the states array
        option = document.createElement('option');
        state = usStates[i]; //sets states to a variable number in an array
        option.value = state.code;
        option.innerHTML = state.name;
        usStatesSelect.appendChild(option); // appends value of option to var
    }
    var occupation = form.elements['occupation'];
    occupation.addEventListener('change', showOther); //listens for and shows the changed 'option' value
    var cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', alert); //alerts user when click event ocurs
    form.addEventListener('submit', onSubmit); //submits the signup form
});

function showOther() { //shows or hides occ. field
    var form = document.getElementById('signup');
    if (this.value == 'other') {
        form.elements['occupationOther'].style.display = 'block'; //blocks occupation from showing
    }
    else {
        form.elements['occupationOther'].style.display = 'none'; //reveals occupation field
    }
}

function alert() { //redirect function for cancel button to google
    if (window.confirm('Are you sure you want to leave?')) {
        window.location = 'http://www.google.com';
    }
}

function onSubmit(evt) { //uses data from the form and calls validateform function
    var valid = validateForm(this);
    var dobField = this.elements['birthdate'];
    var dob = dobField.value;
    var age = calculateAge(dob);
    var dateValid = validateDate(age);
    var errorMsg = document.getElementById('birthdateMessage');
    if (!dateValid) {
        errorMsg.innerHTML = 'You must be at least 13 years old to sign up.'; //checks if user is greater than 13 by calculated age
        errorMsg.style.display = 'block';
        dobField.className = 'form-control invalid-field';
   } else if (valid) {
        errorMsg.style.display = 'none';
        dobField.className = 'form-control';
   } else {
        errorMsg.style.display = 'none';
   }
   valid &= dateValid;
    if (!valid && evt.preventDefault) {
        evt.preventDefault();
    }
    evt.returnValue = valid;
    return valid;
} 

function calculateAge(dob) { //calculates the age of user using birth date
    dob = new Date(dob);
    var today = new Date();
    var yearsDiff = today.getFullYear() - dob.getUTCFullYear(); //uses current date to calc. age
    var monthsDiff = today.getMonth() - dob.getUTCMonth();
    var daysDiff = today.getDate() - dob.getUTCDate();
    if (monthsDiff < 0 || (0 == monthsDiff && daysDiff < 0)) {
        yearsDiff--;
    }
    return yearsDiff; 
}

// validates required fields
function validateForm(form) {
    var requiredFields = ['firstName', 'lastName', 'address1', 'city', 'state', 'zip', 'birthdate'];
    var valid = true;
    for (var i = 0; i < requiredFields.length; i++) {
        valid &= validateRequiredField(form.elements[requiredFields[i]]);
    }
    if (form.elements['occupation'].value == 'other') {
        valid &= validateRequiredField(form.elements['occupationOther']);
    }
    return valid;
} 

// validates if other is selected
function validateOther(other) {
    var valid = true;
    valid = validateRequiredField(other);
    return valid;
}

function validateRequiredField(field) {
    var value = field.value;
    value = value.trim();
    var zipRegExp = new RegExp('^\\d{5}$');
    var valid = value.length > 0;
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

function validateDate(age) { //checks if user is greater than 13 by calculated age
    var valid = true; 
    if (age < 13) {
        valid = false;
    }
    return valid;
}