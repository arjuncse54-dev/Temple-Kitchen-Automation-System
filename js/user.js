
    
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
// LOADING OVERLAY
// ==========================

const loadingOverlay =
document.getElementById(
    "loadingOverlay"
);





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
let notifications = [];

let previousNotificationCount = 0;
let previousWarningCount = 0;



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

const userId =
localStorage.getItem("user_id");

function loadUserNotifications(){

    fetch(
        `http://127.0.0.1:5000/user-notifications/${userId}`
    )

    .then(response => response.json())

    .then(data => {

        notifications = data;

        // NEW NOTIFICATION DETECTED
       if(
    previousNotificationCount > 0 &&
    notifications.length >
    previousNotificationCount
){

   bell.classList.add("ringing");

showPopup(
    "⚠️ Violation Detected!",
    "warning"
);

alertSound.currentTime = 0;

alertSound.play()
.catch(error => {

    console.log(error);

});

}

        previousNotificationCount =
        notifications.length;

        loadNotifications();

        updateCounters();

        loadRecentActivity();

    })

    .catch(error => {

        console.log(
            "Notification Error:",
            error
        );

    });

}
loadUserNotifications();

setInterval(() => {

    loadUserNotifications();

}, 5000);


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

    warningsContainer.innerHTML = "";

    const userId =
    localStorage.getItem("user_id");

    fetch(
        `http://127.0.0.1:5000/user-warnings/${userId}`
    )

    .then(response => response.json())

    .then(warnings => {
        if(
    previousWarningCount > 0 &&
    warnings.length >
    previousWarningCount
){

 bell.classList.add("ringing");

showPopup(
    "⚠️ New Warning Received!",
    "warning"
);

alertSound.currentTime = 0;

alertSound.play()
.catch(error => {

    console.log(error);

});bell.classList.add("ringing");

showPopup(
    "⚠️ New Warning Received!",
    "warning"
);

alertSound.currentTime = 0;

alertSound.play()
.catch(error => {

    console.log(error);

});
}

previousWarningCount =
warnings.length;

        if(warnings.length === 0){

            warningsContainer.innerHTML = `

            <div class="warning-box">

                No Warnings Found

            </div>

            `;

            return;

        }

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

    });

}

// ==========================
// START ALERT
// ==========================

function startAlert(){

    bell.classList.add("ringing");

    alertSound.pause();

    alertSound.currentTime = 0;

    alertSound.loop = true;

    alertSound.play()
    .then(() => {

        console.log(
            "Alert Started"
        );

    })
    .catch(error => {

        console.log(
            "Audio Error:",
            error
        );

    });

}

// ==========================
// STOP ALERT
// ==========================

stopBtn.addEventListener(
"click",
function(){

    alertSound.pause();

    alertSound.currentTime = 0;

    alertSound.loop = false;

    bell.classList.remove(
        "ringing"
    );

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
getWarnings();


    // REMOVE WARNING

    warnings.splice(index,1);



    // SAVE AGAIN

saveWarnings(warnings);



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

    const userId =
    localStorage.getItem("user_id");

    fetch(
        `http://127.0.0.1:5000/user-warnings/${userId}`
    )

    .then(response => response.json())

    .then(warnings => {

        totalWarnings.innerText =
        warnings.length;

        if(warnings.length > 0){

            alertStatus.innerText =
            "Active";

        }
        else{

            alertStatus.innerText =
            "Inactive";

        }

    });

}

// ==========================
// INITIAL UPDATE
// ==========================



loadWarnings();

setInterval(() => {

    loadWarnings();

}, 5000);







// ==========================
// REAL-TIME STORAGE WATCHER
// ==========================

window.addEventListener(
"storage",
function(event){

    // ==========================
    // NOTIFICATIONS UPDATED
    // ==========================

    if(event.key === "notifications"){

        notifications =
        getNotifications();



        loadNotifications();

        updateCounters();

        updateAnalytics();

        updateSystemHealth();

        loadRecentActivity();



        startAlert();



        showPopup(
            "New Violation Detected!",
            "warning"
        );

    }



    // ==========================
    // WARNINGS UPDATED
    // ==========================

    if(event.key === "warnings"){

        loadWarnings();

        updateCounters();

        updateSystemHealth();

    }



    // ==========================
    // SETTINGS UPDATED
    // ==========================

    if(event.key === "settings"){

        updateSystemHealth();

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
  getNotifications();



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

// ==========================
// SYSTEM HEALTH
// ==========================

function updateSystemHealth(){

    // GET SETTINGS

    const settings =
    getSettings();



    // GET WARNINGS

  const warnings =
getWarnings();



    // AI STATUS

    document.getElementById(
        "aiStatus"
    ).innerText = "Active";



    // NOTIFICATION STATUS

    document.getElementById(
        "notificationHealth"
    ).innerText =

    settings.notifications
    ? "Active"
    : "Disabled";



    // WARNING COUNT

    document.getElementById(
        "warningHealth"
    ).innerText =
    warnings.length;



    // ALERT STATUS

    document.getElementById(
        "alertHealth"
    ).innerText =

    notifications.length > 0
    ? "Alert Active"
    : "Normal";

}

// ==========================
// RECENT ACTIVITY
// ==========================

function loadRecentActivity(){

    // GET CONTAINER

    const activityContainer =
    document.getElementById(
        "activityContainer"
    );



    // SAFETY CHECK

    if(!activityContainer){

        return;

    }



    // GET NOTIFICATIONS

    const notifications =
 getNotifications();



    // CLEAR OLD DATA

    activityContainer.innerHTML =
    "";



    // EMPTY STATE

    if(notifications.length === 0){

        activityContainer.innerHTML = `

        <div class="activity-card">

            <p>
                No Recent Activity
            </p>

        </div>

        `;

        return;

    }



    // SHOW LATEST FIRST

    notifications
    .slice()
    .reverse()
    .forEach(notification => {

        activityContainer.innerHTML += `

        <div class="activity-card">

            <p>

                ⚠️
                ${notification.title}

            </p>

            <span>

                ${notification.time}

            </span>

        </div>

        `;

    });

}
// ==========================
// HIDE LOADER
// ==========================

window.addEventListener(
"load",
function(){

    setTimeout(() => {

        loadingOverlay.classList.add(
            "hide"
        );

    },1000);

});




//===

 const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click", function(e){

        e.preventDefault();

        localStorage.removeItem("user_id");

        window.location.href =
        "../index.html";

    });

}
bell.addEventListener(
    "click",
    function(){

        bell.classList.remove(
            "ringing"
        );

    }
);