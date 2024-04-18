async function initBoard() {
    await includeHTML();
    await loadData();
    await initTemplate();
    updateHTML();
    console.log(tasks)
}


let currentDraggedElement;
let currentIndex;

function updateHTML() {
    let taskStatus = ['todo', 'inProgress', 'awaitFeedback', 'done'];
    taskStatus.forEach(status => {
        let taskStatus = tasks.filter(task => task['status'] === status);
        document.getElementById(status).innerHTML = '';
        if (taskStatus.length === 0) {
            document.getElementById(status).innerHTML = generateNoTasksToDo();
        }
        for (let i = 0; i < taskStatus.length; i++) {
            const element = taskStatus[i];
            document.getElementById(status).innerHTML += generateTodoHTML(element);
            let taskCardFooter = document.getElementById(`taskCardFooter${element.id}`);
            for (let j = 0; j < element.assignedTo.length; j++) {
                const contacts = element.assignedTo[j];
                const letters = lettersOfName(contacts.name)
                taskCardFooter.innerHTML += `<div class="footer-names"><div style="background-color: ${contacts.color}" class="task-card-footer-contacts">${letters}</div></div>`;
            }
        }
    });
    changeCategoryColor()
}


function lettersOfName(name) {
    return name.split(' ').map(word => word[0].toUpperCase()).join('');
}

function startDragging(id) {
    currentDraggedElement = id;
    currentIndex = tasks.findIndex(task => task.id === id);
    console.log(currentIndex)
}
function changeCategoryColor() {
    let category = document.querySelectorAll('.task-card-category');
    category.forEach(cate => {
        if (cate.innerHTML === "User Story") {
            cate.style.backgroundColor = '#1FD7C1';
        } else {
            cate.style.backgroundColor = '#0038FF';
        }
    })
}
// function changePrioColor(){
//     let prioColor = document.getElementById('.prioImg');
//     prioColor.forEach(prico => {
//         if (prico.innerHTML === "low") {
//             prico.style.backgroundColor = '#1FD7C1';
//         }else{
//             prico.style.backgroundColor = '#0038FF';
//         }
//     })
// }

function generateTodoHTML(element) {
    return /*html*/`
        <div  draggable="true" ondragstart="startDragging(${element['id']})" class="task-card">
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
            <div class="task-card-footer1" id="taskCardFooter${element.id}" >
            </div>
            <img id="prioImg" src="../assets/img/plus_dark.png" alt="">
            </div>
        </div> 
    `;
}


function generateNoTasksToDo() {
    return /*html*/`
        <div class="no-task-to-do">
            <span>No tasks To do</span>
        </div>
    `;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    if (tasks[currentIndex]['id'] === currentDraggedElement) {
        tasks[currentIndex]['status'] = category;
        setItem('tasks', tasks);
    }
    updateHTML();
    removeHighlight(category);
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}


function showAddTask() {
    document.getElementById('backgroundAddTask').classList.toggle('show-background');
    document.getElementById('addTaskContainer').classList.toggle('show-add-task');
}