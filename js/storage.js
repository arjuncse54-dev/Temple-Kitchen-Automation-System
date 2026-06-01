// ==========================
// NOTIFICATIONS
// ==========================

function getNotifications(){

    return JSON.parse(
        localStorage.getItem(
            "notifications"
        )
    ) || [];

}


function saveNotifications(data){

    localStorage.setItem(
        "notifications",
        JSON.stringify(data)
    );

}



// ==========================
// WARNINGS
// ==========================

function getWarnings(){

    return JSON.parse(
        localStorage.getItem(
            "warnings"
        )
    ) || [];

}


function saveWarnings(data){

    localStorage.setItem(
        "warnings",
        JSON.stringify(data)
    );

}



// ==========================
// REPORTS
// ==========================

function getReports(){

    return JSON.parse(
        localStorage.getItem(
            "reports"
        )
    ) || [];

}


function saveReports(data){

    localStorage.setItem(
        "reports",
        JSON.stringify(data)
    );

}



// ==========================
// SETTINGS
// ==========================

function getSettings(){

    return JSON.parse(
        localStorage.getItem(
            "settings"
        )
    ) || {};

}


function saveSettings(data){

    localStorage.setItem(
        "settings",
        JSON.stringify(data)
    );

}