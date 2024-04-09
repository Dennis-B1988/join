let tasks = [];
let urgent = false;
let medium = true;
let low = false;
let priority = null;

/**
 *
 *
 */
async function initTasks(){
    await includeHTML();
    showCategory();
    showCurrentInformation();
    getCurrentDate();
    load();
}

/**
 *
 *
 */
function urgentStyle() {
  urgent = true;
  medium = false;
  low = false;
  document.getElementById('urgent').style.background = 'rgb(255, 61, 0)' 
  document.getElementById('urgent-img').src = '../assets/img/urgent_white.png';

  document.getElementById('medium').style.background = 'rgb(255, 255, 255)' 
  document.getElementById('medium-img').src = '../assets/img/equal_orange.png';
  document.getElementById('low').style.background = 'rgb(255, 255, 255)' 
  document.getElementById('low-img').src = '../assets/img/low_green.png';
}

function mediumStyle() {
  urgent = false;
  medium = true;
  low = false;
  document.getElementById('medium').style.background = '#FFA800' 
  document.getElementById('medium-img').src = '../assets/img/equal_white.png';

  document.getElementById('urgent').style.background = 'rgb(255, 255, 255)' 
  document.getElementById('urgent-img').src = '../assets/img/urgent_red.png';
  document.getElementById('low').style.background = 'rgb(255, 255, 255)' 
  document.getElementById('low-img').src = '../assets/img/low_green.png';
}

function lowStyle() {
  urgent = false;
  medium = false;
  low = true;
  document.getElementById('low').style.background = 'rgb(122, 226, 41)' 
  document.getElementById('low-img').src = '../assets/img/low_white.png';

  document.getElementById('urgent').style.background = 'rgb(255, 255, 255)' 
  document.getElementById('urgent-img').src = '../assets/img/urgent_red.png';
  document.getElementById('medium').style.background = 'rgb(255, 255, 255)' 
  document.getElementById('medium-img').src = '../assets/img/equal_orange.png';
}

/**
 *
 *
 */
function clearTaskForm(){
    document.getElementById("add-task-form").reset();
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
function onSubmit(){
  let title = document.getElementById('task-title').value;
  let description = document.getElementById('task-description').value;
  let assignedTo = document.getElementById('task-assigned-to').value;
  let date = document.getElementById('task-date').value;
  let category = document.getElementById('task-category').value;
  let subtasks = document.getElementById('task-subtasks').value;
  taskPriority();
  if(title && date && category !== ''){
    tasks.push({"title": title, "description": description, "assignedTo": assignedTo, "date": date, "priority": priority, "category": category, "subtasks": subtasks});
    save();
  }
}

/**
 *
 *
 * @return {*} 
 */
function taskPriority(){
  if(urgent){
    priority = 'Urgent';
  } else if(medium){
    priority = 'Medium';
  } else if(low){
    priority = 'Low';
  }
  return priority;
}

/**
 *
 *
 */
function save(){
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

/**
 *
 *
 */
function load(){
  let tasksAsText = localStorage.getItem('tasks');
  if(tasksAsText){
      tasks = JSON.parse(tasksAsText);
  }
}




let options = ['Summary', 'Task', 'Board', 'Contact'];

document.addEventListener('DOMContentLoaded', function() {
  
  
  // Add dropdown with data from options
  dropdownCategory();
  
    // Event listener to toggle the dropdown when clicking on the input or the icon
    const searchInput = document.getElementById('task-category');
    const dropdownToggle = document.getElementById('task-category-icon');
    searchInput.addEventListener('click', toggleDropdown);
    dropdownToggle.addEventListener('click', toggleDropdown);
  
    // Event listener to close dropdown when clicking outside of it
    document.body.addEventListener('click', function(event) {
      if (event.target !== searchInput && event.target !== dropdownToggle) {
        searchDropdown.style.display = 'none';
        dropdownToggle.classList.remove('opened'); 
      }
    });
});

function dropdownCategory(){
  const searchInput = document.getElementById('task-category');
  const searchDropdown = document.getElementById('task-category-dropdown');
  const dropdownToggle = document.getElementById('task-category-icon');
  populateDropdown(searchInput, searchDropdown, dropdownToggle);
  toggleDropdown(searchInput, searchDropdown, dropdownToggle);
  // return {searchInput, searchDropdown, dropdownToggle}
}

function populateDropdown(searchInput, searchDropdown, dropdownToggle) {
  searchDropdown.innerHTML = '';
  options.forEach(option => {
    const optionElement = document.createElement('div');
    optionElement.textContent = option;
    optionElement.classList.add('category-dropdown-item');
    optionElement.addEventListener('click', function() {
      searchInput.value = option;
      searchDropdown.style.display = 'none';
    });
    searchDropdown.appendChild(optionElement);
  });
  searchDropdown.style.display = 'block'; // Always show dropdown
  dropdownToggle.classList.add('opened'); // Add the opened class to the dropdown icon
}

function toggleDropdown(searchInput, searchDropdown, dropdownToggle) {
  if (searchDropdown.style.display === 'block') {
    searchDropdown.style.display = 'none';
    dropdownToggle.classList.remove('opened'); 
  } else {
    populateDropdown();
    searchDropdown.style.display = 'block';
    searchInput.focus();
  }
}