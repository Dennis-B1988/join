function initTemplate() {
    showCategory();
    showCurrentInformation();
    hideHelpIcon();
    extractInitials();
}


/**
 * Function to show category based on the current window location.
 */
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


/**
 * Sets the background color, removes the 'hover' class, and hides the 'headerHelp' and 'headerUsername' elements
 * for the current page if it is either the privacy policy or legal notice page.
 *
 * @return {void} This function does not return a value.
 */
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


/**
 * Hides the help icon in the header if the current page is the help page.
 *
 * @return {void} This function does not return a value.
 */
function hideHelpIcon() {
    if (window.location.pathname == '/legal_information/help.html') {
        document.getElementById('headerHelp').style.display = 'none';
    }
}


/**
 * Extracts initials from the user's name and displays them in the header.
 *
 * @return {void} This function does not return anything.
 */
function extractInitials() {
    let headerUsername = document.getElementById('headerUsername');
    let index = parseFloat(loadPage('user'));
    if (localStorage.getItem('user') !== null) {
        let user = users[index];
        let nameParts = user.name.split(' ');
        let initials = nameParts.map(part => part.charAt(0)).join('');
        headerUsername.innerHTML = initials;
    } else {
        headerUsername.innerHTML = 'G';
    }
}


/**
 * Toggles the display of the dropdown container.
 *
 * @param {none} - This function does not take any parameters.
 * @return {none} - This function does not return any value.
 */
function targetDropdown() {
    let dropdownContainer = document.getElementById("dropdownContainer");
    if (dropdownContainer.style.display === "none") {
        dropdownContainer.style.display = "inline";
    }
}


/**
 * Toggles the display of the dropdown container when the specified element is clicked.
 *
 * @param {Event} event - The click event.
 * @param {string} id - The ID of the element that triggers the dropdown.
 * @return {void} This function does not return anything.
 */
function openOrCloseDropdown(event, id) {
    let dropdwonContainer = document.getElementById('dropdownContainer');
    let targetElement = event.target;
    if (targetElement.id === id) {
        dropdwonContainer.style.display = 'none';
    }
}


/**
 * Removes the 'guest' item from the local storage.
 *
 * @return {void} This function does not return a value.
 */
function logoutAsGuest() {
    localStorage.removeItem('guest');
}