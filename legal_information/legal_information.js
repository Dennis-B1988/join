async function initLegalInformation() {
    await includeHTML();
    await loadUsers();
    await initTemplate();
}