// js/admin.js



const userId =
localStorage.getItem("user_id");

if(!userId){

    window.location.href =
    "../login.html";

}
// LIVE CLOCK

function updateClock(){

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    // ADD ZERO
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    const currentTime = `${hours}:${minutes}:${seconds}`;

    document.getElementById("clock").innerHTML = currentTime;

}

// UPDATE EVERY SECOND
setInterval(updateClock, 1000);

// INITIAL CALL
updateClock();   





// ==========================
// DASHBOARD STATS
// ==========================

function loadDashboardStats(){

    fetch(
        "http://127.0.0.1:5000/dashboard-stats"
    )

    .then(response => response.json())

    .then(data => {

        document.getElementById(
            "totalViolations"
        ).innerHTML =
        data.total_violations;

        document.getElementById(
            "todayViolations"
        ).innerHTML =
        data.today_violations;

        document.getElementById(
            "activeCameras"
        ).innerHTML =
        data.active_cameras;

        document.getElementById(
            "alertStatus"
        ).innerHTML =
        data.alert_status;

    })

    .catch(error => {

        console.error(
            "Dashboard Error:",
            error
        );

    });

}


// LOAD DASHBOARD DATA

loadDashboardStats();  


// ==========================
// RECENT ALERTS
// ==========================

function loadRecentAlerts(){

    fetch(
        "http://127.0.0.1:5000/notifications"
    )

    .then(response => response.json())

    .then(data => {

        const container =
        document.getElementById(
            "recentAlertsContainer"
        );

        container.innerHTML = "";

        if(data.length === 0){

            container.innerHTML = `

            <div class="alert-box">

                No Recent Alerts

            </div>

            `;

            return;

        }

        data.slice(-5).reverse().forEach(

            alert => {

                container.innerHTML += `

                <div class="alert-box">

                    ⚠️ ${alert.title}
                    -
                    ${alert.location}

                </div>

                `;

            }

        );

    })

    .catch(error => {

        console.error(
            "Recent Alerts Error:",
            error
        );

    });

}


// LOAD ALERTS

loadRecentAlerts();


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