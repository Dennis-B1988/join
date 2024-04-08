async function initLogin() {
    await includeHTML();
    animationLogo();
    removePageFromLocalStorage();
}


function animationLogo() {
    document.querySelector('.logo-container-effect').classList.add('logo-container');
    document.querySelector('.logo-effect').classList.add('logo');
}


function removePageFromLocalStorage() {
    if (window.location.pathname === '/index.html') {
        localStorage.removeItem('page');
    }
}


function handleSignupOrLogin(hideClass, showClass) {
    let hideClassContainer = document.getElementById(hideClass);
    let showClassContainer = document.getElementById(showClass);
    let signupContainer = document.querySelector('.signup-container');
    hideClassContainer.style.display = 'none';
    showClassContainer.style = '';
    signupContainer.style.opacity = hideClass === 'login' ? '0' : '1';
}


function showCurrentInformationFromLogin() {
    let comeFromPage = loadPage();
    document.querySelector('.side-bar-container').style.opacity = comeFromPage === 'index.html' ? '0' : '1';
}


function savePage() {
    localStorage.setItem('page', JSON.stringify('index.html'));
}


function loadPage() {
    let loadNotes = localStorage.getItem('page');
    if (loadNotes) {
        return JSON.parse(loadNotes);
    }
}