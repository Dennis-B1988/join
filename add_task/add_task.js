let tasks = [];
let urgent = false;
let medium = true;
let low = false;
let priority = null;
let subtaskCount = 0;

let subtaskArray = [];

/**
 *
 *
 */
async function initTasks() {
  getCurrentDate();
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
    document.getElementById('task-subtasks-list').innerHTML += addSubtaskList(subtask, subtaskCount);
    subtaskArray.push(subtask);
    subtaskCount++;
    document.getElementById('task-subtasks-input').value = '';
  }
}

function emptySubtask(){
  document.getElementById('task-subtasks-input').value = '';
}

/**
 *
 * WIP
 */
function editSubtask(subtaskCount) {
  document.getElementById(`subtask-${subtaskCount}`).contentEditable = true;
}

/**
 *
 * @param {*} subtaskCount
 */
function deleteSubtask(subtaskCount) {
  document.getElementById(`subtask-list-${subtaskCount}`).remove();
  subtaskArray.splice(subtaskCount, 1);
  subtaskCount--;
}

document.addEventListener('DOMContentLoaded', function() {
  const subtaskInput = document.getElementById('task-subtasks-input');
  const openSubtaskInput = document.querySelector('.subtask-icon-add');
  const inputIcons = document.querySelector('.subtask-icon');

  subtaskInput.addEventListener('focus', () => {
    openSubtaskInput.style.display = 'none';
    inputIcons.style.display = 'flex';
  });

  subtaskInput.addEventListener('blur', () => {
    // Delay hiding the icons to allow time for the click event on icon2 to execute
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
    tasks.push({ "title": title, "description": description, "assignedTo": assignedTo, "date": date, "priority": priority, "category": category, "subtasks": subtaskArray });
    save();
    clearTaskForm();
  }else{
    formFilled(title, date, category);
  }
}

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












/**
 *
 * 
 */
let options = ['Technical Task', 'User Story'];

document.addEventListener('DOMContentLoaded', function() {
  let searchInput = document.getElementById('task-category');
  let searchDropdown = document.getElementById('task-category-dropdown');
  let dropdownToggle = document.getElementById('task-category-icon');
  
  function populateDropdown() {
    searchDropdown.innerHTML = '';
    options.forEach(option => {
      const optionElement = document.createElement('div');
      optionElement.textContent = option;
      optionElement.classList.add('search-dropdown-item');
      optionElement.addEventListener('click', function() {
        searchInput.value = option;
        searchDropdown.style.display = 'none';
      });
      searchDropdown.appendChild(optionElement);
    });
    searchDropdown.style.display = 'block';
    dropdownToggle.classList.add('opened');
  }

  function toggleDropdown() {
    if (searchDropdown.style.display === 'block') {
      searchDropdown.style.display = 'none';
      dropdownToggle.classList.remove('opened');
    } else {
      populateDropdown();
      searchDropdown.style.display = 'block';
      searchInput.focus();
    }
  }

  function closeDropdown() {
    searchDropdown.style.display = 'none';
    dropdownToggle.classList.remove('opened');
  }

  function handleBodyClick(event) {
    if (event.target !== searchInput && event.target !== dropdownToggle) {
      closeDropdown();
    }
  }

  searchInput.addEventListener('click', toggleDropdown);
  dropdownToggle.addEventListener('click', toggleDropdown);
  document.body.addEventListener('click', handleBodyClick);

});





/**
 * 
 * 
 */
const data = [
  { firstName: 'John', lastName: 'Doe' },
  { firstName: 'Jane', lastName: 'Smith' },
  { firstName: 'Alice', lastName: 'Johnson' },
  { firstName: 'Bob', lastName: 'Brown' }
];

document.addEventListener('DOMContentLoaded', function(){

const inputField = document.querySelector('.task-assigned-to');
const dropdownList = document.querySelector('.task-assigned-to-dropdown');

inputField.addEventListener('input', () => {
  const inputValue = inputField.value.toLowerCase();
  const filteredData = data.filter(item =>
    item.firstName.toLowerCase().includes(inputValue) || 
    item.lastName.toLowerCase().includes(inputValue)
  );

  renderDropdownList(filteredData);
});

function renderDropdownList(items) {
  dropdownList.innerHTML = '';
  items.forEach(item => {
    const fullName = `${item.firstName} ${item.lastName}`;
    const initials = `${item.firstName.charAt(0)}${item.lastName.charAt(0)}`;
    const listItem = document.createElement('div');
    listItem.classList.add('dropdown-item');
    listItem.innerHTML = `
      <div class="initials">${initials}</div>
      <span>${fullName}</span>
      <img src="../assets/img/back_arrow.png" alt="Arrow" class="arrow-icon">
    `;
    listItem.addEventListener('click', () => {
      inputField.value = fullName;
      dropdownList.innerHTML = '';
    });
    dropdownList.appendChild(listItem);
  });
}

document.addEventListener('click', (event) => {
  const dropdown = document.getElementById('assigned-to-task');
  if (!dropdown.contains(event.target)) {
    dropdownList.innerHTML = '';
  }
});
});



// function dropdownCategory(){
//   let searchInput = document.getElementById('task-category');
//   let searchDropdown = document.getElementById('task-category-dropdown');
//   let dropdownToggle = document.getElementById('task-category-icon');
//   populateDropdown(searchDropdown, searchInput,  dropdownToggle);
//   toggleDropdown(searchDropdown, dropdownToggle, searchInput);
//   // return {searchInput, searchDropdown, dropdownToggle}
// }

// function populateDropdown(searchDropdown, searchInput,  dropdownToggle) {
//   searchDropdown.innerHTML = '';
//   options.forEach(option => {
//     let optionElement = document.createElement('div');
//     optionElement.textContent = option;
//     optionElement.classList.add('category-dropdown-item');
//     optionElement.addEventListener('click', function() {
//       searchInput.value = option;
//       searchDropdown.style.display = 'none';
//     });
//     searchDropdown.appendChild(optionElement);
//   });
//   searchDropdown.style.display = 'block'; // Always show dropdown
//   dropdownToggle.classList.add('opened'); // Add the opened class to the dropdown icon
// }

// function toggleDropdown(searchDropdown, dropdownToggle, searchInput) {
//   if (searchDropdown.style.display === 'block') {
//     searchDropdown.style.display = 'none';
//     dropdownToggle.classList.remove('opened'); 
//   } else {
//     populateDropdown();
//     searchDropdown.style.display = 'block';
//     searchInput.focus();
//   }
// }