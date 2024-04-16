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
  pushAllUsers();
  createUserList();
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

/////////////////////// PRIORITY ///////////////////////

/**
 * Changes the priority of a task to "Urgent".
 *
 * @return {void} 
 */
function changePriorityUrgent() {
  medium = false;
  low = false;
  if(urgent){
    urgent = false;
    document.getElementById('urgent').classList.add('prio-hover');
    disablePriority();
  } else {
    urgent = true;
    urgentStyle();
  }
}

/**
 * Sets the style for the urgent priority.
 *
 * @return {undefined} No return value.
 */
function urgentStyle() {
  document.getElementById('urgent').classList.remove('prio-hover');
  document.getElementById('medium').classList.add('prio-hover');
  document.getElementById('low').classList.add('prio-hover');
  document.getElementById('urgent').style.background = '#FF3D00' 
  document.getElementById('urgent-img').src = '../assets/img/urgent_white.png';
  document.getElementById('medium').style.background = '#FFFFFF' 
  document.getElementById('medium-img').src = '../assets/img/equal_orange.png';
  document.getElementById('low').style.background = '#FFFFFF' 
  document.getElementById('low-img').src = '../assets/img/low_green.png';
}

/**
 * Initializes tasks by calling various functions.
 *
 * @return {Promise<void>} Promise that resolves when all tasks are completed
 */
function changePriorityMedium() {
  urgent = false;
  low = false;
  if(medium){
    medium = false;
    document.getElementById('medium').classList.add('prio-hover');
    disablePriority();
  } else {
    medium = true;
    mediumStyle();
  }
}

/**
 * Sets the style for the medium priority.
 *
 * @return {undefined} No return value.
 */
function mediumStyle() {
  document.getElementById('urgent').classList.add('prio-hover');
  document.getElementById('medium').classList.remove('prio-hover');
  document.getElementById('low').classList.add('prio-hover');
  document.getElementById('medium').style.background = '#FFA800' 
  document.getElementById('medium-img').src = '../assets/img/equal_white.png';
  document.getElementById('urgent').style.background = '#FFFFFF' 
  document.getElementById('urgent-img').src = '../assets/img/urgent_red.png';
  document.getElementById('low').style.background = '#FFFFFF' 
  document.getElementById('low-img').src = '../assets/img/low_green.png';
}

/**
 * Changes the priority of a task to "Low".
 *
 * @return {void} 
 */
function changePriorityLow() {
  urgent = false;
  medium = false;
  if(low){
    low = false;
    document.getElementById('low').classList.add('prio-hover');
    disablePriority();
  } else {
    low = true;
    lowStyle();
  }
}

/**
 * Sets the style for the low priority.
 *
 * @return {undefined} No return value.
 */
function lowStyle() {
  document.getElementById('urgent').classList.add('prio-hover');
  document.getElementById('medium').classList.add('prio-hover');
  document.getElementById('low').classList.remove('prio-hover');
  document.getElementById('low').style.background = '#7AE229' 
  document.getElementById('low-img').src = '../assets/img/low_white.png';
  document.getElementById('urgent').style.background = '#FFFFFF' 
  document.getElementById('urgent-img').src = '../assets/img/urgent_red.png';
  document.getElementById('medium').style.background = '#FFFFFF' 
  document.getElementById('medium-img').src = '../assets/img/equal_orange.png';
}

/**
 * Disables the priority selection by setting the `urgent`, `medium`, and `low` variables to `false`.
 * Also updates the background color and image source of the priority elements.
 *
 * @return {void} This function does not return anything.
 */
function disablePriority() {
  urgent = medium = low = false;
  document.getElementById('urgent').style.background = '#FFFFFF' 
  document.getElementById('urgent-img').src = '../assets/img/urgent_red.png';
  document.getElementById('medium').style.background = '#FFFFFF' 
  document.getElementById('medium-img').src = '../assets/img/equal_orange.png';
  document.getElementById('low').style.background = '#FFFFFF' 
  document.getElementById('low-img').src = '../assets/img/low_green.png';
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


///////////////////////// FORM VALIDATION //////////////////////

/**
 * Clears the task form by resetting the form elements and clearing the subtask list.
 * Also resets the styling of the required fields and unchecks all checkboxes.
 *
 * @return {void} This function does not return anything.
 */
function clearTaskForm(){
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
 * Handles form submission by retrieving input values and calling relevant functions based on conditions.
 *
 * @return {void} This function does not return anything.
 */
function onSubmit(){
  let title = document.getElementById('task-title').value;
  let description = document.getElementById('task-description').value;
  let date = document.getElementById('task-date').value;
  let category = document.getElementById('task-category').value;
  taskPriority();
  if (title && date && category !== '') {
    submitSuccess(title, description, date, category, priority, subtaskArray);
  }else{
    formFilled(title, date, category);
  }
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
  tasks.push({ 
    "title": title, 
    "description": description, 
    "assignedTo": assignedUsers,
    "date": date, 
    "priority": priority, 
    "category": category, 
    "subtasks": subtaskArray 
  });
  setItem('tasks', tasks);
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
function formFilled(title, date, category){
  if(title == ''){
    document.getElementById('title-required').style.color = '#FCA7B1';
    document.getElementById('task-title').style.borderColor = '#FCA7B1';
  }
  if(date == ''){
    document.getElementById('date-required').style.color = '#FCA7B1';
    document.getElementById('task-date').style.borderColor = '#FCA7B1';
  }
  if(category == ''){
    document.getElementById('category-required').style.color = '#FCA7B1';
    document.getElementById('task-category').style.borderColor = '#FCA7B1';
  }
}


//////////////////////// CATEGORY DROPDOWN //////////////////////

/**
 *
 * 
 */
function renderCategory(){
  const categoryInput = document.getElementById('task-category');
  const categoryDropdown = document.getElementById('task-category-dropdown');
  const dropdownToggle = document.getElementById('task-category-icon');
  toggleDropdown(categoryInput, categoryDropdown, dropdownToggle);
  changeCategoryIcon();
}

// Create category dropdown
function categoryDropdownFill(categoryInput, categoryDropdown, dropdownToggle) {
  categoryDropdown.innerHTML = '';
  createCategoryElements(categoryInput, categoryDropdown, dropdownToggle);
}

function createCategoryElements(categoryInput, categoryDropdown) {
  categoryList.forEach(option => {
    const categoryElement = createCategoryElement(option, categoryInput, categoryDropdown);
    categoryDropdown.appendChild(categoryElement);
  });
}

function createCategoryElement(option, categoryInput, categoryDropdown) {
  const categoryElement = document.createElement('div');
  categoryElement.textContent = option;
  categoryElement.classList.add('search-dropdown-item');
  categoryElement.addEventListener('click', function() {
    categoryInput.value = option;
    categoryDropdown.style.display = 'none';
  });
  return categoryElement;
}

// Toggle category dropdown
function toggleDropdown(categoryInput, categoryDropdown, dropdownToggle) {
  if (categoryDropdown.style.display === 'block') {
    categoryDropdown.style.display = 'none';
  } else {
    categoryDropdownFill(categoryInput, categoryDropdown, dropdownToggle);
    categoryDropdown.style.display = 'block';
    categoryInput.focus();
  }
}

// Mirror the dropdown icon upside down
function changeCategoryIcon() {
  const dropdownIcon = document.getElementById('task-category-icon');
  const src = dropdownIcon.src;

  if (src.endsWith('drop_down.png')) {
    dropdownIcon.src = '../assets/img/drop_down_mirror.png';
  } else {
    dropdownIcon.src = '../assets/img/drop_down.png';
  }
}



////////////////////////////
// Cut down event listeners

// Event listener for dropdowns
document.addEventListener('DOMContentLoaded', function() {
  // sortUsernames();
  
  // Dropdown event listeners for category and assigned to
  document.body.addEventListener("click", function(event) {
    let dropdownCategory = document.getElementById("task-category-dropdown");
    let dropdownAssignedTo = document.getElementById("task-assigned-to-dropdown");
    closeCategoryDropdown(event, dropdownCategory);
    closeAssignedToDropdown(event, dropdownAssignedTo)
  });

});

// Close category dropdown when clicking outside of it
function closeCategoryDropdown(event, dropdown) {
  let clickedElement = event.target;
  let isDropdownClick = clickedElement.id === "task-category" || 
                        clickedElement.id === "task-category-icon" ||
                        clickedElement.closest("#task-category") !== null ||
                        clickedElement.closest("#task-category-icon") !== null;
  if (!isDropdownClick) {
    dropdown.style.display = "none";
    document.getElementById('task-category-icon').src = '../assets/img/drop_down.png';
  }
}

// Close assigned to dropdown when clicking outside of it
function closeAssignedToDropdown(event, dropdown) {
  let clickedElement = event.target;
  let isDropdownClick = clickedElement.id === "task-assigned-to" || 
                        clickedElement.id === "assigned-to-icon" ||
                        clickedElement.closest("#task-assigned-to") !== null ||
                        clickedElement.closest("#assigned-to-icon") !== null;
                        clickedElement.closest("#task-assigned-to-dropdown") !== null;
  if (!isDropdownClick && !clickedElement.closest("#task-assigned-to-dropdown")) {
    dropdown.style.display = "none";
    document.getElementById('assigned-to-icon').src = '../assets/img/drop_down.png';
  }
}


  document.addEventListener('DOMContentLoaded', function() {

    document.getElementById("add-task-form").addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    });
  
});


//////////////////// SUBTASKS ////////////////////

/**
 * Focuses the task subtasks input element.
 *
 * @return {void} This function does not return anything.
 */
function openSubtask(){
  document.getElementById('task-subtasks-input').focus();
}

/**
 * Adds a subtask to the subtaskArray and triggers a render of the updated subtasks list.
 *
 * @return {void} This function does not return anything.
 */
function addSubtask() {
  const subtaskInput = document.getElementById('task-subtasks-input');
  const subtaskValue = subtaskInput.value.trim();

  if (subtaskValue) {
    subtaskArray.push(subtaskValue);
    subtaskInput.value = '';
    renderSubtasks();
  }
}

/**
 * Renders the subtasks list on the webpage.
 *
 * @param {Array} subtaskArray - An array of subtasks.
 * @return {undefined} This function does not return a value.
 */
function renderSubtasks() {
  const subtaskList = document.getElementById('task-subtasks-list');
  subtaskList.innerHTML = subtaskArray.map((subtask, index) => addSubtaskList(subtask, index)).join('');

  addSubtaskDoubleClick();
}

/**
 * Adds a double click event listener to each subtask item in the subtaskArray.
 * When a subtask item is double clicked, the editSubtask function is called with the index of the subtask item.
 *
 * @return {void} This function does not return anything.
 */
function addSubtaskDoubleClick(){
  subtaskArray.forEach((_, index) => {
    const subtaskItem = document.getElementById(`subtask-${index}`);
    subtaskItem.addEventListener('dblclick', () => editSubtask(index));
  });
}

/**
 * Empties the value of the task subtask input field.
 *
 * @param {string} id - The id of the task subtask input field.
 * @return {void} This function does not return anything.
 */
function emptySubtask(){
  document.getElementById('task-subtasks-input').value = '';
}

/**
 * Deletes a subtask from the task list based on the given index.
 *
 * @param {number} i - The index of the subtask to be deleted.
 * @return {void} This function does not return anything.
 */
function deleteSubtask(i) {
  if (i >= 0 && i < subtaskArray.length) {
    document.getElementById(`subtask-list-${i}`).remove();
    subtaskArray.splice(i, 1);

    document.getElementById('task-subtasks-list').innerHTML = '';
    for(let j = 0; j < subtaskArray.length; j++){
      let subtaskContent = subtaskArray[j];
      document.getElementById('task-subtasks-list').innerHTML += addSubtaskList(subtaskContent, j);
    }
    addSubtaskDoubleClick();
  }
}

/**
 * Sets up event listeners for subtask input when the DOM content is loaded.
 * 
 */
document.addEventListener('DOMContentLoaded', setupSubtaskInput);

/**
 * Sets up the subtask input by adding event listeners to the subtask input, open subtask input, and input icons.
 *
 * @return {void} This function does not return anything.
 */
function setupSubtaskInput() {
  const subtaskInput = document.getElementById('task-subtasks-input');
  const openSubtaskInput = document.querySelector('.subtask-icon-add');
  const inputIcons = document.querySelector('.subtask-icon');

  subtaskInput.addEventListener('focus', handleSubtaskInputFocus.bind(null, openSubtaskInput, inputIcons));
  subtaskInput.addEventListener('blur', handleSubtaskInputBlur.bind(null, subtaskInput, openSubtaskInput, inputIcons));
  inputIcons.addEventListener('mousedown', preventDefaultAndStopPropagation);
  inputIcons.addEventListener('mouseup', handleInputIconsMouseUp.bind(null, subtaskInput));
}

/**
 * Handles the focus event on the subtask input.
 *
 * @param {Element} openSubtaskInput - The open subtask input element.
 * @param {Element} inputIcons - The input icons element.
 * @return {void} This function does not return anything.
 */
function handleSubtaskInputFocus(openSubtaskInput, inputIcons) {
  openSubtaskInput.style.display = 'none';
  inputIcons.style.display = 'flex';
}

/**
 * Handles the blur event on the subtask input.
 *
 * @param {Element} subtaskInput - The subtask input element.
 * @param {Element} openSubtaskInput - The open subtask input element.
 * @param {Element} inputIcons - The input icons element.
 * @return {void} This function does not return anything.
 */
function handleSubtaskInputBlur(subtaskInput, openSubtaskInput, inputIcons) {
  setTimeout(() => {
    if (!subtaskInput.contains(document.activeElement)) {
      openSubtaskInput.style.display = 'flex';
      inputIcons.style.display = 'none';
    }
  }, 100);
}

/**
 * Prevents the default behavior of an event and stops its propagation.
 *
 * @param {Event} event - The event object.
 * @return {void} This function does not return anything.
 */
function preventDefaultAndStopPropagation(event) {
  event.preventDefault();
  event.stopPropagation();
}

/**
 * Handles the mouse up event on the input icons.
 *
 * @param {Element} subtaskInput - The subtask input element.
 * @return {void} This function does not return anything.
 */
function handleInputIconsMouseUp(subtaskInput) {
  setTimeout(() => {
    subtaskInput.focus();
  }, 0);
}

/**
 * Function to edit a subtask item.
 *
 * @param {number} index - The index of the subtask item to be edited.
 * @return {void} This function does not return anything.
 */
function editSubtask(index) {
  const listItem = document.getElementById(`subtask-${index}`);
  const subtaskText = listItem.textContent.trim();
  listItem.innerHTML = changeSubtaskToInput(index, subtaskText);

  document.getElementById(`subtask-icons-${index}`).classList.add('hidden');
  document.getElementById(`subtask-icons-${index}`).classList.remove('subtask-icons');
  document.getElementById(`subtask-icons-edit-${index}`).classList.remove('hidden');

  const inputElement = document.getElementById(`edit-input-${index}`);
  inputElement.focus();
}


  

function saveEditedSubtask(index) {
  const input = document.getElementById(`edit-input-${index}`);
  const text = input.value.trim();
  if (text) {
    subtaskArray[index] = text;
    const listItem = document.getElementById(`subtask-${index}`);
    listItem.textContent = text;
    showSubtaskIcons(index);
  } else {
    deleteSubtask(index);
  }
}

/**
 * Shows the subtask icons for a given index.
 *
 * @param {number} index - The index of the subtask.
 * @return {void} This function does not return anything.
 */
function showSubtaskIcons(index) {
  const icons = document.getElementById(`subtask-icons-${index}`);
  const iconsEdit = document.getElementById(`subtask-icons-edit-${index}`);
  icons.classList.add('subtask-icons');
  icons.classList.remove('hidden');
  iconsEdit.classList.add('hidden');
}


/////////////////////// ASSIGNED TO //////////////////

/**
 * Renders a user list in the assigned to dropdown.
 *
 * @return {void} This function does not return anything.
 */
function createUserList(){
  let assignedDropdown = document.getElementById('task-assigned-to-dropdown');
  assignedDropdown.innerHTML = '';
  renderUserList(assignedDropdown);
}

/**
 * Renders a user list in the dropdown.
 *
 * @param {HTMLElement} assignedDropdown - The dropdown element to render the user list in.
 * @return {void} This function does not return anything.
 */
function renderUserList(assignedDropdown) {
  sortUsernames();

  for (let i = 0; i < username.length; i++) {
    let user = username[i].name;
    let initials = generateInitials(user);
 
    renderUser(assignedDropdown, i, user, initials);
    styleUserInitials(i);
  }
}

/**
 * Renders a user in the dropdown with their initials and full name.
 *
 * @param {HTMLElement} dropdown - The dropdown element to render the user in.
 * @param {number} userIndex - The index of the user in the users array.
 * @param {string} userName - The name of the user.
 * @param {string} initials - The initials of the user.
 * @return {void} This function does not return anything.
 */
function renderUser(dropdown, userIndex, userName, initials) {
  const userLabel = userName + (userName === users[loadPage('user')].name ? ' (YOU)' : '');
  dropdown.innerHTML += renderAssignedToDropdown(userIndex, userLabel, initials);
}

/**
 * Sets the background color of the element with the id `user-initials-${index}` to the color specified in `username[index].color`.
 *
 * @param {number} index - The index of the user whose initials are being styled.
 * @return {void} This function does not return anything.
 */
function styleUserInitials(index) {
  document.getElementById(`user-initials-${index}`).style.backgroundColor = username[index].color;
}

/**
 * Generates initials from a user's full name.
 *
 * @param {string} user - The full name of the user.
 * @return {string} The generated initials.
 */
function generateInitials(user) {
  let initials = '';
  let fullName = user.split(' ');
  for (let j = 0; j < fullName.length; j++) {
    initials += fullName[j][0];
  }
  return initials;
}

/**
 * Toggles the display of the assigned to dropdown. If the dropdown is currently hidden, it is displayed and the assigned icon is changed. If the dropdown is currently displayed, it is hidden and the assigned icon is changed.
 *
 * @return {void} This function does not return anything.
 */
function assignedToDropdown() {
  let assignedToDropdown = document.getElementById('task-assigned-to-dropdown');
  if(assignedToDropdown.style.display !== 'flex') {
    assignedToDropdown.style.display = 'flex';
    changeAssignedIcon();
  } else {
    assignedToDropdown.style.display = 'none';
    changeAssignedIcon();
  }
}

/**
 * Toggles the checkmark image and updates the assigned users list and display based on the given index.
 *
 * @param {number} index - The index of the user in the username array.
 * @return {void} This function does not return a value.
 */
function userCheckmark(index) {
  const checkmark = document.getElementById(`checkmark-${index}`);
  if (checkmark.src.includes('/assets/img/checkmark-empty_dark.png')) {
    checkmark.src = '../assets/img/checkmark_checked_white.png';
    addUserToAssignedUsers(index);
    displayUsers();
    checkedBackgroundDark(index);
  } else {
    checkmark.src = '../assets/img/checkmark-empty_dark.png';
    removeUserFromAssignedUsers(index);
    displayUsers();
    checkedBackgroundWhite(index);
  }
}

/**
 * Adds the user at the given index to the list of assigned users.
 *
 * @param {number} index - The index of the user to be added.
 * @return {void} This function does not return anything.
 */
function addUserToAssignedUsers(index) {
  assignedUsers.push(username[index]);
}

/**
 * Removes a user from the list of assigned users.
 *
 * @param {number} index - The index of the user to be removed.
 * @return {undefined} This function does not return a value.
 */
function removeUserFromAssignedUsers(index) {
  let userIndex = assignedUsers.findIndex(user => user.name === username[index].name);
  if (userIndex !== -1) assignedUsers.splice(userIndex, 1);
}

/**
 * Sets the background color of the assigned dropdown item to a dark color and the text color of the assigned dropdown user to white.
 *
 * @param {number} i - The index of the assigned dropdown item to apply the styling to.
 * @return {void} This function does not return anything.
 */
function checkedBackgroundDark(i){
  document.getElementById(`assigned-dropdown-item-${i}`).style.backgroundColor = 'rgb(42, 54, 71)';
  document.getElementById(`assigned-dropdown-user-${i}`).style.color = 'rgb(255, 255, 255)';
}

/**
 * Set the background color of the assigned dropdown item to white and the text color to black.
 *
 * @param {number} i - The index of the assigned dropdown item to apply the styling.
 * @return {void} This function does not return anything.
 */
function checkedBackgroundWhite(i){
  document.getElementById(`assigned-dropdown-item-${i}`).style.backgroundColor = 'rgb(255, 255, 255)';
  document.getElementById(`assigned-dropdown-user-${i}`).style.color = 'rgb(0, 0, 0)';
}

/**
 * Renders the list of assigned users by populating the 'assigned-to-users' element with user information and styling.
 *
 * @return {void} This function does not return anything.
 */
function displayUsers() {
  let checkedUsers = document.getElementById('assigned-to-users');
  checkedUsers.innerHTML = '';
  sortUsernames();
  for(let i = 0; i < assignedUsers.length; i++) {
    let user = assignedUsers[i].name;
    let initials = generateInitials(user);
    checkedUsers.innerHTML += renderAssignedToUsers(i, initials);
    document.getElementById(`assigned-to-users-checked-${i}`).style.backgroundColor = assignedUsers[i].color;
  }
}

/**
 * Changes the assigned icon based on its current source.
 *
 * @param {string} id - The id of the assigned icon element.
 * @return {void} This function does not return anything.
 */
function changeAssignedIcon() {
  const dropdownIcon = document.getElementById('assigned-to-icon');
  dropdownIcon.src = dropdownIcon.src.endsWith('drop_down.png') ? '../assets/img/drop_down_mirror.png' : '../assets/img/drop_down.png';
}

/**
 * Unchecks all the checkboxes by setting their source to an empty dark checkmark image, clears the assigned users array,
 * and empties the inner HTML of the 'assigned-to-users' element.
 *
 * @return {undefined} This function does not return a value.
 */
function uncheckAll() {
  for(let i = 0; i < username.length; i++) {
    const checkmark = document.getElementById(`checkmark-${i}`);
    checkmark.src = '../assets/img/checkmark-empty_dark.png';
    checkedBackgroundWhite(i);
  }
  assignedUsers = [];
  document.getElementById('assigned-to-users').innerHTML = '';
}

/**
 * Sorts the `username` and `assignedUsers` arrays based on the current user's name.
 *
 * @return {undefined} This function does not return a value.
 */
function sortUsernames() {
  const currentUser = users[loadPage('user')];
  username.sort((firstUser, otherUser) => {
  if (firstUser.name === currentUser.name) return -1;
    if (otherUser.name === currentUser.name) return 1;
    return firstUser.name.localeCompare(otherUser.name);
  });
  assignedUsers.sort((firstUser, otherUser) => {
    if (firstUser.name === currentUser.name) return -1;
    if (otherUser.name === currentUser.name) return 1;
    return firstUser.name.localeCompare(otherUser.name);
  });
}
