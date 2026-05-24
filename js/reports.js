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
// REPORT TABLE
// ==========================

const reportTable =
document.getElementById(
    "reportTable"
);



// ==========================
// GET REPORTS
// ==========================

let reports =
JSON.parse(
    localStorage.getItem("reports")
) || [];



// ==========================
// LOAD REPORTS
// ==========================

function loadReports(){

    reportTable.innerHTML = "";

    reports.forEach(report => {

        reportTable.innerHTML += `

        <tr>

            <td>${report.user}</td>

            <td>${report.violation}</td>

            <td>${report.location}</td>

            <td>${report.time}</td>

            <td>${report.status}</td>

        </tr>

        `;

    });

}



// INITIAL LOAD

loadReports();