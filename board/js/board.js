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
            generateContacts(element)
            changePriority(element)
        }
    });
    changeCategoryColor()
}
function generateContacts(element) {
    let taskCardFooter = document.getElementById(`taskCardFooter${element.id}`);
    for (let j = 0; j < element.assignedTo.length; j++) {
        const contacts = element.assignedTo[j];
        const letters = lettersOfName(contacts.name)
        taskCardFooter.innerHTML += `<div class="footer-names"><div style="background-color: ${contacts.color}" class="task-card-footer-contacts">${letters}</div></div>`;
    }

}
function searchTasks() {
    let searchTasks = document.getElementById('findTask');
    tasks.forEach(task => {
        document.getElementById(task['status']).innerHTML = '';
        let filteredTasks = tasks.filter(task => task['title'].toLowerCase().includes(searchTasks.value.toLowerCase()) || task['description'].toLowerCase().includes(searchTasks.value.toLowerCase()));
        filteredTasks.forEach(task => {
            document.getElementById(task['status']).innerHTML = '';
            document.getElementById(task['status']).innerHTML += generateTodoHTML(task);
            changePriority(task)
            changeCategoryColor()
            generateContacts(task)
        })
        if (document.getElementById(task['status']).innerHTML === '') {
            document.getElementById(task['status']).innerHTML = generateNoTasksToDo();
        }
    })
    if (searchTasks.value.length === 0) {
        updateHTML();
    }
}

function lettersOfName(name) {
    return name.split(' ').map(word => word[0].toUpperCase()).join('');
}

function startDragging(id) {
    currentDraggedElement = id;
    currentIndex = tasks.findIndex(task => task.id === id);
    console.log(tasks[currentIndex].id)
    document.getElementById(tasks[currentIndex].id).classList.add('dragging')
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
function changePriority(element) {
    let priority = document.getElementById(`prioImg${element.id}`);
    if (element['priority'] === "Low") {
        priority.src = '../assets/img/low_green.png';
    } else if (element['priority'] === "Medium") {
        priority.src = '../assets/img/equal_orange.png';
    } else {
        priority.src = '../assets/img/urgent_red.png';
    }
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
    document.getElementById('findTask').value = '';
    loadData();
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


function showBigTodoHTML() {
    document.getElementById('bigTaskContainerBackground').classList.toggle('show-big-background');
    setTimeout(() => {
        document.getElementById('bigTaskContainer').classList.toggle('show-big-add-task');
    }, 10);
}


function renderBigTodoHTML(id) {
    let element = tasks.filter(task => task['id'] === id)[0];
    console.log(element)
    document.getElementById('bigTaskContainerBackground').innerHTML = generateBigTodoHTML(element);
    changeBigPriority(element);
    for (let i = 0; i < element.assignedTo.length; i++) {
        const assignedContacts = element.assignedTo[i];
        let letters = lettersOfName(assignedContacts.name);
        document.getElementById('bigTaskCardContactsContainer').innerHTML += generateBigTodoAssignedToHTML(assignedContacts, letters);
    }
    for (let j = 0; j < element.subtasks.length; j++) {
        const subTask = element.subtasks[j];
        let subTaskCompleted = subTask.completed ? '../assets/img/board_check_button.png' : '../assets/img/board_check_ectangle.png';
        document.getElementById('btcFooterInput').innerHTML += generateBigTodoSubTasksHTML(subTask, subTaskCompleted);
    }
    showBigTodoHTML();
}


function changeBigPriority(element) {
    let priority = document.getElementById(`prioBigImg${element.id}`);
    if (element['priority'] === "Low") {
        priority.src = '../assets/img/low_green.png';
    } else if (element['priority'] === "Medium") {
        priority.src = '../assets/img/equal_orange.png';
    } else {
        priority.src = '../assets/img/urgent_red.png';
    }
}


function openOrCloseBigBoard(event, id) {
    if (event.target.id === id) {
        showBigTodoHTML();
    }
}


function openOrCloseBigAddTask(event, id) {
    if (event.target.id === id) {
        showAddTask();
    }
}