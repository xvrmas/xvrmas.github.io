
    const d = document;    
     d.addEventListener(`keyup`, (e) => {
          validate();
     })

// Exercise 6
function validate() {

     event.preventDefault();

     // Get the input fields
    // Validate fields entered by the user: name, phone, password, and email
     var name = document.querySelector("#fName").value;
     var lastName = document.querySelector("#fLastN").value;
     var password = document.querySelector("#fPassword").value;
     var phone = document.querySelector("#fPhone").value;
     var adress = document.querySelector("#fAddress").value;
     var email = document.querySelector("#fEmail").value;

     // Get the error elements
     var errorPassword = document.getElementById("errorPassword");
     var errorName = document.getElementById("errorName");
     var errorPhone = document.getElementById("errorPhone");
   

     let onlyLetter = "^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$";

     if(name === "" || name.length < 3 || (name.match(onlyLetter) == null) ){
            fName.classList.add("is-invalid");
     }
     else{ 
          fName.classList.remove("is-invalid");
          fName.classList.add("is-valid");
     }

     if(lastName === "" || lastName.length < 3 || (lastName.match(onlyLetter) == null )){
          fLastN.classList.add("is-invalid");
     }else{ 
          fLastN.classList.remove("is-invalid");
          fLastN.classList.add("is-valid");
      }
      
      if(password.length > 3 && password.match(/[A-Za-z]/) && password.match(/[0-9]/) ){
          fPassword.classList.remove("is-invalid");
          fPassword.classList.add("is-valid");
     }
      else{ 
          fPassword.classList.add("is-invalid");
     }
     let validEmail = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
     if(email === "" || email.match(validEmail) == null){
          fEmail.classList.add("is-invalid");
     }else{ 
          fEmail.classList.remove("is-invalid");
          fEmail.classList.add("is-valid");

     }
     if(phone === "" || phone.length < 9 || phone.length > 9){
          fPhone.classList.add("is-invalid");
     }
     else{ 
         fPhone.classList.remove("is-invalid");
         fPhone.classList.add("is-valid");
     }
     if(adress === "" || adress.length < 3){
          fAddress.classList.add("is-invalid");
   }
   else{ 
        fAddress.classList.remove("is-invalid");
        fAddress.classList.add("is-valid");
   }

}





//  {
//    (function () {
//     'use strict'
//      var forms = document.querySelectorAll('.needs-validation')
//      Array.prototype.slice.call(forms)
//        .forEach(function (form) {
//         form.addEventListener('submit', function (event) {
//           if (!form.checkValidity()) {
//              event.preventDefault()
//            event.stopPropagation()
//            }
          
//            form.classList.add('was-validated')
//         }, false)
//      })
//    })()
//  }