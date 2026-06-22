const userId =
localStorage.getItem("user_id");

if(!userId){

    window.location.href =
    "../index.html";

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

let notifications = [];



// ==========================
// LOAD NOTIFICATIONS
// ==========================

function loadNotifications(){

    fetch("http://127.0.0.1:5000/notifications")

    .then(response => response.json())



        .then(data => {

    console.log("DATA FROM FLASK:");
    console.log(data);

    notifications = data;
        // STORE DATA FROM FLASK

        notifications = data;

        // CLEAR OLD HTML

        notificationsContainer.innerHTML = "";

        // NO NOTIFICATIONS

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
                   onclick="clearNotification(${notification.id})">

                        Clear

                    </button>

                </div>

            </div>

            `;

        });

    })

    .catch(error => {

        console.error(
            "Error loading notifications:",
            error
        );

    });

}



// ==========================
// CLEAR NOTIFICATION
// ==========================

function clearNotification(id){

    alert("Clear button clicked");

    fetch(

        `http://127.0.0.1:5000/notifications/${id}`,

        {
            method: "DELETE"
        }

    )

    .then(response => {

        console.log("RESPONSE RECEIVED");

        return response.json();

    })

    .then(data => {

        console.log("SERVER DATA:", data);

        loadNotifications();

        showPopup(
            "Notification Cleared!",
            "success"
        );

    })

    .catch(error => {

        console.error("ERROR:", error);

    });

}


// ==========================
// INITIAL LOAD
// ==========================

loadNotifications();

//====

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