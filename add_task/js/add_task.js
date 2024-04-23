let urgent = false;
let medium = true;
let low = false;
let priority = null;
let categoryList = ['Technical Task', 'User Story'];
let subtaskArray = [];
let assignedUsers = [];


/**
 * Initializes the tasks functionality.
 *
 * @return {Promise<void>} A promise that resolves when the initialization is complete.
 */
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
 * Executes a series of functions upon successful form submission.
 *
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} date - The due date of the task.
 * @param {string} category - The category of the task.
 * @param {string} priority - The priority level of the task.
 * @param {Array} subtaskArray - An array of subtasks associated with the task.
 * @return {void} This function does not return anything.
 */
function submitSuccess(title, description, date, category, priority, subtaskArray) {
  const currentTimestamp = Math.floor(Date.now() / 1000);
  pushTasks(currentTimestamp, title, description, date, priority, category, subtaskArray);
  checkUser();
  clearTaskForm();
}


/**
 * Pushes a new task object into the tasks array with the provided details.
 *
 * @param {number} currentTimestamp - The timestamp of the task creation.
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} date - The due date of the task.
 * @param {string} priority - The priority level of the task.
 * @param {string} category - The category of the task.
 * @param {Array} subtaskArray - An array of subtasks associated with the task.
 * @return {void}
 */
function pushTasks(currentTimestamp, title, description, date, priority, category, subtaskArray) {
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
}


/**
 * Checks the user type and saves or sets tasks accordingly.
 *
 * @return {void} This function does not return anything.
 */
function checkUser(){
  if (loadPage('guest') === 'guest') {
    savePage('tasks', tasks);
  } else {
    setItem('tasks', tasks);
  }
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
    document.getElementById('title-required').style.visibility = 'visible';
    document.getElementById('task-title').style.borderColor = '#FCA7B1';
  }
  if (date == '') {
    document.getElementById('date-required').style.visibility = 'visible';
    document.getElementById('task-date').style.borderColor = '#FCA7B1';
  }
  if (category == '') {
    document.getElementById('category-required').style.visibility = 'visible';
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
  removeRequiredStyles();
  uncheckAll();
  subtaskCount = 0;
  subtaskArray = [];
}


/**
 * Removes the required styles from the specified elements.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function removeRequiredStyles() {
  document.getElementById("title-required").style.visibility = 'hidden';
  document.getElementById("date-required").style.visibility = 'hidden';
  document.getElementById("category-required").style.visibility = 'hidden';
  document.getElementById("task-title").style.borderColor = '#d1d1d1';
  document.getElementById("task-date").style.borderColor = '#d1d1d1';
  document.getElementById("task-category").style.borderColor = '#d1d1d1';
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
 * Prevent the enter key from submitting the add task form.
 *
 * @listens event:DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', function () {
  stopFormSubmitOnEnter();
});


/**
 * Prevents the form from being submitted when the Enter key is pressed.
 *
 * @param {Event} event - The keypress event.
 * @return {void} This function does not return anything.
 */
function stopFormSubmitOnEnter(){
  document.getElementById("add-task-form").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });
}


/**
 * Close all dropdowns when clicking outside of them.
 *
 * @param {MouseEvent} event - The click event.
 * @return {void} This function does not return anything.
 */
document.addEventListener('DOMContentLoaded', function () {
  document.body.addEventListener("click", function (event) {
    let dropdownCategory = document.getElementById("task-category-dropdown");
    let dropdownAssignedTo = document.getElementById("task-assigned-to-dropdown");
    closeCategoryDropdownAnywhere(event, dropdownCategory);
    closeAssignedToDropdownAnywhere(event, dropdownAssignedTo);
  });
});
