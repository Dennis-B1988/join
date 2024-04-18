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
    let todo = tasks.filter(task => task['status'] === 'todo');
    document.getElementById('todo').innerHTML = '';
    if (todo.length === 0) {
        document.getElementById('todo').innerHTML = generateNoTasksToDo();
    }
    for (let i = 0; i < todo.length; i++) {
        const element = todo[i];
        document.getElementById('todo').innerHTML += generateTodoHTML(element,i);
        let taskCardFooter = document.getElementById(`taskCardFooter${i}`);
        for (let j = 0; j < element.assignedTo.length; j++) {
            const contacts = element.assignedTo[j];
            const letters = lettersOfName(contacts.name)
            taskCardFooter.innerHTML += `<div><div class="task-card-footer-contacts">${letters}</div></div>`;
        }
    }

    let inProgress = tasks.filter(task => task['status'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';
    if (inProgress.length === 0) {
        document.getElementById('inProgress').innerHTML = generateNoTasksToDo();
    }
    for (let i = 0; i < inProgress.length; i++) {
        const element = inProgress[i];
        document.getElementById('inProgress').innerHTML += generateTodoHTML(element,i);
        let taskCardFooter = document.getElementById(`taskCardFooter${i}`);
        for (let j = 0; j < element.assignedTo.length; j++) {
            const contacts = element.assignedTo[j];
            const letters = lettersOfName(contacts.name)
            taskCardFooter.innerHTML += `<div><div class="task-card-footer-contacts">${letters}</div></div>`;
        }
    }


    let awaitFeedback = tasks.filter(task => task['status'] == 'awaitFeedback');
    document.getElementById('awaitFeedback').innerHTML = '';
    if (awaitFeedback.length === 0) {
        document.getElementById('awaitFeedback').innerHTML = generateNoTasksToDo();
    }
    for (let i = 0; i < awaitFeedback.length; i++) {
        const element = awaitFeedback[i];
        document.getElementById('awaitFeedback').innerHTML += generateTodoHTML(element,i);
        let taskCardFooter = document.getElementById(`taskCardFooter${i}`);
        for (let j = 0; j < element.assignedTo.length; j++) {
            const contacts = element.assignedTo[j];
            const letters = lettersOfName(contacts.name)
            taskCardFooter.innerHTML += `<div><div class="task-card-footer-contacts">${letters}</div></div>`;
        }
    }

    let done = tasks.filter(task => task['status'] == 'done');
    document.getElementById('done').innerHTML = '';
    if (done.length === 0) {
        document.getElementById('done').innerHTML = generateNoTasksToDo();
    }
    for (let i = 0; i < done.length; i++) {
        const element = done[i];
        document.getElementById('done').innerHTML += generateTodoHTML(element,i);
        let taskCardFooter = document.getElementById(`taskCardFooter${i}`);
        for (let j = 0; j < element.assignedTo.length; j++) {
            const contacts = element.assignedTo[j];
            const letters = lettersOfName(contacts.name)
            taskCardFooter.innerHTML += `<div><div class="task-card-footer-contacts">${letters}</div></div>`;
        }
    }
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
function changeCategoryColor(){
    let category = document.querySelectorAll('.task-card-category');
    category.forEach(cate => {
        if (cate.innerHTML === "User Story") {
            cate.style.backgroundColor = '#1FD7C1';
        }else{
            cate.style.backgroundColor = '#0038FF';
        }
    })
}

function generateTodoHTML(element,i) {
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
            <div id="taskCardFooter${i}" class="task-card-footer">
                
                

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