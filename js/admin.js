// js/admin.js

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