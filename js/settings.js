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
// INPUTS
// ==========================

const cameraUrl =
document.getElementById("cameraUrl");

const notificationToggle =
document.getElementById("notificationToggle");

const soundToggle =
document.getElementById("soundToggle");

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
// SHOW POPUP
// ==========================

function showPopup(message, type){

    popupText.innerText = message;

    popup.classList.remove("success");

    popup.classList.add(type);

    popup.classList.add("show");

    setTimeout(() => {

        popup.classList.remove("show");

        popup.classList.remove("success");

    },3000);

}



// ==========================
// LOAD SAVED SETTINGS
// ==========================

window.onload = function(){

    const savedCamera =
    localStorage.getItem("cameraUrl");

    const savedNotification =
    localStorage.getItem("notificationToggle");

    const savedSound =
    localStorage.getItem("soundToggle");

    // CAMERA URL
    if(savedCamera){

        cameraUrl.value = savedCamera;

    }

    // NOTIFICATION
    if(savedNotification === "true"){

        notificationToggle.checked = true;

    }
    else{

        notificationToggle.checked = false;

    }

    // SOUND
    if(savedSound === "true"){

        soundToggle.checked = true;

    }
    else{

        soundToggle.checked = false;

    }

};



// ==========================
// SAVE SETTINGS
// ==========================

saveBtn.addEventListener("click", function(){

    localStorage.setItem(
        "cameraUrl",
        cameraUrl.value
    );

    localStorage.setItem(
        "notificationToggle",
        notificationToggle.checked
    );

    localStorage.setItem(
        "soundToggle",
        soundToggle.checked
    );

    // SHOW POPUP

    showPopup(
        "Settings Saved Successfully!",
        "success"
    );

});