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



// ==========================
// POPUP SYSTEM
// ==========================

const popup =
document.getElementById("popup");

const popupText =
document.getElementById("popupText");


// SHOW POPUP

function showPopup(message){

    popupText.innerText = message;

    popup.classList.add("show");

    setTimeout(() => {

        popup.classList.remove("show");

    },3000);

}



// ==========================
// PLAY BUTTONS
// ==========================

const playButtons =
document.querySelectorAll(".play-btn");


// BUTTON EVENTS

playButtons.forEach(button => {

    button.addEventListener("click", function(){

        showPopup(
            "Playback Recording Opened!"
        );

    });

});

// ==========================
// DETECTION BUTTONS
// ==========================

const detectButtons =
document.querySelectorAll(".detect-btn");



// BUTTON EVENTS

detectButtons.forEach(button => {

    button.addEventListener("click", function(){

        // DETECTION TYPE

        let title = "";

        let location = "";



        // HAIRNET

        if(button.classList.contains(
            "hairnet-btn"
        )){

            title =
            "No Hairnet Detected";

            location =
            "Kitchen Entry";

        }



        // GLOVES

        else if(button.classList.contains(
            "gloves-btn"
        )){

            title =
            "No Gloves Detected";

            location =
            "Food Area";

        }



        // APRON

        else{

            title =
            "No Apron Detected";

            location =
            "Main Entry";

        }



        // CREATE NOTIFICATION

        fetch(

    "http://127.0.0.1:5000/detect-violation",

    {

        method: "POST",

        headers: {

            "Content-Type":
            "application/json"

        },

        body: JSON.stringify({

            violation: title

        })

    }

)

.then(response => response.json())

.then(data => {

    showPopup(

        "AI Detection Triggered!"

    );

})

.catch(error => {

    console.error(error);

});

    });

});


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