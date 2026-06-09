const userId =
localStorage.getItem("user_id");

if(!userId){

    window.location.href =
    "../login.html";

}   

   
   
   
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


fetch("http://127.0.0.1:5000/users")

.then(response => response.json())

.then(users => {

    const userTable =
    document.getElementById("userTable");

    userTable.innerHTML = "";

    users.forEach(user => {

        userTable.innerHTML += `

        <tr>

            <td>User ${user.id}</td>

            <td>${user.email}</td>

            <td>-</td>

            <td>
                <span class="status active-status">
                    Active
                </span>
            </td>

            <td>
                <button
                    class="inform-btn"
                    data-user-id="${user.id}"
                >
                    INFORM
                </button>
            </td>

        </tr>

        `;

    });

    // ATTACH EVENTS TO NEW BUTTONS

    const informButtons =
    document.querySelectorAll(".inform-btn");

    informButtons.forEach(button => {

        button.addEventListener("click", function(){

            const userId =
            this.dataset.userId;
            
fetch(
    "http://127.0.0.1:5000/warnings",
    {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            user_id: userId,

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

});

        });

    });

});



///===


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