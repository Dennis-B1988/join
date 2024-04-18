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
    for (let index = 0; index < todo.length; index++) {
        const element = todo[index];
        document.getElementById('todo').innerHTML += generateTodoHTML(element);
    }

    let inProgress = tasks.filter(task => task['status'] == 'inProgress');
    document.getElementById('inProgress').innerHTML = '';
    if (inProgress.length === 0) {
        document.getElementById('inProgress').innerHTML = generateNoTasksToDo();
    }
    for (let index = 0; index < inProgress.length; index++) {
        const element = inProgress[index];
        document.getElementById('inProgress').innerHTML += generateTodoHTML(element);
    }


    let awaitFeedback = tasks.filter(task => task['status'] == 'awaitFeedback');
    document.getElementById('awaitFeedback').innerHTML = '';
    if (awaitFeedback.length === 0) {
        document.getElementById('awaitFeedback').innerHTML = generateNoTasksToDo();
    }
    for (let index = 0; index < awaitFeedback.length; index++) {
        const element = awaitFeedback[index];
        document.getElementById('awaitFeedback').innerHTML += generateTodoHTML(element);
    }

    let done = tasks.filter(task => task['status'] == 'done');
    document.getElementById('done').innerHTML = '';
    if (done.length === 0) {
        document.getElementById('done').innerHTML = generateNoTasksToDo();
    }
    for (let index = 0; index < done.length; index++) {
        const element = done[index];
        document.getElementById('done').innerHTML += generateTodoHTML(element);
    }
}

function startDragging(id) {
    currentDraggedElement = id;
    currentIndex = tasks.findIndex(task => task.id ===id);
    console.log(currentIndex)
}


function generateTodoHTML(element) {
    return /*html*/`
        <div  draggable="true" ondragstart="startDragging(${element['id']})" class="task-card">
            <span class="task-card-category">${element['category']}</span>
            <p class="task-card-title">${element['title']}</p>
            <p class="task-card-description">${element['description']}</p>
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