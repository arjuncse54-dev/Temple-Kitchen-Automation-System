  
  
  const userId =
localStorage.getItem("user_id");

if(!userId){

    window.location.href =
    "../login.html";

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

// ==========================
// REPORTS ARRAY
// ==========================

let reports = [];



// ==========================
// LOAD REPORTS
// ==========================

function loadReports(){

    fetch("http://127.0.0.1:5000/reports")

    .then(response => response.json())

    .then(data => {

        reports = data;

        reportTable.innerHTML = "";

        if(reports.length === 0){

            reportTable.innerHTML = `

            <tr>

                <td colspan="6">

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
onclick="viewReport(${index})">

    View

</button>

                </td>

            </tr>

            `;

        });

    })

    .catch(error => {

        console.error(
            "Error loading reports:",
            error
        );

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

        const value =
        this.value.toLowerCase();

        reportTable.innerHTML = "";

        const filteredReports =

reports.filter(report =>

    report.user
    .toLowerCase()
    .includes(value)

    ||

    report.violation
    .toLowerCase()
    .includes(value)

    ||

    report.location
    .toLowerCase()
    .includes(value)

    ||

    report.status
    .toLowerCase()
    .includes(value)

);



        if(filteredReports.length === 0){

            reportTable.innerHTML = `

            <tr>

                <td colspan="6">

                    No Reports Found

                </td>

            </tr>

            `;

            return;

        }



        filteredReports.forEach(

            (report,index) => {

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
                        onclick="viewReport(${index})">

                            View

                        </button>

                    </td>

                </tr>

                `;

            }

        );

    }

);





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


function viewReport(index){

    const report = reports[index];

    alert(

        "User: " + report.user + "\n\n" +

        "Violation: " + report.violation + "\n\n" +

        "Location: " + report.location + "\n\n" +

        "Time: " + report.time + "\n\n" +

        "Status: " + report.status

    );

}

//===  
const logoutBtn =
document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click", function(e){

        e.preventDefault();

        localStorage.removeItem("user_id");

        window.location.href =
        "../login.html";

    });

}