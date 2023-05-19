//getting the div from the element to append the datepicker to.
var app = document.getElementById("app");

//creating the input element and storing it in a variable named dateTextInput.
var inputElement = document.createElement('input')

//setting the type of the input to a date picker and assigning it to inputTypeToDate. 
var inputTypeToDate = inputElement.setAttribute('type', 'date');

//checking app for existing elements or properties, and appending the input element to it. 
app?.appendChild(inputElement);