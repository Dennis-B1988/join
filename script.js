let users = [];
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
            return JSON.parse(res.data.value);
        } throw `Could not find data with key "${key}".`;
    });
}


async function loadUsers() {
    users = await getItem('user');
}


function goBack() {
    window.history.back();
}


function showCurrentInformationFromLogin() {
    let comeFromPage = loadPage('page');
    document.querySelector('.side-bar-container').style.opacity = comeFromPage === 'page' ? '0' : '1';
    document.querySelector('.side-bar-container').style.pointerEvents = comeFromPage === 'page' ? 'none' : '';
}


function savePage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


function loadPage(key) {
    let dataFromLocalStorage = localStorage.getItem(key);
    if (dataFromLocalStorage) {
        return JSON.parse(dataFromLocalStorage);
    }
}


async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


function removePageFromLocalStorage() {
    if (window.location.pathname === '/index.html') {
        localStorage.removeItem('page');
    }
}