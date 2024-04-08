async function initTasks(){
    await includeHTML();
    getCurrentDate();
}



function urgent() {
    document.getElementById('urgent').style.background = '#FF3D00' 
    document.getElementById('urgent-img').src = '../assets/img/urgent_white.png';

    document.getElementById('medium').style.background = '#FFFFFF' 
    document.getElementById('medium-img').src = '../assets/img/equal_orange.png';
    document.getElementById('low').style.background = '#FFFFFF' 
    document.getElementById('low-img').src = '../assets/img/low_green.png';
}

function medium() {
    document.getElementById('medium').style.background = '#FFA800' 
    document.getElementById('medium-img').src = '../assets/img/equal_white.png';

    document.getElementById('urgent').style.background = '#FFFFFF' 
    document.getElementById('urgent-img').src = '../assets/img/urgent_red.png';
    document.getElementById('low').style.background = '#FFFFFF' 
    document.getElementById('low-img').src = '../assets/img/low_green.png';
}

function low() {
    document.getElementById('low').style.background = '#7AE229' 
    document.getElementById('low-img').src = '../assets/img/low_white.png';

    document.getElementById('urgent').style.background = '#FFFFFF' 
    document.getElementById('urgent-img').src = '../assets/img/urgent_red.png';
    document.getElementById('medium').style.background = '#FFFFFF' 
    document.getElementById('medium-img').src = '../assets/img/equal_orange.png';
}

function clearTaskForm(){
    document.getElementById("add-task-form").reset();
}

function getCurrentDate() { 
    let currentDate = new Date();
    let formattedDate = currentDate.getFullYear() + "-" + padZeroes(currentDate.getMonth() + 1) + "-" + padZeroes(currentDate.getDate());

    document.getElementById("date").min = formattedDate;

    function padZeroes(num) {
        return num < 10 ? '0' + num : num;
    }
}




document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('task-category');
    const searchDropdown = document.getElementById('searchDropdown');
    const dropdownToggle = document.getElementById('task-category-icon');
    
    // Array of example options
    const options = ['Summary', 'Task', 'Board', 'Contact'];
  
    // Function to populate the dropdown with options
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
        searchDropdown.style.display = 'block'; // Always show dropdown
        dropdownToggle.classList.add('opened'); // Add the opened class to the dropdown icon
      }
    
      // Event listener to toggle the dropdown when clicking on the input or the icon
      function toggleDropdown() {
        if (searchDropdown.style.display === 'block') {
          searchDropdown.style.display = 'none';
          dropdownToggle.classList.remove('opened'); // Remove the opened class
        } else {
          populateDropdown();
          searchDropdown.style.display = 'block';
          searchInput.focus();
        }
      }
    
      searchInput.addEventListener('click', toggleDropdown);
      dropdownToggle.addEventListener('click', toggleDropdown);
    
      // Event listener to close dropdown when clicking outside of it
      document.body.addEventListener('click', function(event) {
        if (event.target !== searchInput && event.target !== dropdownToggle) {
          searchDropdown.style.display = 'none';
          dropdownToggle.classList.remove('opened'); // Remove the opened class
        }
      });
});