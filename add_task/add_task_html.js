function addSubtaskList(subtask, subtaskCount) {
    return /*html*/ `
        <div class="subtask-list">
            <li id="subtask-${subtaskCount}">${subtask}</li>
            <div class="subtask-icons">
                <img onclick="editSubtask(${subtaskCount})" src="../assets/img/edit-blue.png" alt="" />
                |
                <img onclick="deleteSubtask(${subtaskCount})" src="../assets/img/delete.png" alt="" />
            </div>
        </div>
    `;
}