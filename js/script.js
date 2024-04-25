const colors = [
    '#6E52FF',
    '#FF5EB3',
    '#FF7A00',
    '#9327FF',
    '#00BEE8',
    '#1FD7C1',
    '#FF745E',
    '#FFA35E',
    '#FC71FF',
    '#FFC701',
    '#0038FF',
    '#C3FF2B',
    '#FFE62B',
    '#FF4646',
    '#FFBB2B'
];


let users = [];
let contacts = [];
let tasks = [];


/**
 * Generates a random color from the predefined colors array.
 *
 * @return {string} The randomly selected color.
 */
function randomColor() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}


/**
 * Sets an item in the storage with the given key and value.
 *
 * @param {string} key - The key of the item to be set.
 * @param {any} value - The value of the item to be set.
 * @return {Promise<any>} A promise that resolves to the JSON response from the server.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}


/**
 * Retrieves an item from the storage based on the provided key.
 *
 * @param {string} key - The key of the item to retrieve.
 * @return {Promise<any>} A promise that resolves to the retrieved data.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        if (res.data) {
            return JSON.parse(res.data.value);
        } throw `Could not find data with key "${key}".`;
    });
}


/**
 * Loads data from either local storage or a remote server based on the current user.
 *
 * @return {Promise<void>} A promise that resolves when the data has been loaded.
 */
async function loadData() {
    if (loadPage('guest') === 'guest') {
        users = dummyUserArray;
        contacts = loadPage('contacts');
        tasks = loadPage('tasks');
        if (localStorage.getItem('contacts') === null) {
            contacts = dummyContactsArray;
        }
        if (localStorage.getItem('tasks') === null) {
            tasks = dummyTaskArray;
        }
    } else {
        users = await getItem('user');
        contacts = await getItem('contacts');
        tasks = await getItem('tasks');
    }
}



function goBack() {
    if (document.querySelector('.side-bar-container').style.opacity === '0') {
        window.close();
    } else {
        window.history.back();
    }
}


/**
 * Navigates the browser history back by one step.
 *
 */
function savePage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}


/**
 * Retrieves an item from the local storage based on the provided key.
 *
 * @param {string} key - The key of the item to retrieve.
 * @return {any} The parsed data from the local storage, or undefined if the item does not exist.
 */
function loadPage(key) {
    let dataFromLocalStorage = localStorage.getItem(key);
    if (dataFromLocalStorage) {
        return JSON.parse(dataFromLocalStorage);
    }
}


/**
 * Asynchronously includes HTML content from specified URLs into HTML elements with the 'w3-include-html' attribute.
 *
 * @return {Promise<void>} A Promise that resolves when all HTML content has been successfully included.
 */
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