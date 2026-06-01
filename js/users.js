// LIVE CLOCK

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



// POPUP ELEMENTS

const popup =
document.getElementById("popup");

const popupText =
document.getElementById("popupText");


// SHOW POPUP FUNCTION

function showPopup(message, type){

    popupText.innerText = message;

    // REMOVE OLD CLASSES
    popup.classList.remove("success");
    popup.classList.remove("error");
    popup.classList.remove("warning");

    // ADD NEW TYPE
    popup.classList.add(type);

    // SHOW POPUP
    popup.classList.add("show");

    setTimeout(() => {

    popup.classList.remove("show");

    popup.classList.remove("success");
    popup.classList.remove("error");
    popup.classList.remove("warning");

},3000);

  

}


// INFORM BUTTONS

const informButtons =
document.querySelectorAll(".inform-btn");


informButtons.forEach(button => {

    button.addEventListener("click", function(){

        // ==========================
        // CREATE WARNING
        // ==========================

     fetch(

    "http://127.0.0.1:5000/notifications",

    {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify({

            title: "No Hairnet",

            location: "Kitchen Entry",

            time: new Date().toLocaleTimeString()

        })

    }

)

.then(response => response.json())

.then(data => {

    showPopup(

        "Warning Sent Successfully!",

        "success"

    );

})

.catch(error => {

    console.error(error);

});





        // ==========================
        // CREATE REPORT
        // ==========================

        const report = {

            user: "Ravi Sharma",

            violation: "No Hairnet",

            location: "Kitchen Entry",

            time: new Date().toLocaleTimeString(),

            status: "Warning Sent"

        };


        // GET OLD REPORTS

        let reports =
        JSON.parse(
            localStorage.getItem("reports")
        ) || [];


        // ADD REPORT

        reports.push(report);


        // SAVE REPORTS

        localStorage.setItem(
            "reports",
            JSON.stringify(reports)
        );



        // ==========================
        // SHOW POPUP
        // ==========================

        showPopup(
            "Warning Sent Successfully!",
            "success"
        );

    });

});

// SEARCH FUNCTION 

const searchInput =
document.getElementById("searchInput");

searchInput.addEventListener("keyup", function(){

    const value =
    this.value.toLowerCase();

    const rows =
    document.querySelectorAll("#userTable tr");

    rows.forEach(row => {

        const name =
        row.children[0].textContent.toLowerCase();

        if(name.includes(value)){
            row.style.display = "";
        }
        else{
            row.style.display = "none";
        }

    });

});