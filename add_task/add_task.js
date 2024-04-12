let urgent = false;
let medium = true;
let low = false;
let priority = null;
let categoryList = ['Technical Task', 'User Story'];
let subtaskArray = [];


/**
 *
 *
 */
async function initTasks() {
  getCurrentDate();
  createUserList();
  await includeHTML();
  await loadData();
  await initTemplate();
  load();
}

/**
 *
 *
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
 *
 *
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

function disablePriority() {
  urgent = false;
  medium = false;
  low = false;
  document.getElementById('urgent').style.background = '#FFFFFF' 
  document.getElementById('urgent-img').src = '../assets/img/urgent_red.png';
  document.getElementById('medium').style.background = '#FFFFFF' 
  document.getElementById('medium-img').src = '../assets/img/equal_orange.png';
  document.getElementById('low').style.background = '#FFFFFF' 
  document.getElementById('low-img').src = '../assets/img/low_green.png';
}

/**
 *
 * @return {*} 
 */
function taskPriority() {
  if (urgent) {
    priority = 'Urgent';
  } else if (medium) {
    priority = 'Medium';
  } else if (low) {
    priority = 'Low';
  } else {
    priority = null;
  }
  return priority;
}

function openSubtask(){
  document.getElementById('task-subtasks-input').focus();
}

/**
 *
 *
 */
function newSubtask() {
  let subtask = document.getElementById('task-subtasks-input').value;
  if(subtask !== '' && subtask.startsWith('<') === false) {
    subtaskArray.push(subtask);
  
    document.getElementById('task-subtasks-input').value = '';
    document.getElementById('task-subtasks-list').innerHTML = '';
    for(let i = 0; i < subtaskArray.length; i++){
      let subtaskContent = subtaskArray[i];
      document.getElementById('task-subtasks-list').innerHTML += addSubtaskList(subtaskContent, i);
    }
  }
}

function emptySubtask(){
  document.getElementById('task-subtasks-input').value = '';
}

/**
 *
 * WIP
 */
function editSubtask(i) {
  // document.getElementById(`subtask-${i}`).contentEditable = true;
}

/**
 *
 *
 * @param {*} i
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
  }
}

/**
 *
 *
 * @param {*} i
 */
// Change subtask icons when subtask input is focused and make them clickable
document.addEventListener('DOMContentLoaded', function() {
  const subtaskInput = document.getElementById('task-subtasks-input');
  const openSubtaskInput = document.querySelector('.subtask-icon-add');
  const inputIcons = document.querySelector('.subtask-icon');

  subtaskInput.addEventListener('focus', () => {
    openSubtaskInput.style.display = 'none';
    inputIcons.style.display = 'flex';
  });

  subtaskInput.addEventListener('blur', () => {
    setTimeout(() => {
      if (!subtaskInput.contains(document.activeElement)) {
        openSubtaskInput.style.display = 'flex';
        inputIcons.style.display = 'none';
      }
    }, 100);
  });

  inputIcons.addEventListener('mousedown', (event) => {
    event.preventDefault();
    event.stopPropagation();
  });

  inputIcons.addEventListener('mouseup', () => {
    setTimeout(() => {
      subtaskInput.focus();
    }, 0);
  });

});

/**
 *
 *
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
  subtaskCount = 0;
  subtaskArray = [];
}

/**
 *
 *
 */
function onSubmit(){
  let title = document.getElementById('task-title').value;
  let description = document.getElementById('task-description').value;
  let assignedTo = document.getElementById('task-assigned-to').value;
  let date = document.getElementById('task-date').value;
  let category = document.getElementById('task-category').value;
  taskPriority();
  if (title && date && category !== '') {
    submitSuccess(title, description, assignedTo, date, category, priority, subtaskArray);
  }else{
    formFilled(title, date, category);
  }
}

function submitSuccess(title, description, assignedTo, date, category, priority, subtaskArray) {
  tasks.push({ 
    "title": title, 
    "description": description, 
    "assignedTo": assignedTo, 
    "date": date, 
    "priority": priority, 
    "category": category, 
    "subtasks": subtaskArray 
  });
  save();
  clearTaskForm();
}

// Required fields get red border and red error message if empty
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

/**
 *
 *
 */
function save() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 *
 *
 */
function load() {
  let tasksAsText = localStorage.getItem('tasks');
  if (tasksAsText) {
    tasks = JSON.parse(tasksAsText);
  }
}




document.addEventListener('DOMContentLoaded', function() {

document.getElementById("task-add").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
  }
});

});



/**
 *
 * 
 */


document.addEventListener('DOMContentLoaded', function() {

  /////////////////////////////////////////////////////////////
  // Category
  // Needs function cut down
  let categoryInput = document.getElementById('task-category');
  let categoryDropdown = document.getElementById('task-category-dropdown');
  let dropdownToggle = document.getElementById('task-category-icon');
  
  // Create category dropdown
  function categoryDropdownFill() {
    categoryDropdown.innerHTML = '';
    categoryList.forEach(option => {
      const categoryElement = document.createElement('div');
      categoryElement.textContent = option;
      categoryElement.classList.add('search-dropdown-item');
      categoryElement.addEventListener('click', function() {
        categoryInput.value = option;
        categoryDropdown.style.display = 'none';
      });
      categoryDropdown.appendChild(categoryElement);
    });
    openDropdown();
  }

  //  Open category dropdown
  function openDropdown() {
    categoryDropdown.style.display = 'block';
    dropdownToggle.classList.add('opened');
  }

  // Toggle category dropdown
  function toggleDropdown() {
    if (categoryDropdown.style.display === 'block') {
      categoryDropdown.style.display = 'none';
      dropdownToggle.classList.remove('opened');
    } else {
      categoryDropdownFill();
      categoryDropdown.style.display = 'block';
      categoryInput.focus();
    }
  }

  // Close category dropdown
  function closeDropdown() {
    categoryDropdown.style.display = 'none';
    dropdownToggle.classList.remove('opened');
  }

  // Handle click outside of category dropdown
  function handleBodyClick(event) {
    if (event.target !== categoryInput && event.target !== dropdownToggle) {
      closeDropdown();
    }
  }

  // Add event listeners
  categoryInput.addEventListener('click', toggleDropdown);
  dropdownToggle.addEventListener('click', toggleDropdown);
  document.body.addEventListener('click', handleBodyClick);



});



///////////////////////////////////////////////////////
// WIP subtask editing

// Function to handle double click event on the subtask item
function handleDoubleClick(index) {
  const listItem = document.getElementById(`subtask-${index}`);
  const subtaskText = listItem.textContent.trim();
  listItem.innerHTML = `<input type="text" id="edit-input-${index}" class="subtask-edit-input" value="${subtaskText}" />`;

  document.getElementById(`subtask-icons-${index}`).classList.add('hidden');
  document.getElementById(`subtask-icons-edit-${index}`).classList.remove('hidden');

  // Focus the input element
  const inputElement = document.getElementById(`edit-input-${index}`);
  inputElement.focus();

  // Add event listener for saving the edited subtask
  inputElement.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          saveEditedSubtask(index);
      }
  });
}

// Function to save the edited subtask
function saveEditedSubtask(index) {
  const inputElement = document.getElementById(`edit-input-${index}`);
  const editedSubtaskText = inputElement.value.trim();

  // Check if the input value is not empty
  if (editedSubtaskText !== '') {
      // Update the subtask text in the array
      subtaskArray[index] = editedSubtaskText;

      // Replace the input element with the updated subtask text
      const listItem = document.getElementById(`subtask-${index}`);
      listItem.textContent = editedSubtaskText;
      document.getElementById(`subtask-icons-${index}`).classList.remove('hidden');
    document.getElementById(`subtask-icons-edit-${index}`).classList.add('hidden');
  }
}

// Add event listener for double click on subtask items after the page has loaded
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.subtask-list-item').forEach((item, index) => {
      item.addEventListener('dblclick', () => {
          handleDoubleClick(index);
      });
  });
});

// Testusers
let username = ['Random Name', 'John Doe', 'Jane Shoe'];

function createUserList(){
  for(let i = 0; i < username.length; i++) {
    let user = username[i];
    document.getElementById('task-assigned-to-dropdown').innerHTML += `
    <div class="assigned-dropdown-item" id="assigned-dropdown-item-${i}">
    <div class="user-initials" id="user-initials-${i}">${user.trim().charAt(0)}</div>
    <div class="assigned-dropdown-user" id="assigned-dropdown-user-${i}">${user}</div>
    <img onclick="userCheckmark(${i})" src="../assets/img/checkmark-empty_dark.png" class="checkmark" id="checkmark-${i}">
    </div>`
  }
}

function assignedToDropdown() {
  let assignedToDropdown = document.getElementById('task-assigned-to-dropdown');
  if(assignedToDropdown.style.display !== 'flex') {
  assignedToDropdown.style.display = 'flex';
  } else {
  assignedToDropdown.style.display = 'none';
  }
}

function userCheckmark(i) {
  let checkmark = document.getElementById(`checkmark-${i}`);
  if(checkmark.src.includes('/assets/img/checkmark-empty_dark.png')) {
    checkmark.src = '../assets/img/checkmark_checked_dark.png';
  } else {
    checkmark.src = '../assets/img/checkmark-empty_dark.png';
  }
}