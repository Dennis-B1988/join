function addSubtaskList(subtask, subtaskCount) {
    return /*html*/ `
        <div id="subtask-list-${subtaskCount}" class="subtask-list">
            <li id="subtask-${subtaskCount}" class="subtask-list-item">${subtask}</li>
            <div class="subtask-icons">
                <img onclick="editSubtask(${subtaskCount})" id="edit-subtask-${subtaskCount}" class="edit-subtask"  src="../assets/img/edit-blue.png" alt="" />
                |
                <img onclick="deleteSubtask(${subtaskCount})" src="../assets/img/delete.png" alt="" />
            </div>
        </div>
    `;
}