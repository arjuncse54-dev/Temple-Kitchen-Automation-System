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
// POPUP SYSTEM
// ==========================

const popup =
document.getElementById("popup");

const popupText =
document.getElementById("popupText");


// SHOW POPUP

function showPopup(message,type){

    popupText.innerText = message;

    popup.classList.remove("success");
    popup.classList.remove("warning");
    popup.classList.remove("error");

    popup.classList.add(type);

    popup.classList.add("show");

    setTimeout(() => {

        popup.classList.remove("show");

    },3000);

}



// ==========================
// NOTIFICATION CONTAINER
// ==========================

const notificationsContainer =
document.getElementById(
    "notificationsContainer"
);



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

function loadNotifications(){

    // CLEAR OLD HTML

    notificationsContainer.innerHTML = "";
    if(notifications.length === 0){

    notificationsContainer.innerHTML = `

    <div class="notification-card">

        <p>
            No Notifications Found
        </p>

    </div>

    `;

    return;

}



    // LOOP THROUGH DATA

    notifications.forEach(
    (notification,index) => {

        notificationsContainer.innerHTML += `

        <div class="notification-card">

            <div class="notification-header">

                <h3>
                    ${notification.title}
                </h3>

                <span>
                    ${notification.time}
                </span>

            </div>

            <p>
                Location:
                ${notification.location}
            </p>

            <div class="notification-actions">

                <button
                class="clear-btn"
                onclick="clearNotification(${index})">

                    Clear

                </button>

            </div>

        </div>

        `;

    });

}



// ==========================
// CLEAR NOTIFICATION
// ==========================

function clearNotification(index){

    // REMOVE NOTIFICATION

    notifications.splice(index,1);



    // UPDATE STORAGE

    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );



    // STOP BELL IF EMPTY

    if(notifications.length === 0){

        const bell =
        document.querySelector(".bell");

        if(bell){

            bell.classList.remove("ringing");

        }

    }



    // RELOAD UI

    loadNotifications();



    // POPUP

    showPopup(
        "Notification Cleared!",
        "success"
    );

}



// ==========================
// INITIAL LOAD
// ==========================

loadNotifications();