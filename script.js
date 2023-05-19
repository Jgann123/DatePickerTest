
//getting the div from the element to append the datepicker element to.
var app = document.getElementById("app");
//creating the input element and storing in a variable named dateTextInput.
var inputElement = document.createElement('input');
//setting the type of the input to a date picker. 
var inputTypeToDate = inputElement.setAttribute('type', 'date');

app === null || app === void 0 ? void 0 : app.appendChild(inputElement);
