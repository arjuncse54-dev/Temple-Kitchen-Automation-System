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

    const savedName =
    localStorage.getItem("name");

    const savedEmail =
    localStorage.getItem("email");

    const savedPhone =
    localStorage.getItem("phone");

    const savedPassword =
    localStorage.getItem("password");

    if(savedName){
        nameInput.value = savedName;
    }

    if(savedEmail){
        emailInput.value = savedEmail;
    }

    if(savedPhone){
        phoneInput.value = savedPhone;
    }

    if(savedPassword){
        passwordInput.value = savedPassword;
    }

};



// ==========================
// SAVE PROFILE
// ==========================

saveBtn.addEventListener("click", function(){

    // SAVE DATA

    localStorage.setItem(
        "name",
        nameInput.value
    );

    localStorage.setItem(
        "email",
        emailInput.value
    );

    localStorage.setItem(
        "phone",
        phoneInput.value
    );

    localStorage.setItem(
        "password",
        passwordInput.value
    );

    // SHOW POPUP

    showPopup(
        "Profile Saved Successfully!",
        "success"
    );

});