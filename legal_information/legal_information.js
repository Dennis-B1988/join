async function initLegalInformation() {
    await includeHTML();
    showCurrentInformationFromLogin();
    await loadData();
    await initTemplate();
}


/**
 * Shows the current information from the login page.
 *
 * @param {string} comeFromPage - The page the user came from.
 * @return {void} This function does not return a value.
 */
function showCurrentInformationFromLogin() {
    let comeFromPage = loadPage('noPage');
    document.querySelector('.side-bar-container').style.opacity = comeFromPage === 'noPage' ? '0' : '1';
    document.querySelector('.side-bar-container').style.pointerEvents = comeFromPage === 'noPage' ? 'none' : '';
}