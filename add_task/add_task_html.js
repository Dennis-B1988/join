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