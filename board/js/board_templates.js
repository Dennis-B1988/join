/**
 * Generates the HTML code for a todo task card.
 *
 * @param {Object} element - The task object containing the necessary information.
 * @param {number} subTaskDone - The number of completed subtasks for the task.
 * @return {string} The HTML code for the todo task card.
 */
function generateTodoHTML(element, subTaskDone) {
    return /*html*/`
        <div onclick="renderBigTodoHTML(${element['id']})" id="${element['id']}" draggable="true" ondragstart="startDragging(${element['id']})" class="task-card">
            <span id="taskCardCategory${element['id']}" class="task-card-category">${element['category']}</span>
            <p class="task-card-title">${element['title']}</p>
            <p class="task-card-description">${element['description']}</p>
            <div id="loadBarContainer${element['id']}" class="load-bar-container">
                <div class="load-bar">
                    <div id="loadBar${element['id']}" class="load-bar-progress" role="progressbar" style="width: 0%;"></div>
                </div>
                <span id="subTaskDone${element['id']}">${subTaskDone}/${element.subtasks.length} Subtasks</span>
            </div>
            <div class="task-card-footer">
            <div class="task-card-footer-container" id="taskCardFooter${element.id}" >
            </div>
            <img id="prioImg${element.id}" src="../assets/img/plus_dark.png" alt="">
            </div>
        </div> 
    `;
}


/**
 * Generates the HTML for a big todo task card.
 *
 * @param {Object} element - The element object containing the task details.
 * @return {string} The HTML code for the big todo task card.
 */
function generateBigTodoHTML(element) {
    return /*html*/`
        <div id="bigTaskContainer" class="task-big-card">
            <div class="big-task-card-header">
                <div id="taskBigCardCategory${element['id']}" class="big-task-card-category">${element['category']}</div>
                <img onclick="showBigTodoHTML()" class="task-big-card-close" src="../assets/img/board_close.png" alt="">
            </div>
            <span class="big-task-card-title">${element['title']}</span>
            <span class="big-task-card-description">${element['description']}</span>
            <div class="container">
                <div class="item item-text">Due date:</div>
                <div class="item">${element['date']}</div>
                <div class="item item-text">Priority:</div>
                <div class="item">
                    <span>${element['priority']}</span>
                    <img id="prioBigImg${element.id}" src="../assets/img/equal_orange.png" alt="">
                </div>
            </div>
            <div style="height: auto;">
                <p>Assigned To:</p>
                <br>
                <div class="big-task-card-contacts-generate" id="bigTaskCardContactsContainer"></div>
            </div>
            <p>Subtasks</p>
            <br>
            <div id="btcFooterInput" class="btc-footer-input"></div>
            <div class="big-task-card-footer">
                <div class="big-task-card-footer-container">
            </div>
            <img onclick="deleteTask(${element.id})" class="btc-footer-img-delete" src="../assets/img/delete_default.png" alt="">
            <img src="../assets/img/big_card_separator.png" alt="">
            <img onclick="editTask(${element.id})" class="btc-footer-img-edit" src="../assets/img/edit_default.png" alt="">
        </div>
    `;
}


/**
 * Generates the HTML code for a big todo task card assigned to contact section.
 *
 * @param {Object} element - The element object containing the contact details.
 * @param {string} letters - The letters of the contact's name.
 * @return {string} The HTML code for the big todo task card assigned to contact section.
 */
function generateBigTodoAssignedToHTML(element, letters) {
    return /*html*/`
        <div class="big-task-card-contacts">
            <div style="background-color: ${element['color']}" class="task-card-footer-contacts con">${letters}</div>
            <span>${element['name']}</span>
        <div>
    `;
}


/**
 * Generates the HTML for the subtasks of a big todo item.
 *
 * @param {number} j - The index of the subtask.
 * @param {string} subTaskCompleted - The image source for completed subtasks.
 * @param {Object} element - The big todo item object.
 * @return {string} The HTML code for the subtasks of a big todo item.
 */
function generateBigTodoSubTasksHTML(j, subTaskCompleted, element) {
    return /*html*/`
        <div class="btc-footer-input-content">
            <img id="btcFooterImg${j}" onclick="completedSubTask(${element.id}, ${j})" src="${subTaskCompleted}" alt="">
            <span>${element.subtasks[j].subtask}</span>
        </div>
    `
}