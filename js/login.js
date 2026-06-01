 

 const loginForm =
document.getElementById(
    "loginForm"
);


loginForm.addEventListener(

    "submit",

    function(event){

        alert("Form Submitted");

        event.preventDefault();

        const email =
        document.getElementById("email").value;

        const password =
        document.getElementById("password").value;

        alert("Email: " + email);

        fetch(
            "http://127.0.0.1:5000/login",



            {

                method: "POST",

                headers: {

                    "Content-Type":
                    "application/json"

                },

                body: JSON.stringify({

                    email: email,

                    password: password

                })

            }

        )

        .then(response =>
            response.json()
        )

        .then(data => {

            if(data.success){

              window.location.href =
"./admin/dashboard.html";

            }

            else{

                alert(
                    "Invalid Email or Password"
                );

            }

        });

    }

); 