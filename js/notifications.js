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

    // REMOVE ITEM

    notifications.splice(index,1);



    // UPDATE LOCAL STORAGE

    localStorage.setItem(
        "notifications",
        JSON.stringify(notifications)
    );



    // RELOAD UI

    loadNotifications();

}



// ==========================
// INITIAL LOAD
// ==========================

loadNotifications();