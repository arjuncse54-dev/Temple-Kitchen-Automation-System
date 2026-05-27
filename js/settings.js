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
// ELEMENTS
// ==========================

const cameraUrl =
document.getElementById("cameraUrl");

const notificationToggle =
document.getElementById(
    "notificationToggle"
);

const soundToggle =
document.getElementById(
    "soundToggle"
);

const saveBtn =
document.querySelector(".save-btn");


// ==========================
// POPUP SYSTEM
// ==========================

const popup =
document.getElementById("popup");

const popupText =
document.getElementById("popupText");


// SHOW POPUP

function showPopup(message){

    popupText.innerText = message;

    popup.classList.add("show");

    setTimeout(() => {

        popup.classList.remove("show");

    },3000);

}

// ==========================
// SAVE SETTINGS
// ==========================

saveBtn.addEventListener("click", function(){

    // CREATE SETTINGS OBJECT

    const settings = {

        cameraUrl:
        cameraUrl.value,

        notifications:
        notificationToggle.checked,

        sound:
        soundToggle.checked

    };



    // SAVE SETTINGS

    localStorage.setItem(
        "settings",
        JSON.stringify(settings)
    );



    // POPUP

    showPopup(
        "Settings Saved Successfully!"
    );

});

// ==========================
// LOAD SETTINGS
// ==========================

window.onload = function(){

    // GET SETTINGS

    const savedSettings =
    JSON.parse(
        localStorage.getItem("settings")
    );



    // IF SETTINGS EXIST

    if(savedSettings){

        cameraUrl.value =
        savedSettings.cameraUrl;

        notificationToggle.checked =
        savedSettings.notifications;

        soundToggle.checked =
        savedSettings.sound;

    }

}