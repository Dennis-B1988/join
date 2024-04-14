function addSubtaskList(subtaskContent, i) {
    return /*html*/ `
        <div id="subtask-list-${i}" class="subtask-list">
            <li id="subtask-${i}" class="subtask-list-item">${subtaskContent}</li>
            <div id="subtask-icons-${i}" class="subtask-icons">
                <img onclick="handleDoubleClick(${i})"  class="edit-subtask"  src="../assets/img/edit-blue.png" alt="" />
                |
                <img onclick="deleteSubtask(${i})" src="../assets/img/delete.png" alt="" />
            </div>
            <div id="subtask-icons-edit-${i}" class="subtask-icons-edit hidden">
                <img onclick="deleteSubtask(${i})"  class="edit-subtask"  src="../assets/img/delete.png" alt="" />
                |
                <img onclick="handleDoubleClick(${i})" src="../assets/img/mark-blue.png" alt="" />
            </div>
        </div>
    `;
}

function changeSubtaskToInput(index, subtaskText){
    return /*html*/ `
        <input type="text" id="edit-input-${index}" class="subtask-edit-input" value="${subtaskText}" />
    `;
}

function renderAssignedToDropdown(i, user, initials) {
    return /*html*/ `
        <div onclick="userCheckmark(${i})" class="assigned-dropdown-item" id="assigned-dropdown-item-${i}">
            <div class="user-initials" id="user-initials-${i}">${initials}</div>
            <div class="assigned-dropdown-user" id="assigned-dropdown-user-${i}">${user}</div>
            <img src="../assets/img/checkmark-empty_dark.png" class="checkmark" id="checkmark-${i}">
        </div>
    `;
}

function renderAssignedToUsers(i, initials){
    return /*html*/ `
        <div id="assigned-to-users-checked-${i}" class="assigned-to-users-checked">${initials}</div>
    `;
}