async function initLegalInformation() {
    await includeHTML();
    await loadData();
    await initTemplate();
}