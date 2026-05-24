// ==========================
// LIVE CLOCK
// ==========================

function updateClock() {

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

setInterval(updateClock, 1000);

updateClock();



// ==========================
// POPUP SYSTEM
// ==========================

const popup =
document.getElementById("popup");

const popupText =
document.getElementById("popupText");


// SHOW POPUP

function showPopup(message, type) {

    popupText.innerText = message;

    popup.classList.remove("success");
    popup.classList.remove("error");
    popup.classList.remove("warning");

    popup.classList.add(type);

    popup.classList.add("show");

    setTimeout(() => {

        popup.classList.remove("show");

        popup.classList.remove("success");
        popup.classList.remove("error");
        popup.classList.remove("warning");

    }, 3000);

}



// ==========================
// ELEMENTS
// ==========================

const notificationsContainer =
document.getElementById(
    "notificationsContainer"
);

const warningsContainer =
document.getElementById(
    "warningsContainer"
);

const bell =
document.getElementById("bell");

const alertSound =
document.getElementById("alertSound");

const stopBtn =
document.getElementById("stopBtn");



// ==========================
// GET NOTIFICATIONS
// ==========================

let notifications =
JSON.parse(
    localStorage.getItem("notifications")
) || [];



// ==========================
// LOAD NOTIFICATIONS
// ==========================

function loadNotifications() {

    notificationsContainer.innerHTML = "";

    notifications.forEach(notification => {

        notificationsContainer.innerHTML += `

        <div class="notify-box">

            ⚠️ ${notification.title}
            - ${notification.location}

        </div>

        `;

    });

}



// ==========================
// LOAD WARNINGS
// ==========================



// ==========================
// LOAD WARNINGS
// ==========================

function loadWarnings() {

    warningsContainer.innerHTML = "";

    // GET WARNINGS

    const warnings =
    JSON.parse(
        localStorage.getItem("warnings")
    ) || [];

    warnings.forEach(warning => {

        warningsContainer.innerHTML += `

        <div class="warning-box">

            <p>
                ⚠️ ${warning.title}
            </p>

            <small>
                ${warning.location}
                - ${warning.time}
            </small>

        </div>

        `;

    });

}



// ==========================
// START ALERT
// ==========================

function startAlert() {

    // START BELL
    bell.classList.add("ringing");

    // PLAY SOUND
    alertSound.currentTime = 0;

    alertSound.play().catch(() => {

        console.log(
            "Browser blocked autoplay"
        );

    });

}



// ==========================
// STOP ALERT
// ==========================

stopBtn.addEventListener("click", function () {

    // STOP SOUND
    alertSound.pause();

    // RESET AUDIO
    alertSound.currentTime = 0;

    // STOP BELL
    bell.classList.remove("ringing");

    // SHOW POPUP
    showPopup(
        "Alert Ring Stopped!",
        "success"
    );

});



// ==========================
// INITIAL LOAD
// ==========================

loadNotifications();

loadWarnings();
// ==========================
// DASHBOARD COUNTERS
// ==========================

const totalAlerts =
document.getElementById("totalAlerts");

const totalWarnings =
document.getElementById("totalWarnings");

const alertStatus =
document.getElementById("alertStatus");

const todayAlerts =
document.getElementById("todayAlerts");


// UPDATE COUNTERS

function updateCounters(){

    // TOTAL ALERTS
    totalAlerts.innerText =
    notifications.length;

    // GET WARNINGS

const warnings =
JSON.parse(
    localStorage.getItem("warnings")
) || [];

// TOTAL WARNINGS

totalWarnings.innerText =
warnings.length;

  

    // TODAY ALERTS
    todayAlerts.innerText =
    notifications.length;

    // ALERT STATUS

    if(notifications.length > 0){

        alertStatus.innerText =
        "Active";

    }
    else{

        alertStatus.innerText =
        "Inactive";

    }

}


// INITIAL UPDATE

updateCounters();



// ==========================
// START ALERT IF DATA EXISTS
// ==========================





// ==========================
// WATCH FOR NEW VIOLATIONS
// ==========================

let lastNotificationCount =
notifications.length;


// CHECK EVERY SECOND

setInterval(() => {

    // GET UPDATED DATA

    const updatedNotifications =
    JSON.parse(
        localStorage.getItem("notifications")
    ) || [];

    // NEW NOTIFICATION DETECTED

    if (
        updatedNotifications.length >
        lastNotificationCount
    ) {

        // UPDATE DATA

        notifications =
        updatedNotifications;

        lastNotificationCount =
        updatedNotifications.length;

        // RELOAD UI

        loadNotifications();

        loadWarnings();

        updateCounters();

        // START ALERT

        startAlert();

        // POPUP

        showPopup(
            "New Violation Detected!",
            "warning"
        );

    }

}, 1000);



// ==========================
// TEST SOUND
// ==========================

function testSound() {

    startAlert();

}