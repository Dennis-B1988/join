async function initLogin() {
    await includeHTML();
    await loadUsers();
    animationLogo();
    removePageFromLocalStorage();
    loadCredentialsFromLocalStorage()
}

function removePageFromLocalStorage() {
    if (window.location.pathname === '/index.html') {
        localStorage.removeItem('page');
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
    let user = users[index];
    rememberMeUser(emailLogin, passwordLogin);
    if (user.email === emailLogin.value && user.password === passwordLogin.value) {
        savePage('user', index);
        window.location.href = '../summary/summary.html';
    }
    if (user.email !== emailLogin.value) {
        showErrorMessage(emailLogin, noMatchEmailLogin);
    }
    if (user.password !== passwordLogin.value) {
        showErrorMessage(passwordLogin, noMatchPasswordLogin);
    }
}


function rememberMeUser(emailLogin, passwordLogin) {
    let checkmarkLogin = document.getElementById('checkmarkLogin');
    if (emailLogin.value !== '' &&
        passwordLogin.value !== '' &&
        checkmarkLogin.src.includes('/assets/img/checkmark_checked_dark.png')) {
        savePage('emailLogin', emailLogin.value);
        savePage('passwordLogin', passwordLogin.value);
        savePage('checkmarkLogin', '/assets/img/checkmark_checked_dark.png');
    } else {
        localStorage.removeItem('emailLogin');
        localStorage.removeItem('passwordLogin');
        localStorage.removeItem('checkmarkLogin');
    }
}


function loadCredentialsFromLocalStorage() {
    let emailLogin = document.getElementById('emailLogin');
    let passwordLogin = document.getElementById('passwordLogin');
    let loginImg = document.getElementById('loginImg');
    let checkmarkLogin = document.getElementById('checkmarkLogin');
    let email = loadPage('emailLogin');
    let password = loadPage('passwordLogin');
    let checked = loadPage('checkmarkLogin');
    if (typeof email !== 'undefined' && typeof password !== 'undefined' && typeof checked !== 'undefined') {
        emailLogin.value = email;
        passwordLogin.value = password;
        loginImg.src = './assets/img/visibility_off.png';
        loginImg.style.zIndex = '999';
        checkmarkLogin.src = checked;
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
        confirmPassword.style.borderColor = 'red';
        noMatchSignup.style = '';
        setTimeout(function () {
            confirmPassword.style.borderColor = '';
            noMatchSignup.style.display = 'none';
        }, 3000);
    } else {
        saveSignup();
        confirmPassword.style = '';
        noMatchSignup.style.display = 'none';
    }
}


function showErrorMessage(input, message) {
    input.style.borderColor = 'red';
    message.style = '';
    setTimeout(function () {
        input.style.borderColor = '';
        message.style.display = 'none';
    }, 3000);
}


function saveSignup() {
    let name = document.getElementById('name');
    let emailSignup = document.getElementById('emailSignup');
    let passwordSignup = document.getElementById('passwordSignup');
    let confirmPassword = document.getElementById('confirmPassword');
    let checkmarkSignup = document.getElementById('checkmarkSignup');
    let userSignup = {
        'name': name.value,
        'email': emailSignup.value,
        'password': passwordSignup.value,
    };
    users.push(userSignup);
    setItem('user', users);
    resetValuesAndSrc(name, emailSignup, passwordSignup, confirmPassword, checkmarkSignup);
    showSignupResponse();
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
    }, 10);
}