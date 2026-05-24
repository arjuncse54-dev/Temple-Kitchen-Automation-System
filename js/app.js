// SELECT FORM ELEMENTS
const loginBtn = document.getElementById("loginBtn");

const emailInput = document.querySelector('input[type="email"]');
const passwordInput = document.querySelector('input[type="password"]');

// LOGIN BUTTON CLICK
loginBtn.addEventListener("click", function(event){

    // STOP PAGE REFRESH
    event.preventDefault();

    // GET VALUES
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // CHECK EMPTY FIELDS
    if(email === "" || password === ""){
        alert("Please fill all fields!");
    }
    else{
        alert("Login Successful!");
    }

});