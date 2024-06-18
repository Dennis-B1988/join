/**
 * Creates a task board with the specified status.
 *
 * @param {string} status - The status of the task board.
 * @return {undefined} This function does not return a value.
 */
function createTaskBoard(status) {
    taskStatus = status;
    showAddTask();
}


/**
 * Toggles the visibility of the add task container and background, and clears the task form.
 *
 * @return {void} This function does not return a value.
 */
function showAddTask() {
    document.getElementById('backgroundAddTask').classList.toggle('show-background');
    document.getElementById('addTaskContainer').classList.toggle('show-add-task');
    clearTaskForm();
}


/**
 * Toggles the visibility of the big task container and background, and animates the transition.
 *
 * @return {void} This function does not return a value.
 */
function showBigTodoHTML() {
    document.getElementById('bigTaskContainerBackground').classList.toggle('show-big-background');
    setTimeout(() => {
        document.getElementById('bigTaskContainer').classList.toggle('show-big-add-task');
    }, 10);
}


/**
 * Renders the HTML for a big todo item based on the provided ID.
 *
 * @param {number} id - The ID of the todo item.
 * @return {void} This function does not return a value.
 */
function renderBigTodoHTML(id) {
    let element = tasks.filter(task => task['id'] === id)[0];
    document.getElementById('bigTaskContainerBackground').innerHTML = generateBigTodoHTML(element);
    changeBigPriority(element);
    changeBigCategoryColor(element.id);
    renderBigTodoAssigned(element);
    renderBigSubTasks(element);
    showBigTodoHTML();
}


/**
 * Renders the HTML for the assigned contacts of a big todo item.
 *
 * @param {Object} element - The big todo item object.
 * @return {void} This function does not return a value.
 */
function renderBigTodoAssigned(element) {
    for (let i = 0; i < element.assignedTo.length; i++) {
        const assignedContacts = element.assignedTo[i];
        let letters = lettersOfName(assignedContacts.name);
        document.getElementById('bigTaskCardContactsContainer').innerHTML += generateBigTodoAssignedToHTML(assignedContacts, letters);
    }
}


/**
 * Renders the HTML for the subtasks of a big todo item.
 *
 * @param {Object} element - The big todo item object.
 * @return {void} This function does not return a value.
 */
function renderBigSubTasks(element) {
    for (let j = 0; j < element.subtasks.length; j++) {
        const subTask = element.subtasks[j];
        let subTaskCompleted = subTask.completed ? '../assets/img/board_check_button.png' : '../assets/img/board_check_ectangle.png';
        document.getElementById('btcFooterInput').innerHTML += generateBigTodoSubTasksHTML(j, subTaskCompleted, element);
    }
}


/**
 * Changes the priority of a big element and updates the corresponding image source.
 *
 * @param {Object} element - The element to change the priority for.
 * @return {void} This function does not return a value.
 */
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


/**
 * Toggles the visibility of the big board based on the event target ID.
 *
 * @param {Event} event - The event that triggered the function.
 * @param {string} id - The ID to compare with the event target ID.
 * @return {void}
 */
function openOrCloseBigBoard(event, id) {
    if (event.target.id === id) {
        showBigTodoHTML();
    }
}


/**
 * Toggles the visibility of the big add task form based on the event target ID.
 *
 * @param {Event} event - The event that triggered the function.
 * @param {string} id - The ID to compare with the event target ID.
 * @return {void}
 */
function openOrCloseBigAddTask(event, id) {
    let changeName = document.getElementById('changeName');
    if (event.target.id === id) {
        showAddTask();
        if (changeName.innerHTML === 'Ok') {
            toggleCSS();
            document.getElementById('taskCategory').style.pointerEvents = '';
        }
    }
}


/**
 * Deletes a task with the specified ID from the tasks list.
 *
 * @param {number} id - The ID of the task to be deleted.
 * @return {void}
 */
function deleteTask(id) {
    tasks.forEach(task => {
        if (task['id'] === id) {
            tasks.splice(tasks.indexOf(task), 1);
        }
    })
    if (loadPage('guest') === 'guest') {
        savePage('tasks', tasks);
    } else {
        setItem('tasks', tasks);
    }
    loadData();
    updateHTML();
    showBigTodoHTML();
}


/**
 * Calculates the number of completed subtasks for a given task ID.
 *
 * @param {number} id - The ID of the task.
 * @return {number} The number of completed subtasks.
 */
function doneSubTasks(id) {
    let subTasks = tasks.filter(task => task['id'] === id)[0].subtasks;
    return subTasks.filter(subTask => subTask['completed'] === true).length
}


/**
 * Toggles the completion status of a subtask with the given id and index.
 *
 * @param {number} id - The id of the task containing the subtask.
 * @param {number} j - The index of the subtask to toggle.
 * @return {Promise<void>} A promise that resolves when the task is toggled.
 */
async function completedSubTask(id, j) {
    tasks.forEach(task => {
        if (task.id === id) {
            task.subtasks[j].completed = !task.subtasks[j].completed;
        }
    })
    if (loadPage('guest') === 'guest') {
        savePage('tasks', tasks);
    } else {
        setItem('tasks', tasks);
    }
    tasks.forEach(task => {
        completedSubTaskChecked(task, id);
    })
}


/**
 * Updates the HTML elements related to a completed subtask.
 *
 * @param {Object} task - The task object containing the subtask.
 * @param {number} id - The id of the task containing the subtask.
 * @return {void} This function does not return anything.
 */
function completedSubTaskChecked(task, id) {
    if (task.id === id) {
        let subTaskDone = doneSubTasks(task.id);
        subTaskProgressBar(task, subTaskDone);
        task.subtasks.forEach((subTask, j) => {
            let subTaskCompleted = subTask.completed ? '../assets/img/board_check_button.png' : '../assets/img/board_check_ectangle.png';
            document.getElementById(`btcFooterImg${j}`).src = subTaskCompleted;
        })
        document.getElementById(`subTaskDone${task['id']}`).innerHTML = `${subTaskDone}/${task.subtasks.length} Subtasks`;
    }
}


/**
 * Toggles the CSS classes and innerHTML of certain elements based on the current value of the 'changeName' element.
 *
 * @return {void} This function does not return anything.
 */
function toggleCSS() {
    let disableCssData = document.querySelectorAll('.disableCssData');
    let enableCssData = document.querySelectorAll('.enableCssData');
    let changeName = document.getElementById('changeName');
    if (changeName.innerHTML === "Create Task") {
        changeName.innerHTML = "Ok";
    } else {
        changeName.innerHTML = "Create Task";
    }
    disableCssData.forEach(disable => disable.disabled = !disable.disabled);
    enableCssData.forEach(enable => enable.disabled = !enable.disabled);
}


/**
 * Edits a task based on the provided ID.
 *
 * @param {number} id - The ID of the task to edit.
 * @return {void} This function does not return anything.
 */
function editTask(id) {
    document.getElementById('taskCategory').style.pointerEvents = 'none';
    editId = id;
    let taskTitle = document.getElementById('task-title');
    let taskDescription = document.getElementById('task-description');
    let taskDate = document.getElementById('task-date');
    let taskCategory = document.getElementById('task-category');
    showBigTodoHTML();
    showAddTask();
    toggleCSS();
    let currentTask = tasks.filter(task => task['id'] === id)[0];
    checkTaskSubtasks(currentTask, tasks);
    checkEditValues(taskTitle, taskDescription, taskDate, taskCategory, currentTask);
    editPushSubtasks(currentTask);
}


/**
 * Checks the subtasks of a given task and adds any missing subtasks to the assignedUsers array.
 *
 * @param {Object} currentTask - The task object to check subtasks for.
 * @param {Array} tasks - An array of task objects to check against.
 * @return {void} This function does not return anything.
 */
function checkTaskSubtasks(currentTask, tasks) {
    currentTask['assignedTo'].forEach(subTask => {
        if (tasks.includes(subTask)) {
            return;
        } else {
            assignedUsers.push(subTask);
        }
    })
}


/**
 * Iterates over the subtasks of the current task, pushing each subtask into an array and updating the HTML content of the task subtasks list.
 *
 * @param {Object} currentTask - The task object whose subtasks are being processed.
 * @return {void} This function does not return anything.
 */
function editPushSubtasks(currentTask) {
    currentTask.subtasks.forEach((subTask, i) => {
        subtaskArray.push(subTask);
        document.getElementById('task-subtasks-list').innerHTML += addSubtaskList(subTask, i);
    })
}


/**
 * Sets the values of the taskTitle, taskDescription, taskDate, and taskCategory input fields 
 * based on the provided currentTask object. Also calls the displayUsers() function and 
 * the checkPriority() function.
 *
 * @param {HTMLElement} taskTitle - The input field for the task title.
 * @param {HTMLElement} taskDescription - The input field for the task description.
 * @param {HTMLElement} taskDate - The input field for the task date.
 * @param {HTMLElement} taskCategory - The input field for the task category.
 * @param {Object} currentTask - The object containing the current task's information.
 */
function checkEditValues(taskTitle, taskDescription, taskDate, taskCategory, currentTask) {
    taskTitle.value = currentTask['title'];
    taskDescription.value = currentTask['description'];
    displayUsers();
    taskDate.value = currentTask['date'];
    checkPriority(currentTask);
    taskCategory.value = currentTask['category'];
}


/**
 * Checks the priority of a given task and calls the corresponding priority change function.
 *
 * @param {Object} currentTask - The task object to check the priority of.
 * @return {void} This function does not return anything.
 */
function checkPriority(currentTask) {
    if (currentTask['priority'] === "Low") {
        low = false;
        changePriorityLow();
    }
    if (currentTask['priority'] === "Medium") {
        medium = false;
        changePriorityMedium();
    }
    if (currentTask['priority'] === "Urgent") {
        urgent = false;
        changePriorityUrgent();
    }
}


/**
 * Saves the edited task by updating its values and priority, then updates the local storage, reloads data, and updates the HTML display.
 *
 * @return {Promise<void>} This function does not return anything explicitly.
 */
async function saveEditTask() {
    let taskTitle = document.getElementById('task-title');
    let taskDescription = document.getElementById('task-description');
    let taskDate = document.getElementById('task-date');
    let taskCategory = document.getElementById('task-category');
    let currentTask = tasks.filter(task => task['id'] === editId)[0];
    saveEditValues(currentTask, taskTitle, taskDescription, taskDate, taskCategory);
    updatePriorityOnSave(currentTask);
    if (loadPage('guest') === 'guest') {
        savePage('tasks', tasks);
    } else {
        setItem('tasks', tasks);
    }
    await loadData();
    updateHTML();
}


/**
 * Updates the values of the currentTask object with the provided taskTitle, taskDescription, taskDate, and taskCategory.
 *
 * @param {Object} currentTask - The task object to update.
 * @param {HTMLElement} taskTitle - The input field for the task title.
 * @param {HTMLElement} taskDescription - The input field for the task description.
 * @param {HTMLElement} taskDate - The input field for the task date.
 * @param {HTMLElement} taskCategory - The input field for the task category.
 */
function saveEditValues(currentTask, taskTitle, taskDescription, taskDate, taskCategory) {
    currentTask['title'] = taskTitle.value;
    currentTask['description'] = taskDescription.value;
    currentTask['assignedTo'] = assignedUsers;
    currentTask['date'] = taskDate.value;
    currentTask['category'] = taskCategory.value;
    currentTask['subtasks'] = subtaskArray;
}


/**
 * Updates the priority of a task when it is saved.
 *
 * @param {Object} currentTask - The task object to update the priority of.
 * @return {void} This function does not return anything.
 */
function updatePriorityOnSave(currentTask) {
    if (medium) {
        currentTask['priority'] = "Medium";
    }
    if (urgent) {
        currentTask['priority'] = "Urgent";
    }
    if (low) {
        currentTask['priority'] = "Low";
    }
}


/**
 * Handles the submission or editing of a task. If the task is being created, it calls the `onSubmit` function,
 * shows the add task form, updates the HTML, and returns. If the task is being edited, it calls the
 * `changeToNormalTaskView` function, toggles the CSS, shows the big todo HTML, shows the add task form,
 * renders the big todo HTML with the edit ID, and shows the big todo HTML again.
 *
 * @return {void} This function does not return anything.
 */
function onSubmitOrEditTask() {
    let changeName = document.getElementById('changeName');
    if (changeName.innerHTML === "Create Task") {
        onSubmit();
        showAddTask();
        updateHTML();
    } else {
        changeToNormalTaskView();
    }
}


/**
 * Saves the edited task, toggles the CSS, shows the big todo HTML, shows the add task form,
 * renders the big todo HTML with the edit ID, and shows the big todo HTML again.
 *
 * @return {void} This function does not return anything.
 */
function changeToNormalTaskView() {
    document.getElementById('taskCategory').style.pointerEvents = '';
    saveEditTask();
    toggleCSS();
    showBigTodoHTML();
    showAddTask();
    renderBigTodoHTML(editId);
    showBigTodoHTML();
}


/**
 * Redirects to the task page with the specified board status.
 *
 * @param {string} boardStatus - The status of the board.
 * @return {void} This function does not return a value.
 */
function redirectToTaskPage(boardStatus) {
    savePage('boardStatus', boardStatus);
    window.location.href = "../add_task/add_task.html";
}