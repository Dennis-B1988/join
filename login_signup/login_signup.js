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