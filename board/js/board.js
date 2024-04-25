let currentDraggedElement;
let currentIndex;
let editId;


/**
 * Initializes the board functionality.
 *
 * This function performs the following steps:
 * 1. Calls the `getCurrentDate` function to get the current date.
 * 2. Calls the `includeHTML` function asynchronously to include HTML.
 * 3. Calls the `loadData` function asynchronously to load data.
 * 4. Calls the `initTemplate` function asynchronously to initialize the template.
 * 5. Calls the `updateHTML` function to update the HTML.
 * 6. Removes the 'boardStatus' item from the local storage.
 *
 * @return {Promise<void>} A promise that resolves when the board initialization is complete.
 */
async function initBoard() {
    getCurrentDate();
    await includeHTML();
    await loadData();
    await initTemplate();
    updateHTML();
    localStorage.removeItem('boardStatus');
    updateContainerHeights();
}


/**
 * Updates the HTML for each task status.
 *
 * @return {void} This function does not return anything.
 */
function updateHTML() {
    let taskStatus = ['todo', 'inProgress', 'awaitFeedback', 'done'];
    taskStatus.forEach(status => {

        updateHTMLLoop(status);
    });
}


/**
 * Updates the HTML for a specific task status.
 *
 * @param {string} status - The status of the tasks to update.
 * @return {void} This function does not return anything.
 */
function updateHTMLLoop(status) {
    let taskStatus = tasks.filter(task => task['status'] === status);
    document.getElementById(status).innerHTML = '';
    if (taskStatus.length === 0) {
        document.getElementById(status).innerHTML = generateNoTasksToDo();
    }
    for (let i = 0; i < taskStatus.length; i++) {
        const element = taskStatus[i];
        let subTaskDone = doneSubTasks(element.id);
        document.getElementById(status).innerHTML += generateTodoHTML(element, subTaskDone);
        updateHTMLFunctions(element, subTaskDone);
    }
}


/**
 * Updates the HTML elements related to a task based on its status and subtask completion.
 *
 * @param {Object} element - The task object containing the necessary information.
 * @param {number} subTaskDone - The number of completed subtasks for the task.
 * @return {void} This function does not return anything.
 */
function updateHTMLFunctions(element, subTaskDone) {
    subTaskProgressBar(element, subTaskDone)
    generateContacts(element)
    changePriority(element)
    changeCategoryColor(element.id);
}


/**
 * Updates the progress bar for a given subtask.
 *
 * @param {Object} element - The task object containing the subtasks.
 * @param {number} subTaskDone - The number of completed subtasks.
 * @return {void} This function does not return anything.
 */
function subTaskProgressBar(element, subTaskDone) {
    let loadWidth = subTaskDone === 0 ? 0 : 100 / element.subtasks.length * subTaskDone;
    document.getElementById(`loadBar${element['id']}`).style.width = `${loadWidth}%`;
    if (element.subtasks.length === 0) {
        document.getElementById(`loadBarContainer${element['id']}`).style.display = 'none';
    } else {
        document.getElementById(`loadBarContainer${element['id']}`).style = '';
    }
}


/**
 * Generates the contacts section for a task card footer based on the assigned contacts of the given element.
 *
 * @param {Object} element - The task object containing the assigned contacts.
 * @return {void} This function does not return anything.
 */
function generateContacts(element) {
    let taskCardFooter = document.getElementById(`taskCardFooter${element.id}`);
    for (let j = 0; j < element.assignedTo.length; j++) {
        const contacts = element.assignedTo[j];
        const letters = lettersOfName(contacts.name)
        doneSubTasks(element.id)
        taskCardFooter.innerHTML += `<div class="footer-names"><div style="background-color: ${contacts.color}" class="task-card-footer-contacts">${letters}</div></div>`;
    }

}


/**
 * Searches for tasks based on the input in the specified container.
 *
 * @param {string} container - The ID of the container element.
 * @return {void} This function does not return anything.
 */
function searchTasks(container) {
    let searchTasks = document.getElementById(container);
    tasks.forEach(task => {
        document.getElementById(task['status']).innerHTML = '';
        let filteredTasks = tasks.filter(task => task['title'].toLowerCase().includes(searchTasks.value.toLowerCase()) || task['description'].toLowerCase().includes(searchTasks.value.toLowerCase()));
        filteredTasks.forEach(task => {
            searchTasksHTML(task);
        })
        searchTasksHTMLGenerate(task);
    })
    if (searchTasks.value.length === 0) {
        updateHTML();
    }
}


/**
 * Updates the HTML elements related to a task based on its status and subtask completion.
 *
 * @param {Object} task - The task object to update the HTML for.
 * @return {void} This function does not return anything.
 */
function searchTasksHTML(task) {
    document.getElementById(task['status']).innerHTML = '';
    let subTaskDone = doneSubTasks(task.id);
    document.getElementById(task['status']).innerHTML += generateTodoHTML(task, subTaskDone);
    subTaskProgressBar(task, subTaskDone);
    changePriority(task);
    changeCategoryColor(task.id);
    generateContacts(task);
}


/**
 * Generates the HTML content for a task if it is empty.
 *
 * @param {Object} task - The task object to generate HTML for.
 * @return {void} This function does not return anything.
 */
function searchTasksHTMLGenerate(task) {
    if (document.getElementById(task['status']).innerHTML === '') {
        document.getElementById(task['status']).innerHTML = generateNoTasksToDo();
    }
}


/**
 * Returns the initials of a given name.
 *
 * @param {string} name - The name to extract initials from.
 * @return {string} The initials of the name, with each word's first letter capitalized and concatenated.
 */
function lettersOfName(name) {
    return name.split(' ').map(word => word[0].toUpperCase()).join('');
}


/**
 * Starts the dragging process for a given element with the specified ID.
 *
 * @param {string} id - The ID of the element to start dragging.
 * @return {void} This function does not return anything.
 */
function startDragging(id) {
    currentDraggedElement = id;
    currentIndex = tasks.findIndex(task => task.id === id);
    document.getElementById(tasks[currentIndex].id).classList.add('dragging')
}


/**
 * Changes the background color of the category element based on its innerHTML value.
 *
 * @param {number} id - The id of the category element.
 * @return {void} This function does not return anything.
 */
function changeCategoryColor(id) {
    let category = document.getElementById(`taskCardCategory${id}`);
    if (category.innerHTML === "User Story") {
        category.style.backgroundColor = '#0038FF';
    } else {
        category.style.backgroundColor = '#1FD7C1';
    }
}


/**
 * Changes the background color of the big category element based on its innerHTML value.
 *
 * @param {number} id - The id of the big category element.
 * @return {void} This function does not return anything.
 */
function changeBigCategoryColor(id) {
    let bigCategory = document.getElementById(`taskBigCardCategory${id}`);
    if (bigCategory.innerHTML === "User Story") {
        bigCategory.style.backgroundColor = '#0038FF';
    } else {
        bigCategory.style.backgroundColor = '#1FD7C1';
    }
}


/**
 * Changes the priority of an element and updates the corresponding image source.
 *
 * @param {Object} element - The element to change the priority for.
 * @return {void} This function does not return anything.
 */
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


/**
 * Generates the HTML content for displaying a message when there are no tasks to do.
 *
 * @return {string} The HTML content for the message.
 */
function generateNoTasksToDo() {
    return /*html*/`
        <div class="no-task-to-do">
            <span>No tasks To do</span>
        </div>
    `;
}


/**
 * Prevents the default behavior of the drag and drop event.
 *
 * @param {DragEvent} ev - The drag and drop event.
 * @return {void} This function does not return anything.
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * Moves a task to a specified category and updates the task list.
 *
 * @param {string} category - The category to move the task to.
 * @return {void} This function does not return anything.
 */
function moveTo(category) {
    if (tasks[currentIndex]['id'] === currentDraggedElement) {
        tasks[currentIndex]['status'] = category;
        if (loadPage('guest') === 'guest') {
            savePage('tasks', tasks);
        } else {
            setItem('tasks', tasks);
        }
    }
    document.getElementById('findTask').value = '';
    loadData();
    updateHTML();
    updateContainerHeights();
    removeHighlight(category);
}


/**
 * Updates the heights of containers to match the height of the tallest container.
 *
 * @return {void} This function does not return anything.
 */
function updateContainerHeights() {
  const containers = document.querySelectorAll('.tasks-drag-and-drop');
  let maxHeight = 0;
  containers.forEach(container => {
    container.style.height = 'auto';
    const containerHeight = container.clientHeight;
    if (containerHeight > maxHeight) {
      maxHeight = containerHeight;
    }
  });
  containers.forEach(container => {
    container.style.height = maxHeight + 'px';
  });
}


/**
 * Adds the 'drag-area-highlight' class to the element with the specified ID.
 *
 * @param {string} id - The ID of the element to highlight.
 * @return {void} This function does not return anything.
 */
function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}


/**
 * Removes the 'drag-area-highlight' class from the element with the specified ID.
 *
 * @param {string} id - The ID of the element to remove the highlight from.
 * @return {void} This function does not return anything.
 */
function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}