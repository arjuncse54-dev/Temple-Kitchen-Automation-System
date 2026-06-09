const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    fetch("http://127.0.0.1:5000/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email: email,
            password: password
        })

    })

    .then(response => response.json())


    
.then(data => {

    console.log("LOGIN RESPONSE:", data);

    if(data.success){

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        localStorage.setItem(
            "user_id",
            data.user_id
        );

        localStorage.setItem(
            "email",
            data.email
        );

        if(data.email === "admin@temple.com"){

            window.location.href =
            "./admin/dashboard.html";

        }
        else{

            window.location.href =
            "./user/dashboard.html";

        }

    } else {

        alert(data.message);

    }

})

    })

    .catch(error => {

        console.error("Login Error:", error);

        alert("Unable to connect to server");

    });
