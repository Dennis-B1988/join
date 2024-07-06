async function initLogin() {
    removePageFromLocalStorage();
    await includeHTML();
    await loadData();
    animationLogo();
    loadCredentialsFromLocalStorage();
}


/**
 * Removes the 'page', 'user', and 'guest' items from the local storage if the current page is '/index.html'.
 *
 * @return {void} This function does not return a value.
 */
function removePageFromLocalStorage() {
    if (window.location.pathname === '/index.html') {
        localStorage.removeItem('page');
        localStorage.removeItem('noPage');
        localStorage.removeItem('user');
        localStorage.removeItem('guest');
    }
}


/**
 * Adds the 'logo-container' class to the element with the class 'logo-container-effect' and
 * adds the 'logo' class to the element with the class 'logo-effect'.
 *
 * @return {void} This function does not return a value.
 */
function animationLogo() {
    document.querySelector('.logo-container-effect').classList.add('logo-container');
    document.querySelector('.logo-effect').classList.add('logo');
}


/**
 * Logs in a user by checking if the provided email and password match any existing user in the system.
 * If a match is found, the user is remembered and validated. If no match is found, an error message is displayed.
 *
 * @return {void} This function does not return a value.
 */
function userLogin() {
    let emailLogin = document.getElementById('emailLogin');
    let passwordLogin = document.getElementById('passwordLogin');
    let noMatchEmailLogin = document.getElementById('noMatchLoginEmail');
    let noMatchPasswordLogin = document.getElementById('noMatchLoginPassword');
    let index = users.findIndex(user => user.email === emailLogin.value);
    if (index === -1) {
        showErrorMessage(emailLogin, noMatchEmailLogin);
    } else {
        localStorage.removeItem('noPage');
        rememberMeUser(index);
        userLoginValidation(index, emailLogin, passwordLogin, noMatchEmailLogin, noMatchPasswordLogin);
    }
}


/**
 * Validates user login credentials and performs appropriate actions based on the validation result.
 *
 * @param {number} index - The index of the user in the users array.
 * @param {HTMLElement} emailLogin - The input field containing the email for login.
 * @param {HTMLElement} passwordLogin - The input field containing the password for login.
 * @param {HTMLElement} noMatchEmailLogin - The element to display error for email mismatch.
 * @param {HTMLElement} noMatchPasswordLogin - The element to display error for password mismatch.
 * @return {void} This function does not return a value.
 */
function userLoginValidation(index, emailLogin, passwordLogin, noMatchEmailLogin, noMatchPasswordLogin) {
    let user = users[index];
    if (user.email === emailLogin.value && user.password === passwordLogin.value) {
        savePage('user', index);
        localStorage.removeItem('guest');
        window.location.href = './summary/summary.html';
    }
    if (user.email !== emailLogin.value) {
        showErrorMessage(emailLogin, noMatchEmailLogin);
    }
    if (user.password !== passwordLogin.value) {
        showErrorMessage(passwordLogin, noMatchPasswordLogin);
    }
}


/**
 * Saves the user's login information in local storage if the "Remember me" checkbox is checked,
 * otherwise removes the saved information from local storage.
 *
 * @param {number} index - The index of the user in the users array.
 * @return {void} This function does not return a value.
 */
function rememberMeUser(index) {
    let checkmarkLogin = document.getElementById('checkmarkLogin');
    if (checkmarkLogin.src.includes('/assets/img/checkmark_checked_dark.png')) {
        savePage('rememberMeUser', index);
        savePage('rememberMeCheckmark', './assets/img/checkmark_checked_dark.png');
    } else {
        localStorage.removeItem('rememberMeUser');
        localStorage.removeItem('rememberMeCheckmark');
    }
}


/**
 * Loads the user's login credentials from local storage if the "Remember me" checkbox is checked.
 *
 * @return {void} This function does not return a value.
 */
function loadCredentialsFromLocalStorage() {
    let emailLogin = document.getElementById('emailLogin');
    let passwordLogin = document.getElementById('passwordLogin');
    let loginImg = document.getElementById('loginImg');
    let checkmarkLogin = document.getElementById('checkmarkLogin');
    if (loadPage('rememberMeCheckmark') === './assets/img/checkmark_checked_dark.png') {
        emailLogin.value = users[loadPage('rememberMeUser')].email;
        passwordLogin.value = users[loadPage('rememberMeUser')].password;
        loginImg.src = './assets/img/visibility_off.png';
        loginImg.style.zIndex = '999';
        checkmarkLogin.src = loadPage('rememberMeCheckmark');
    }
}


/**
 * Handles the signup or login functionality based on the provided classes.
 *
 * @param {string} hideClass - The class of the element to hide.
 * @param {string} showClass - The class of the element to show.
 */
function handleSignupOrLogin(hideClass, showClass) {
    let hideClassContainer = document.getElementById(hideClass);
    let showClassContainer = document.getElementById(showClass);
    let signupContainer = document.querySelector('.signup-container');
    let signupContainerMobile = document.querySelector('.signup-container-mobile');
    hideClassContainer.style.display = 'none';
    showClassContainer.style = '';
    signupContainer.style.opacity = hideClass === 'login' ? '0' : '1';
    signupContainerMobile.style.opacity = hideClass === 'login' ? '0' : '1';
}


/**
 * Changes the icon of a password input based on its value and type.
 *
 * @param {string} passwordId - The ID of the password input element.
 * @param {string} imageId - The ID of the image element to be updated.
 * @return {void} This function does not return a value.
 */
function changeIcon(passwordId, imageId) {
    let inputPassword = document.getElementById(passwordId);
    let inputImage = document.getElementById(imageId);
    if (inputPassword.value.length > 0 && inputPassword.type === 'password') {
        inputImage.src = './assets/img/visibility_off.png';
        inputImage.style.zIndex = '999';
    }
    if (inputPassword.value.length === 0) {
        inputImage.src = './assets/img/lock.png';
        inputImage.style.zIndex = '0';
        inputPassword.type = 'password';
    }
}


/**
 * Toggles the visibility of a password input and updates the corresponding image.
 *
 * @param {string} passwordId - The ID of the password input element.
 * @param {string} imageId - The ID of the image element to be updated.
 * @return {void} This function does not return a value.
 */
function showPassword(passwordId, imageId) {
    let inputPassword = document.getElementById(passwordId);
    let inputImage = document.getElementById(imageId);
    if (inputPassword.type === 'password') {
        inputPassword.type = 'text';
        inputImage.src = './assets/img/visibility.png';
    } else {
        inputPassword.type = 'password';
        inputImage.src = './assets/img/visibility_off.png';
    }
}


/**
 * Changes the checkmark on the signup button based on the validity of the signup form.
 *
 * @param {string} checkmarkId - The ID of the checkmark element.
 * @return {void} This function does not return a value.
 */
function changeCheckmark() {
    let signupButton = document.getElementById('signupButton');
    let checkmark = document.getElementById('checkmarkSignup');
    noteCheckmark('checkmarkSignup');
    if (isSignupValid() && checkmark.src.includes('/assets/img/checkmark_checked_dark.png')) {
        signupButton.disabled = false;
        signupButton.classList.add('button');
    } else {
        signupButton.disabled = true;
        signupButton.classList.remove('button');
    }
}


/**
 * Toggles the checkmark image source based on the current source.
 *
 * @param {string} id - The ID of the checkmark element.
 * @return {void} This function does not return a value.
 */
function noteCheckmark(id) {
    let checkmark = document.getElementById(id);
    if (checkmark.src.includes('/assets/img/checkmark-empty_dark.png')) {
        checkmark.src = './assets/img/checkmark_checked_dark.png';
    } else {
        checkmark.src = './assets/img/checkmark-empty_dark.png';
    }
}


/**
 * Checks if the signup form is valid by verifying if all the required fields are filled and the checkmark image source is correct.
 *
 * @return {boolean} Returns true if the signup form is valid, false otherwise.
 */
function isSignupValid() {
    let name = document.getElementById('name');
    let emailSignup = document.getElementById('emailSignup');
    let passwordSignup = document.getElementById('passwordSignup');
    let confirmPassword = document.getElementById('confirmPassword');
    let checkmarkSignup = document.getElementById('checkmarkSignup');
    return name.value.length > 0 && emailSignup.value.length > 0 &&
        passwordSignup.value.length > 0 && confirmPassword.value.length > 0 &&
        checkmarkSignup.src.includes('/assets/img/checkmark_checked_dark.png');
}


/**
 * Checks if the password and confirm password fields match. If they don't, displays an error message.
 *
 * @param {object} passwordSignup - The password input field.
 * @param {object} confirmPassword - The confirm password input field.
 * @param {object} noMatchSignup - The error message element.
 * @return {void} This function does not return a value.
 */
function passwordMatch() {
    let passwordSignup = document.getElementById('passwordSignup');
    let confirmPassword = document.getElementById('confirmPassword');
    let noMatchSignup = document.getElementById('noMatchSignup');
    if (passwordSignup.value !== confirmPassword.value) {
        passwordNoMatch(confirmPassword, noMatchSignup);
    } else {
        saveSignup();
        confirmPassword.style = '';
        noMatchSignup.style.display = 'none';
    }
}


/**
 * Sets the border color of the confirm password input field to red and displays the error message for 3 seconds.
 *
 * @param {HTMLInputElement} confirmPassword - The confirm password input field.
 * @param {HTMLElement} noMatchSignup - The error message element.
 * @return {void} This function does not return a value.
 */
function passwordNoMatch(confirmPassword, noMatchSignup) {
    confirmPassword.style.borderColor = 'red';
    noMatchSignup.style = '';
    setTimeout(function () {
        confirmPassword.style.borderColor = '';
        noMatchSignup.style.display = 'none';
    }, 3000);
}


/**
 * Sets the border color of the input element to red and displays the message element for 3 seconds.
 *
 * @param {HTMLInputElement} input - The input element to apply the error style to.
 * @param {HTMLElement} message - The message element to display.
 * @return {void} This function does not return a value.
 */
function showErrorMessage(input, message) {
    input.style.borderColor = 'red';
    message.style = '';
    setTimeout(function () {
        input.style.borderColor = '';
        message.style.display = 'none';
    }, 3000);
}


/**
 * Checks if the provided email already exists in the users array.
 *
 * @param {Object} email - The email to check.
 * @return {boolean} Returns true if the email exists, otherwise false.
 */
function existingEmail(email) {
    let index = users.findIndex(user => user.email === email.value);
    if (index !== -1) {
        return true;
    } else {
        return false;
    }
}


/**
 * Saves the signup information if the email is not already in use, otherwise displays an error message.
 *
 * @return {void} This function does not return a value.
 */
function saveSignup() {
    let name = document.getElementById('name');
    let emailSignup = document.getElementById('emailSignup');
    let passwordSignup = document.getElementById('passwordSignup');
    let confirmPassword = document.getElementById('confirmPassword');
    let checkmarkSignup = document.getElementById('checkmarkSignup');
    let noMatchSignupEmail = document.getElementById('noMatchSignupEmail');
    if (existingEmail(emailSignup)) {
        showErrorMessage(emailSignup, noMatchSignupEmail)
    } else {
        saveSignupSuccess(name, emailSignup, passwordSignup, confirmPassword, checkmarkSignup);
    }
}


/**
 * Saves the signup information and performs various actions such as adding the user to the users array,
 * saving the user to the contact list, resetting input values and sources, and showing a signup response.
 *
 * @param {Object} name - The input field for the user's name.
 * @param {Object} emailSignup - The input field for the user's email.
 * @param {Object} passwordSignup - The input field for the user's password.
 * @param {Object} confirmPassword - The input field for the user's confirm password.
 * @param {Object} checkmarkSignup - The checkmark element for the signup form.
 * @return {void} This function does not return a value.
 */
function saveSignupSuccess(name, emailSignup, passwordSignup, confirmPassword, checkmarkSignup) {
    let userSignup = {
            'name': name.value,
            'email': emailSignup.value,
            'password': passwordSignup.value,
        };
        users.push(userSignup);
        setItem('user', users);
        saveUserToContactList(name, emailSignup);
        resetValuesAndSrc(name, emailSignup, passwordSignup, confirmPassword, checkmarkSignup);
        showSignupResponse();
}


/**
 * Saves the user's information to the contact list.
 *
 * @param {Object} name - The input field for the user's name.
 * @param {Object} emailSignup - The input field for the user's email.
 * @return {void} This function does not return a value.
 */
function saveUserToContactList(name, emailSignup) {
    let user = {
        'name': name.value,
        'email': emailSignup.value,
        'phone': '',
        'color': randomColor(),
    };
    contacts.push(user);
    setItem('contacts', contacts);
}


/**
 * Resets the values and source of the input fields and the checkmark image for the signup form.
 *
 * @param {Object} name - The input field for the user's name.
 * @param {Object} emailSignup - The input field for the user's email.
 * @param {Object} passwordSignup - The input field for the user's password.
 * @param {Object} confirmPassword - The input field for the user's confirm password.
 * @param {Object} checkmarkSignup - The checkmark element for the signup form.
 * @return {void} This function does not return a value.
 */
function resetValuesAndSrc(name, emailSignup, passwordSignup, confirmPassword, checkmarkSignup) {
    name.value = '';
    emailSignup.value = '';
    passwordSignup.value = '';
    confirmPassword.value = '';
    checkmarkSignup.src = './assets/img/checkmark-empty_dark.png';
}


/**
 * Displays the signup response animation.
 *
 * @return {void} This function does not return a value.
 */
function showSignupResponse() {
    let signupAnimation = document.querySelector('.signup-animation');
    let saveSignup = document.querySelector('.save-signup');
    saveSignup.style = '';
    setTimeout(function () {
        showSignupAnimation(signupAnimation, saveSignup);
    }, 10);
}


/**
 * Animates the signup process by adding and removing classes, and triggering various actions after a delay.
 *
 * @param {Object} signupAnimation - The signup animation element.
 * @param {Object} saveSignup - The save signup element.
 * @return {void} This function does not return a value.
 */
function showSignupAnimation(signupAnimation, saveSignup) {
    signupAnimation.classList.add('animate');
    setTimeout(function () {
        saveSignup.style.display = 'none';
        signupAnimation.classList.remove('animate');
        handleSignupOrLogin('signup', 'login');
        changeCheckmark();
        noteCheckmark('checkmarkSignup');
        changeIcon('passwordSignup', 'signupImg');
        changeIcon('confirmPassword', 'confirmImg');
    }, 1500);
}


/**
 * Logs in as a guest user.
 *
 * @return {void} This function does not return a value.
 */
function loginAsGuest() {
    localStorage.removeItem('noPage');
    localStorage.removeItem('guest');
    savePage('guest', 'guest');
    localStorage.removeItem('user');
}