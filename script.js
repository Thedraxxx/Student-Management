//theme toggle

const themeIcon = document.getElementById("theme_icon");
const themeToggleIcon = document.getElementById("themeToggleIcon");

themeIcon.addEventListener("click", () => {
// Toggle the dark class on the root element
document.documentElement.classList.toggle("dark");

// Switch the icon between moon and sun
if (document.documentElement.classList.contains("dark")) {
themeToggleIcon.classList.replace("fa-moon", "fa-sun");
} else {
themeToggleIcon.classList.replace("fa-sun", "fa-moon");
}
});
//To add the options function 
document.getElementById("sortOptions").addEventListener("change",function(event){
const selectedOption = event.target.value;
let students = JSON.parse(localStorage.getItem("students"))||[];
if(selectedOption === "ascending"){
    students.sort((a,b) => a.RollNo - b.RollNo);
}
else if(selectedOption === "descending"){
    students.sort((a,b)=> b.RollNo - a.RollNo);
}
else if(selectedOption === "alphabetic"){
    students.sort((a,b) => a.firstName.localeCompare(b.firstName))
}
const body = document.querySelector("tbody");
body.innerHTML = ""; // Clear existing rows
students.forEach(student => {
bodyData(student.RollNo, student.firstName, student.secondName, student.email);
});
})
document.getElementById("button").addEventListener("click",function(event){
event.preventDefault();
//get the element formt teh input feld of the above table and put them in the varainle
const firstName = document.getElementById("FirstName").value;
const secondName = document.getElementById("SecondName").value;
const email = document.getElementById("E-mail").value;
const RollNo = document.getElementById("Roll-No").value;


if(!firstName || !secondName || !email ||!RollNo){
alert("plese enter all value");
return;
}
 // Check if the Roll No already exists in localStorage
 let newstudents = JSON.parse(localStorage.getItem("students")) || [];
const existingStudent = newstudents.find(student => student.RollNo === RollNo);
if (existingStudent) {
    alert("Roll No already exists! Please enter a unique Roll No.");
    document.getElementById("FirstName").value = '';
document.getElementById("SecondName").value = '';
document.getElementById("E-mail").value = '';
document.getElementById("Roll-No").value = '';
document.getElementById("FirstName").focus();

    return;  // Stop the function execution if Roll No exists
}
bodyData(RollNo,firstName,secondName,email);
//to store in teh local storeat
//crete a array to store teh values
const students_info = {RollNo,firstName,secondName,email};
//Get existing valur or not
let students = JSON.parse(localStorage.getItem("students"))||[];
//push the new datas
students.push(students_info);
//updatet teh localstoreage
localStorage.setItem("students",JSON.stringify(students));
document.querySelector("form").reset();
});
function bodyData(RollNo,firstName,secondName,email){
//create tr
const bodyRow = document.createElement("tr");
const body = document.querySelector("tbody");

//rollno ko lagi
const Roll_cell = document.createElement("td");
Roll_cell.textContent = RollNo;
bodyRow.appendChild(Roll_cell)//append td to tr;
Roll_cell.className = "border border-gray-900";

//first name ko lagi
const first_cell = document.createElement("td");
first_cell.textContent = firstName;
bodyRow.appendChild(first_cell);
first_cell.className = 'border border-gray-900'
//last name ko lagi
const last_cell = document.createElement("td");
last_cell.textContent = secondName;
last_cell.className = "border border-gray-900";
bodyRow.appendChild(last_cell);
//email ko lai
const email_cell = document.createElement("td");
email_cell.textContent = email;
bodyRow.appendChild(email_cell);
email_cell.className = "border border-gray-900";

const edit_cell = document.createElement("td");
edit_cell.className = "text-center border border-gray-900"
bodyRow.appendChild(edit_cell);
const edit_icon = document.createElement("i")
edit_icon.className = "fa-solid fa-pen-to-square";
edit_cell.appendChild(edit_icon)
//delete button
const delete_cell = document.createElement("td");
delete_cell.className = "text-center border border-gray-900"
bodyRow.appendChild(delete_cell);
const delete_icon = document.createElement("i")
delete_icon.className = "fa-solid fa-trash";
delete_cell.appendChild(delete_icon);
// edit ko lgi event lister for the firstname cell and secondname cell ... and after hitting the second cell it save the data to the local storeage
edit_cell.addEventListener("click",function(){
if(first_cell.isContentEditable === true){
return;
}
first_cell.contentEditable = "true";
first_cell.focus();
})
first_cell.addEventListener("keydown",function(event){
if(event.key === "Enter"){
event.preventDefault();
first_cell.contentEditable ="false";
const updatedFirstName = first_cell.innerText;
last_cell.contentEditable = "true";
last_cell.focus();
}
});
last_cell.addEventListener("keydown",function(event){
if(event.key === "Enter"){
event.preventDefault();
last_cell.contentEditable = "false";
const updatedLastname = last_cell.innerText;
const updatedFirstName = first_cell.innerText;
const row_RollNo = Roll_cell.innerText;
let students = JSON.parse(localStorage.getItem("students"))||[];
const updatedStudents = students.map(student => {
    if(student.RollNo === row_RollNo){
        student.firstName = updatedFirstName;
        student.secondName = updatedLastname;
    }
    return student;
}

);
localStorage.setItem("students",JSON.stringify(updatedStudents));
last_cell.blur();
}
})
//if same roll no xa vana dont
//+++++++++++()___________________________________________--------------------------------------
delete_cell.addEventListener("click", function () {
// Remove the row from the table
bodyRow.remove();
// Get the RollNo of the row being deleted
const rollNoToDelete = Roll_cell.textContent;
// Retrieve the current data from localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];
// Filter out the student with the matching RollNo
students = students.filter(student => student.RollNo !== rollNoToDelete);
// Update localStorage with the filtered data
localStorage.setItem("students", JSON.stringify(students));
});

body.appendChild(bodyRow);//body ma halako
document.querySelector("form").reset();
}
function loadSavedData(){
const students = JSON.parse(localStorage.getItem("students"))||[];
const body = document.querySelector("tbody");

students.forEach(student => {
bodyData(student.RollNo,student.firstName,student.secondName,student.email);

});
}
window.onload = loadSavedData();
document.getElementById("FirstName").addEventListener("keydown", function (event) {
if (event.key === "Enter") {
    event.preventDefault(); // Prevent default form submit on Enter
    document.getElementById("SecondName").focus();  
}
});
document.getElementById("SecondName").addEventListener("keydown", function (event) {
if (event.key === "Enter") {
    event.preventDefault(); // Prevent default form submit on Enter
    document.getElementById("E-mail").focus(); 
}
});
document.getElementById("E-mail").addEventListener("keydown", function (event) {
if (event.key === "Enter") {
    event.preventDefault(); // Prevent default form submit on Enter
    document.getElementById("Roll-No").focus();  
}
});
document.getElementById("Roll-No").addEventListener("keydown", function (event) {
if (event.key === "Enter") {
    event.preventDefault(); // Prevent default form submit on Enter
    document.getElementById("button").click(); // Trigger form submission via button 
}
});