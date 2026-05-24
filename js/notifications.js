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
// LOAD NOTIFICATIONS
// ==========================

const notificationsContainer =
document.getElementById(
    "notificationsContainer"
);


// GET SAVED NOTIFICATIONS

let notifications =
JSON.parse(
    localStorage.getItem("notifications")
) || [];



// SHOW NOTIFICATIONS

function loadNotifications(){

    notificationsContainer.innerHTML = "";

    notifications.reverse().forEach(notification => {

        notificationsContainer.innerHTML += `

        <div class="notification-card">

            <div class="notification-header">

                <h3>${notification.title}</h3>

                <span>${notification.time}</span>

            </div>

            <p>
                Location: ${notification.location}
            </p>

            <div class="notification-actions">

                <button class="view-btn">
                    View
                </button>

            </div>

        </div>

        `;

    });

}


// INITIAL LOAD

loadNotifications();