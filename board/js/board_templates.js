function generateTodoHTML(element) {
    return /*html*/`
        <div onclick="renderBigTodoHTML(${element['id']})" id="${element['id']}" draggable="true" ondragstart="startDragging(${element['id']})" class="task-card">
            <span class="task-card-category">${element['category']}</span>
            <p class="task-card-title">${element['title']}</p>
            <p class="task-card-description">${element['description']}</p>
            <div class="load-bar-container">
                <div id="loadBar" class="load-bar">
                <div id="loadBarProgress" class="load-bar-progress" role="progressbar" style="width: 0%;"></div>
                </div>
                <span>0/${element.subtasks.length} Subtasks</span>
            </div>
            <div class="task-card-footer">
            <div class="task-card-footer-container" id="taskCardFooter${element.id}" >
            </div>
            <img id="prioImg${element.id}" src="../assets/img/plus_dark.png" alt="">
            </div>
        </div> 
    `;
}


function generateBigTodoHTML(element) {
    return /*html*/`
        <div id="bigTaskContainer" class="task-big-card">
            <div class="big-task-card-header">
                <div class="big-task-card-category">
                    ${element['category']}
                </div>
                <img class="task-big-card-close" src="../assets/img/board_close.png" alt="">
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
                <div id="bigTaskCardContactsContainer"></div>
            </div>
            <p>Subtasks</p>
            <br>
            <div id="btcFooterInput" class="btc-footer-input"></div>
            <div class="big-task-card-footer">
                <div class="big-task-card-footer-container" id="taskCardFooter${element.id}">
            </div>
            <img class="btc-footer-img-delete" id="prioImg${element.id}" src="../assets/img/delete_default.png" alt="">
            <img src="../assets/img/big_card_separator.png" alt="">
            <img class="btc-footer-img-edit" src="../assets/img/edit_default.png" alt="">
        </div>
    `;
}


function generateBigTodoAssignedToHTML(element, letters) {
    return /*html*/`
        <div class="big-task-card-contacts">
            <div style="background-color: ${element['color']}" class="task-card-footer-contacts con">${letters}</div>
            <span>${element['name']}</span>
        <div>
    `;
}


function generateBigTodoSubTasksHTML(element, subTaskCompleted) {
    return /*html*/`
        <div class="btc-footer-input-content">
            <img src="${subTaskCompleted}" alt="">
            <span>${element.subtask}</span>
        </div>
    `
}