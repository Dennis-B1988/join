async function initTemplate() {
    showCategory();
    showCurrentInformation();
    hideHelpIcon();
    extractInitials()
}


function showCategory() {
    if (window.location.pathname == '/add_task/add_task.html') {
        document.getElementById('addTask').classList.add('active');
    }
    if (window.location.pathname == '/summary/summary.html') {
        document.getElementById('summary').classList.add('active');
    }
    if (window.location.pathname == '/board/board.html') {
        document.getElementById('board').classList.add('active');
    }
    if (window.location.pathname == '/contacts/contacts.html') {
        document.getElementById('contact').classList.add('active');
    }
}


function showCurrentInformation() {
    if (window.location.pathname == '/legal_information/privacy_policy.html') {
        document.getElementById('privacyPolicy').style.backgroundColor = '#091931'
        document.getElementById('privacyPolicy').classList.remove('hover');
        document.getElementById('headerHelp').style.display = 'none';
        document.getElementById('headerUsername').style.display = 'none';
    }
    if (window.location.pathname == '/legal_information/legal_notice.html') {
        document.getElementById('legalNotice').style.backgroundColor = '#091931';
        document.getElementById('legalNotice').classList.remove('hover');
        document.getElementById('headerHelp').style.display = 'none';
        document.getElementById('headerUsername').style.display = 'none';
    }
}


function hideHelpIcon() {
    if (window.location.pathname == '/legal_information/help.html') {
        document.getElementById('headerHelp').style.display = 'none';
    }
}


function extractInitials() {
    let headerUsername = document.getElementById('headerUsername');
    let index = parseFloat(loadPage('user'));
    if (localStorage.getItem('user') !== null) {
        let user = users[index];
        let nameParts = user.name.split(' ');
        let initials = nameParts.map(part => part.charAt(0)).join('');
        headerUsername.innerHTML = initials;
    }
}

function targetDropdown() {
    let dropdownContainer = document.getElementById("dropdownContainer");
    if (dropdownContainer.style.display === "none") {
        dropdownContainer.style.display = "inline";
    }
}

function openOrCloseDropdown(event, id) {
    let dropdwonContainer = document.getElementById('dropdownContainer');
    let targetElement = event.target;
    if (targetElement.id === id) {
        dropdwonContainer.style.display = 'none';
    }
}


function logoutAsGuest() {
    localStorage.removeItem('guest');
}