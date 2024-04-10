// function currentDate() {
//     // JavaScript-Code, um das aktuelle Datum abzurufen und anzuzeigen
//     let currentDateContainer = document.getElementById("currentDateContainer");
//     let currentDate = new Date();
//     let options = { month: 'long', day: '2-digit', year: 'numeric' };
//     let formattedDate = currentDate.toLocaleDateString('en-US', options);
//     currentDateContainer.innerHTML = "Heute ist " + formattedDate;
// }

// // Aufruf der Funktion currentDate, sobald das Skript ausgeführt wird
// currentDate();

async function initSummary() {
    await includeHTML();
    await loadUsers();
    await initTemplate();
    showCurrentInformationFromLogin();
    showUserName();
}


function showUserName() {
    let userName = document.getElementById('userName');
    let index = parseFloat(loadPage('user'));
    if (localStorage.getItem('user') !== null) {
        let user = users[index];
        userName.innerHTML = user.name;
    }
}