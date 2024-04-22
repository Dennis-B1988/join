let urgent = false;
let medium = true;
let low = false;
let priority = null;
let categoryList = ['Technical Task', 'User Story'];
let subtaskArray = [];
let assignedUsers = [];

async function initTasks() {
  getCurrentDate();
  await includeHTML();
  await loadData();
  await initTemplate();
  createUserList();
  
}

/**
 * Handles form submission by retrieving input values and calling relevant functions based on conditions.
 *
 * @return {void} This function does not return anything.
 */
function onSubmit() {
  let title = document.getElementById('task-title').value;
  let description = document.getElementById('task-description').value;
  let date = document.getElementById('task-date').value;
  let category = document.getElementById('task-category').value;
  taskPriority();
  if (title && date && category !== '') {
    submitSuccess(title, description, date, category, priority, subtaskArray);
    taskSuccess();
  } else {
    formFilled(title, date, category);
  }
}

/**
 * Displays a success message and redirects to the board page after a short delay.
 *
 * @return {void} This function does not return anything.
 */
function taskSuccess() {
  document.querySelector('.task-added-to-board').classList.add('show-add-task');
  setTimeout(() => {
    document.location.href = '../board/board.html';
    document.querySelector('.task-added-to-board').classList.remove('show-add-task');
  }, 1500);
}

/**
 * Adds a new task to the tasks array, saves it to local storage, and clears the task form.
 *
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} date - The date of the task.
 * @param {string} category - The category of the task.
 * @param {string} priority - The priority of the task.
 * @param {string[]} subtaskArray - An array of subtasks for the task.
 * @return {void} This function does not return anything.
 */
function submitSuccess(title, description, date, category, priority, subtaskArray) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  tasks.push({
    "id": currentTimestamp,
    "title": title,
    "description": description,
    "assignedTo": assignedUsers,
    "date": date,
    "priority": priority,
    "category": category,
    "subtasks": subtaskArray,
    "status": 'todo',
  });
  if (loadPage('guest') === 'guest') {
    savePage('tasks', tasks);
  } else {
    setItem('tasks', tasks);
  }
  clearTaskForm();
}

/**
 * Checks if the title, date, or category input fields are empty and applies red border and error message if so.
 *
 * @param {string} title - The value of the title input field.
 * @param {string} date - The value of the date input field.
 * @param {string} category - The value of the category input field.
 * @return {void} This function does not return anything.
 */
function formFilled(title, date, category) {
  if (title == '') {
    document.getElementById('title-required').style.color = '#FCA7B1';
    document.getElementById('task-title').style.borderColor = '#FCA7B1';
  }
  if (date == '') {
    document.getElementById('date-required').style.color = '#FCA7B1';
    document.getElementById('task-date').style.borderColor = '#FCA7B1';
  }
  if (category == '') {
    document.getElementById('category-required').style.color = '#FCA7B1';
    document.getElementById('task-category').style.borderColor = '#FCA7B1';
  }
}

/**
 * Clears the task form by resetting the form elements and clearing the subtask list.
 * Also resets the styling of the required fields and unchecks all checkboxes.
 *
 * @return {void} This function does not return anything.
 */
function clearTaskForm() {
  document.getElementById("add-task-form").reset();
  document.getElementById("task-subtasks-list").innerHTML = '';
  document.getElementById("title-required").style.color = '#f6f7f8';
  document.getElementById("date-required").style.color = '#f6f7f8';
  document.getElementById("category-required").style.color = '#f6f7f8';
  document.getElementById("task-title").style.borderColor = '#d1d1d1';
  document.getElementById("task-date").style.borderColor = '#d1d1d1';
  document.getElementById("task-category").style.borderColor = '#d1d1d1';
  uncheckAll();
  subtaskCount = 0;
  subtaskArray = [];
}

/**
 * Generates the current date and sets it as the minimum value for the task date input field.
 *
 * @return {void} 
 */
function getCurrentDate() {
  let currentDate = new Date();
  let formattedDate = currentDate.getFullYear() + "-" + padZeroes(currentDate.getMonth() + 1) + "-" + padZeroes(currentDate.getDate());

  document.getElementById("task-date").min = formattedDate;

  function padZeroes(num) {
    return num < 10 ? '0' + num : num;
  }
}

/**
 * Sets the style for the urgent priority.
 *
 * @return {undefined} No return value.
 */
function urgentStyle() {
  urgentChangeClasses();
  document.getElementById('urgent').style.background = '#FF3D00'
  document.getElementById('urgent').style.color = '#FFFFFF'
  document.getElementById('urgent-img').src = '../assets/img/urgent_white.png';
  mediumDisable();
  lowDisable();
}

/**
 * Sets the style for the medium priority.
 *
 * @return {undefined} No return value.
 */
function mediumStyle() {
  mediumChangeClasses();
  document.getElementById('medium').style.background = '#FFA800'
  document.getElementById('medium').style.color = '#FFFFFF'
  document.getElementById('medium-img').src = '../assets/img/equal_white.png';
  urgentDisable();
  lowDisable();
}

/**
 * Sets the style for the low priority.
 *
 * @return {undefined} No return value.
 */
function lowStyle() {
  lowChangeClasses();
  document.getElementById('low').style.background = '#7AE229'
  document.getElementById('low').style.color = '#FFFFFF'
  document.getElementById('low-img').src = '../assets/img/low_white.png';
  urgentDisable();
  mediumDisable();
}

/**
 * Changes the priority of a task to "Urgent".
 *
 * @return {void} 
 */
function changePriorityUrgent() {
  medium = low = false;
  if (urgent) {
    urgent = false;
    document.getElementById('urgent').classList.add('prio-hover');
    urgentRemoveStyle();
    disablePriority();
  } else {
    urgent = true;
    urgentStyle();
  }
}

/**
 * Initializes tasks by calling various functions.
 *
 * @return {Promise<void>} Promise that resolves when all tasks are completed
 */
function changePriorityMedium() {
  urgent = low = false;
  if (medium) {
    medium = false;
    document.getElementById('medium').classList.add('prio-hover');
    mediumRemoveStyle();
    disablePriority();
  } else {
    medium = true;
    mediumStyle();
  }
}

/**
 * Changes the priority of a task to "Low".
 *
 * @return {void} 
 */
function changePriorityLow() {
  urgent = medium = false;
  if (low) {
    low = false;
    document.getElementById('low').classList.add('prio-hover');
    lowRemoveStyle();
    disablePriority();
  } else {
    low = true;
    lowStyle();
  }
}

/**
 * Changes the classes of the priority elements when the urgent priority is selected.
 *
 * @return {void} This function does not return anything.
 */
function urgentChangeClasses() {
  document.getElementById('urgent').classList.remove('prio-hover');
  document.getElementById('medium').classList.add('prio-hover');
  document.getElementById('low').classList.add('prio-hover');
}

/**
 * Changes the classes of the priority elements when the medium priority is selected.
 *
 * @return {void} This function does not return anything.
 */
function mediumChangeClasses() {
  document.getElementById('urgent').classList.add('prio-hover');
  document.getElementById('medium').classList.remove('prio-hover');
  document.getElementById('low').classList.add('prio-hover');
}

/**
 * Changes the classes of the priority elements when the low priority is selected.
 *
 * @return {void} This function does not return anything.
 */
function lowChangeClasses() {
  document.getElementById('urgent').classList.add('prio-hover');
  document.getElementById('medium').classList.add('prio-hover');
  document.getElementById('low').classList.remove('prio-hover');
}

/**
 * Removes the style for the urgent priority by setting the text color to black.
 *
 * @return {void} This function does not return anything.
 */
function urgentRemoveStyle() {
  if (urgent) {
    document.getElementById('urgent').style.color = '#000000';
  }
}

/**
 * Removes the style for the medium priority by setting the text color to black.
 *
 * @return {void} This function does not return anything.
 */
function mediumRemoveStyle() {
  if (medium) {
    document.getElementById('medium').style.color = '#000000';
  }
}

/**
 * Removes the style for the low priority by setting the text color to black.
 *
 * @return {void} This function does not return anything.
 */
function lowRemoveStyle() {
  if (low) {
    document.getElementById('low').style.color = '#000000';
  }
}

/**
 * Disables the urgent priority by setting the background color to white, text color to black,
 * and changing the image source to '../assets/img/urgent_red.png'.
 *
 * @return {void} This function does not return anything.
 */
function urgentDisable() {
  document.getElementById('urgent').style.background = '#FFFFFF'
  document.getElementById('urgent').style.color = '#000000'
  document.getElementById('urgent-img').src = '../assets/img/urgent_red.png';
}

/**
 * Disables the medium priority by setting the background color to white, text color to black,
 * and changing the image source to '../assets/img/equal_orange.png'.
 *
 * @return {void} This function does not return anything.
 */
function mediumDisable() {
  document.getElementById('medium').style.background = '#FFFFFF'
  document.getElementById('medium').style.color = '#000000'
  document.getElementById('medium-img').src = '../assets/img/equal_orange.png';
}

/**
 * Disables the low priority by setting the background color to white, text color to black,
 * and changing the image source to '../assets/img/low_green.png'.
 *
 * @return {void} This function does not return anything.
 */
function lowDisable() {
  document.getElementById('low').style.background = '#FFFFFF'
  document.getElementById('low').style.color = '#000000'
  document.getElementById('low-img').src = '../assets/img/low_green.png';
}

/**
 * Disables the priority selection by setting the `urgent`, `medium`, and `low` variables to `false`.
 * Also updates the background color and image source of the priority elements.
 *
 * @return {void} This function does not return anything.
 */
function disablePriority() {
  urgent = medium = low = false;
  urgentDisable();
  mediumDisable();
  lowDisable();
}

/**
 * A function that determines the priority of a task based on the values of the `urgent`, `medium`, and `low` variables.
 *
 * @return {string|null} The priority of the task, which can be "Urgent", "Medium", "Low", or `null` if none of the variables are `true`.
 */
function taskPriority() {
  priority = urgent ? 'Urgent' : medium ? 'Medium' : low ? 'Low' : null;
  return priority;
}

/**
 * Prevent the enter key from submitting the add task form.
 *
 * @listens event:DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function () {
  stopFormSubmitOnEnter();
});

function stopFormSubmitOnEnter(){
  document.getElementById("add-task-form").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });
}

