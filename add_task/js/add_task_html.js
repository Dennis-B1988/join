/**
 * Generates an HTML subtask list item with edit and delete icons.
 *
 * @param {Object} subtaskContent - The content of the subtask.
 * @param {number} i - The index of the subtask.
 * @return {string} The HTML string representing the subtask list item.
 */
function addSubtaskList(subtaskContent, i) {
    return /*html*/ `
        <div id="subtask-list-${i}" class="subtask-list">        
            <li id="subtask-${i}" class="subtask-list-item">${subtaskContent.subtask}</li>
            <div id="subtask-icons-${i}" class="subtask-icons">
                <img onclick="editSubtask(${i})"  class="edit-subtask"  src="../assets/img/edit-blue.png" alt="" />
                |
                <img onclick="deleteSubtask(${i})" src="../assets/img/delete.png" alt="" />
            </div>
            <div id="subtask-icons-edit-${i}" class="subtask-icons-edit hidden">
                <div class="edit-subtask-container hover-icon">
                    <img onclick="deleteSubtask(${i})"  class="edit-subtask"  src="../assets/img/delete.png" alt="" />
                </div>
                |
                <div class="edit-subtask-container hover-icon">
                    <img onclick="saveEditedSubtask(${i})" src="../assets/img/mark-blue.png" alt="" />
                </div>
            </div>
        </div>
    `;
}


/**
 * Generates an HTML input element with the given index and subtask text.
 *
 * @param {number} i - The index of the subtask.
 * @param {string} subtaskText - The text of the subtask.
 * @return {string} The HTML input element as a string.
 */
function changeSubtaskToInput(i, subtaskText){
    return /*html*/ `
        <input type="text" id="edit-input-${i}" class="subtask-edit-input" value="${subtaskText}" 
        onkeypress="saveEditedSubtaskOnEnter(event, ${i})" />
    `;
}


/**
 * Renders an assigned to dropdown item with the given index, user label, and initials.
 *
 * @param {number} i - The index of the dropdown item.
 * @param {string} userLabel - The label of the user.
 * @param {string} initials - The initials of the user.
 * @return {string} The HTML for the assigned to dropdown item.
 */
function renderAssignedToDropdown(i, userLabel, initials) {
    return /*html*/ `
        <div onclick="userCheckmark(${i})" class="assigned-dropdown-item" id="assigned-dropdown-item-${i}">
            <div class="user-dropdown-name-container">
                <div class="user-initials" id="user-initials-${i}">${initials}</div>
                <div class="assigned-dropdown-user" id="assigned-dropdown-user-${i}">${userLabel}</div>
            </div>
            <div class="checkmark-container">
                <img src="../assets/img/checkmark-empty_dark.png" class="checkmark" id="checkmark-${i}">
            </div>
        </div>
    `;
}


/**
 * Renders an assigned to dropdown item with the given index, user label, and initials.
 *
 * @param {number} i - The index of the dropdown item.
 * @param {string} userLabel - The label of the user.
 * @param {string} initials - The initials of the user.
 * @return {string} The HTML for the assigned to dropdown item.
 */
function renderAssignedToDropdownLoggedUser(i, user, initials) {
    return /*html*/ `
        <div onclick="userCheckmark(${i})" class="assigned-dropdown-item" id="assigned-dropdown-item-${i}">
            <div class="user-dropdown-name-container">
                <div class="user-initials" id="user-initials-${i}">${initials}</div>
                <div class="assigned-dropdown-user" id="assigned-dropdown-user-${i}">${user} (You)</div>
            </div>
            <div class="checkmark-container">
                <img src="../assets/img/checkmark-empty_dark.png" class="checkmark" id="checkmark-${i}">
            </div>
        </div>
    `;
}


/**
 * Renders an assigned to users element with the given index and initials.
 *
 * @param {number} i - The index of the assigned user.
 * @param {string} initials - The initials of the assigned user.
 * @return {string} The HTML for the assigned to users element.
 */
function renderAssignedToUsers(i, initials){
    return /*html*/ `
        <div id="assigned-to-users-checked-${i}" class="assigned-to-users-checked">${initials}</div>
    `;
}