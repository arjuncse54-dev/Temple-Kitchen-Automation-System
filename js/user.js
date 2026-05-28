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
// GET SETTINGS
// ==========================

function getSettings(){

    return JSON.parse(
        localStorage.getItem("settings")
    ) || {

        notifications:true,
        sound:true

    };

}





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


// ==========================
// ENABLE AUDIO AFTER CLICK
// ==========================

const alertSound =
document.getElementById("alertSound");

document.addEventListener(
"click",
function(){

    alertSound.play()
    .then(() => {

        alertSound.pause();

        alertSound.currentTime = 0;

    })
    .catch(error => {

        console.log(error);

    });

},
{ once:true }
);



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
    if(notifications.length === 0){

    notificationsContainer.innerHTML = `

    <div class="notify-box">

        No Notifications Found

    </div>

    `;

    return;

}

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

function loadWarnings() {

    // CLEAR OLD UI

    warningsContainer.innerHTML = "";



    // GET WARNINGS

    const warnings =
    JSON.parse(
        localStorage.getItem("warnings")
    ) || [];



    // EMPTY STATE

    if(warnings.length === 0){

        warningsContainer.innerHTML = `

        <div class="warning-box">

            No Warnings Found

        </div>

        `;

        return;

    }



    // LOAD WARNINGS

    warnings.forEach((warning,index) => {

        warningsContainer.innerHTML += `

        <div class="warning-box">

            <p>
                ⚠️ ${warning.title}
            </p>

            <small>
                ${warning.location}
                - ${warning.time}
            </small>
            <button
class="warning-clear-btn"
onclick="clearWarning(${index})">

    Clear

</button>

        </div>

        `;

    });

}



// ==========================
// START ALERT
// ==========================
function startAlert(){

    const settings =
    getSettings();



    // START BELL

    if(settings.notifications){

        bell.classList.add("ringing");

    }



    // PLAY SOUND

    if(settings.sound){

        alertSound.currentTime = 0;

       alertSound.play()
.catch(error => {

    console.log(error);

});

    }

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
// CLEAR WARNING
// ==========================

function clearWarning(index){

    // GET WARNINGS

    let warnings =
    JSON.parse(
        localStorage.getItem("warnings")
    ) || [];



    // REMOVE WARNING

    warnings.splice(index,1);



    // SAVE AGAIN

    localStorage.setItem(
        "warnings",
        JSON.stringify(warnings)
    );



    // RELOAD WARNINGS

    loadWarnings();



    // UPDATE COUNTERS

    updateCounters();



    // POPUP

    showPopup(
        "Warning Cleared!",
        "success"
    );

}
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


// ==========================
// INITIAL UPDATE
// ==========================

loadNotifications();

loadWarnings();

updateCounters();

updateAnalytics();




// ==========================
// REAL-TIME STORAGE WATCHER
// ==========================

window.addEventListener(
"storage",
function(event){

    // ONLY FOR NOTIFICATIONS

    if(event.key === "notifications"){

        // RELOAD NOTIFICATIONS

        notifications =
        JSON.parse(
            localStorage.getItem(
                "notifications"
            )
        ) || [];



        // RELOAD UI

        loadNotifications();

        loadWarnings();

        updateCounters();

        updateAnalytics();



        // START ALERT

        startAlert();



        // POPUP

        showPopup(
            "New Violation Detected!",
            "warning"
        );

    }

});



// ==========================
// TEST SOUND
// ==========================

function testSound(){

    const audio =
    document.getElementById("alertSound");

    audio.volume = 1;

    audio.currentTime = 0;

    audio.play()
    .then(() => {

        console.log("Sound Playing");

    })
    .catch(error => {

        console.log(error);

    });

}

// ==========================
// VIOLATION ANALYTICS
// ==========================

function updateAnalytics(){

    // GET NOTIFICATIONS

    const notifications =
    JSON.parse(
        localStorage.getItem(
            "notifications"
        )
    ) || [];



    // COUNTERS

    let hairnet = 0;

    let gloves = 0;

    let apron = 0;



    // LOOP THROUGH DATA

    notifications.forEach(notification => {

        // HAIRNET

        if(
            notification.title.includes(
                "Hairnet"
            )
        ){

            hairnet++;

        }



        // GLOVES

        else if(
            notification.title.includes(
                "Gloves"
            )
        ){

            gloves++;

        }



        // APRON

        else if(
            notification.title.includes(
                "Apron"
            )
        ){

            apron++;

        }

    });



    // UPDATE UI

   const hairnetCount =
document.getElementById(
    "hairnetCount"
);

if(hairnetCount){

    hairnetCount.innerText =
    hairnet;

}





const glovesCount =
document.getElementById(
    "glovesCount"
);

if(glovesCount){

    glovesCount.innerText =
    gloves;

}



const apronCount =
document.getElementById(
    "apronCount"
);

if(apronCount){

    apronCount.innerText =
    apron;

}




}