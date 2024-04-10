async function initBoard() {
    await includeHTML();
    await loadUsers();
    await initTemplate();
}