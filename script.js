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
       bodyData(RollNo,firstName,secondName,email);

});

function bodyData(RollNo,firstName,secondName,email){
    //create tr
      const bodyRow = document.createElement("tr");
      const body = document.querySelector("tbody");
      
      //rollno ko lagi
      const Roll_cell = document.createElement("td");
      Roll_cell.textContent = RollNo;
      bodyRow.appendChild(Roll_cell)//append td to tr;
      
      //first name ko lagi
      const first_cell = document.createElement("td");
      first_cell.textContent = firstName;
      bodyRow.appendChild(first_cell);
      //last name ko lagi
      const last_cell = document.createElement("td");
      last_cell.textContent = secondName;
      bodyRow.appendChild(last_cell);
      //email ko lai
      const email_cell = document.createElement("td");
      email_cell.textContent = email;
      bodyRow.appendChild(email_cell);
      
      body.appendChild(bodyRow);//body ma halako
      document.querySelector("form").reset();

}