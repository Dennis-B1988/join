async function initContacts() {
    await includeHTML();
    await loadUsers();
    await initTemplate();
}