const STORAGE_TOKEN = '754IWRJVXIB98URXG9ZRI56E2VA80WU1Z40SLR7S';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}


function goBack() {
    window.history.back();
}


function initLogin() {
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