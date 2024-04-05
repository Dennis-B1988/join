async function init() {
    await includeHTML();
    showCategory();
    showCurrentInformation();
    hideHelpIcon();
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


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}