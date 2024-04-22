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
        localStorage.removeItem('user');
        localStorage.removeItem('guest');
    }
}


function animationLogo() {
    document.querySelector('.logo-container-effect').classList.add('logo-container');
    document.querySelector('.logo-effect').classList.add('logo');
}


function showCurrentInformationFromLogin() {
    let comeFromPage = loadPage('page');
    document.querySelector('.side-bar-container').style.opacity = comeFromPage === 'page' ? '0' : '1';
    document.querySelector('.side-bar-container').style.pointerEvents = comeFromPage === 'page' ? 'none' : '';
}


function userLogin() {
    let emailLogin = document.getElementById('emailLogin');
    let passwordLogin = document.getElementById('passwordLogin');
    let noMatchEmailLogin = document.getElementById('noMatchLoginEmail');
    let noMatchPasswordLogin = document.getElementById('noMatchLoginPassword');
    let index = users.findIndex(user => user.email === emailLogin.value);
    if (index === -1) {
        showErrorMessage(emailLogin, noMatchEmailLogin);
    } else {
        rememberMeUser(index);
        userLoginValidation(index, emailLogin, passwordLogin, noMatchEmailLogin, noMatchPasswordLogin);
    }
}

function userLoginValidation(index, emailLogin, passwordLogin, noMatchEmailLogin, noMatchPasswordLogin) {
    let user = users[index];
    if (user.email === emailLogin.value && user.password === passwordLogin.value) {
        savePage('user', index);
        localStorage.removeItem('guest');
        window.location.href = '../summary/summary.html';
    }
    if (user.email !== emailLogin.value) {
        showErrorMessage(emailLogin, noMatchEmailLogin);
    }
    if (user.password !== passwordLogin.value) {
        showErrorMessage(passwordLogin, noMatchPasswordLogin);
    }
}


function rememberMeUser(index) {
    let checkmarkLogin = document.getElementById('checkmarkLogin');
    if (checkmarkLogin.src.includes('/assets/img/checkmark_checked_dark.png')) {
        savePage('rememberMeUser', index);
        savePage('rememberMeCheckmark', '/assets/img/checkmark_checked_dark.png');
    } else {
        localStorage.removeItem('rememberMeUser');
        localStorage.removeItem('rememberMeCheckmark');
    }
}


function loadCredentialsFromLocalStorage() {
    let emailLogin = document.getElementById('emailLogin');
    let passwordLogin = document.getElementById('passwordLogin');
    let loginImg = document.getElementById('loginImg');
    let checkmarkLogin = document.getElementById('checkmarkLogin');
    if (loadPage('rememberMeCheckmark') === '/assets/img/checkmark_checked_dark.png') {
        emailLogin.value = users[loadPage('rememberMeUser')].email;
        passwordLogin.value = users[loadPage('rememberMeUser')].password;
        loginImg.src = './assets/img/visibility_off.png';
        loginImg.style.zIndex = '999';
        checkmarkLogin.src = loadPage('rememberMeCheckmark');
    }
}


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


function noteCheckmark(id) {
    let checkmark = document.getElementById(id);
    if (checkmark.src.includes('/assets/img/checkmark-empty_dark.png')) {
        checkmark.src = './assets/img/checkmark_checked_dark.png';
    } else {
        checkmark.src = './assets/img/checkmark-empty_dark.png';
    }
}


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

function passwordNoMatch(confirmPassword, noMatchSignup) {
    confirmPassword.style.borderColor = 'red';
    noMatchSignup.style = '';
    setTimeout(function () {
        confirmPassword.style.borderColor = '';
        noMatchSignup.style.display = 'none';
    }, 3000);
}


function showErrorMessage(input, message) {
    input.style.borderColor = 'red';
    message.style = '';
    setTimeout(function () {
        input.style.borderColor = '';
        message.style.display = 'none';
    }, 3000);
}


function existingEmail(email) {
    let index = users.findIndex(user => user.email === email.value);
    if (index !== -1) {
        return true;
    } else {
        return false;
    }
}


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


function resetValuesAndSrc(name, emailSignup, passwordSignup, confirmPassword, checkmarkSignup) {
    name.value = '';
    emailSignup.value = '';
    passwordSignup.value = '';
    confirmPassword.value = '';
    checkmarkSignup.src = './assets/img/checkmark-empty_dark.png';
}


function showSignupResponse() {
    let signupAnimation = document.querySelector('.signup-animation');
    let saveSignup = document.querySelector('.save-signup');
    saveSignup.style = '';
    setTimeout(function () {
        showSignupAnimation(signupAnimation, saveSignup);
    }, 10);
}

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


function loginAsGuest() {
    savePage('guest', 'guest');
    localStorage.removeItem('user');
}