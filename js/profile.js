  const userId =
localStorage.getItem("user_id");

if(!userId){

    window.location.href =
    "../login.html";

}
// ==========================
// LIVE CLOCK
// ==========================

function updateClock(){

    const now = new Date();

    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    document.getElementById("clock").innerHTML =
    `${h}:${m}:${s}`;

}

setInterval(updateClock,1000);

updateClock();



// ==========================
// PROFILE INPUTS
// ==========================

const nameInput =
document.getElementById("name");

const emailInput =
document.getElementById("email");

const phoneInput =
document.getElementById("phone");

const passwordInput =
document.getElementById("password");


// SAVE BUTTON

const saveBtn =
document.querySelector(".save-btn");



// ==========================
// POPUP ELEMENTS
// ==========================

const popup =
document.getElementById("popup");

const popupText =
document.getElementById("popupText");



// ==========================
// SHOW POPUP FUNCTION
// ==========================

function showPopup(message, type){

    // CHANGE TEXT
    popupText.innerText = message;

    // REMOVE OLD CLASSES
    popup.classList.remove("success");
    popup.classList.remove("error");
    popup.classList.remove("warning");

    // ADD NEW CLASS
    popup.classList.add(type);

    // SHOW POPUP
    popup.classList.add("show");

    // AUTO HIDE
    setTimeout(() => {

        popup.classList.remove("show");

        popup.classList.remove("success");
        popup.classList.remove("error");
        popup.classList.remove("warning");

    },3000);

}



// ==========================
// LOAD SAVED DATA
// ==========================

window.onload = function(){

    const userId =
    localStorage.getItem("user_id");

    fetch(
        `http://127.0.0.1:5000/profile/${userId}`
    )

    .then(response => response.json())

  


    .then(user => {

    nameInput.value =
    user.name;

    emailInput.value =
    user.email;

    phoneInput.value =
    user.phone;

    passwordInput.value =
    user.password;

})

};



// ==========================
// SAVE PROFILE
// ==========================

saveBtn.addEventListener("click", function(){

    const userId =
    localStorage.getItem("user_id");

    fetch(

        "http://127.0.0.1:5000/update-profile",

        {

            method: "POST",

            headers: {

                "Content-Type":
                "application/json"

            },
body: JSON.stringify({

    user_id: userId,

    name: nameInput.value,

    email: emailInput.value,

    phone: phoneInput.value,

    password: passwordInput.value

})

        }

    )

    .then(response => response.json())

    .then(data => {

        showPopup(

            "Profile Updated Successfully!",

            "success"

        );

    });

});