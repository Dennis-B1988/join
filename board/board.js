async function initBoard() {
    await includeHTML();
    await loadData();
    await initTemplate();
}