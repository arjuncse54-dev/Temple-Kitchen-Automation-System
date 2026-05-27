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


const searchInput =
document.getElementById("searchInput");



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
    if(reports.length === 0){

    reportTable.innerHTML = `

    <tr>

        <td colspan="5">

            No Reports Available

        </td>

    </tr>

    `;

    return;

}

    reports.forEach((report,index) => {

        reportTable.innerHTML += `

        <tr>

            <td>${report.user}</td>

            <td>${report.violation}</td>

            <td>${report.location}</td>

            <td>${report.time}</td>

            <td>${report.status}</td>
            <td>

    <button
    class="delete-btn"
    onclick="deleteReport(${index})">

        Delete

    </button>

</td>

        </tr>

        `;

    });

}



// INITIAL LOAD

loadReports();

// ==========================
// SEARCH REPORTS
// ==========================

searchInput.addEventListener(
"keyup",
function(){

    // GET INPUT VALUE

    const value =
    this.value.toLowerCase();



    // FILTER REPORTS

    const filteredReports =
    reports.filter(report => {

        return report.user
        .toLowerCase()
        .includes(value);

    });



    // CLEAR TABLE

    reportTable.innerHTML = "";



    // EMPTY STATE

    if(filteredReports.length === 0){

        reportTable.innerHTML = `

        <tr>

            <td colspan="5">

                No Reports Found

            </td>

        </tr>

        `;

        return;

    }



    // LOAD FILTERED REPORTS

    filteredReports.forEach(report => {

        reportTable.innerHTML += `

        <tr>

            <td>${report.user}</td>

            <td>${report.violation}</td>

            <td>${report.location}</td>

            <td>${report.time}</td>

            <td>${report.status}</td>
            <td>

    <button
    class="delete-btn"
    onclick="deleteReport(${index})">

        Delete

    </button>

</td>

        </tr>

        `;

    });

});
// ==========================
// DELETE REPORT
// ==========================

function deleteReport(index){

    // REMOVE REPORT

    reports.splice(index,1);



    // UPDATE STORAGE

    localStorage.setItem(
        "reports",
        JSON.stringify(reports)
    );



    // RELOAD TABLE

    loadReports();

}