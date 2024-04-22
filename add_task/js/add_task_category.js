/**
 * Renders the category input and dropdown, and toggles the category dropdown
 * when the category icon is clicked. Also changes the category icon based
 * on its current source.
 *
 * @return {void} This function does not return anything.
 */
function renderCategory() {
  const categoryInput = document.getElementById('task-category');
  const categoryDropdown = document.getElementById('task-category-dropdown');
  const dropdownToggle = document.getElementById('task-category-icon');
  toggleDropdown(categoryInput, categoryDropdown, dropdownToggle);
  changeCategoryIcon();
}

/**
 * Fills the category dropdown with category elements.
 *
 * @param {HTMLElement} categoryInput - The input element associated with the category dropdown.
 * @param {HTMLElement} categoryDropdown - The category dropdown element.
 * @param {HTMLElement} dropdownToggle - The toggle element that controls the dropdown.
 * @return {void} This function does not return anything.
 */
function categoryDropdownFill(categoryInput, categoryDropdown, dropdownToggle) {
  categoryDropdown.innerHTML = '';
  createCategoryElements(categoryInput, categoryDropdown, dropdownToggle);
}

/**
 * Creates category elements for the given category input and dropdown, and appends them to the dropdown.
 *
 * @param {HTMLInputElement} categoryInput - The input element associated with the category dropdown.
 * @param {HTMLElement} categoryDropdown - The category dropdown element.
 * @return {void} This function does not return a value.
 */
function createCategoryElements(categoryInput, categoryDropdown) {
  categoryList.forEach(option => {
    const categoryElement = createCategoryElement(option, categoryInput, categoryDropdown);
    categoryDropdown.appendChild(categoryElement);
  });
}

/**
 * Creates a category element with the given option, attaches an event listener to it, and returns it.
 *
 * @param {string} option - The text content of the category element.
 * @param {HTMLInputElement} categoryInput - The input element associated with the category dropdown.
 * @param {HTMLElement} categoryDropdown - The category dropdown element.
 * @return {HTMLDivElement} The created category element.
 */
function createCategoryElement(option, categoryInput, categoryDropdown) {
  const categoryElement = document.createElement('div');
  categoryElement.textContent = option;
  categoryElement.classList.add('category-dropdown-item');
  categoryElement.addEventListener('click', function () {
    categoryInput.value = option;
    categoryDropdown.style.display = 'none';
  });
  return categoryElement;
}

/**
 * Toggles the visibility of a dropdown menu based on its current state.
 *
 * @param {HTMLElement} categoryInput - The input element associated with the dropdown.
 * @param {HTMLElement} categoryDropdown - The dropdown menu to toggle.
 * @param {HTMLElement} dropdownToggle - The toggle element that controls the dropdown.
 * @return {void} This function does not return anything.
 */
function toggleDropdown(categoryInput, categoryDropdown, dropdownToggle) {
  if (categoryDropdown.style.display === 'block') {
    categoryDropdown.style.display = 'none';
  } else {
    categoryDropdownFill(categoryInput, categoryDropdown, dropdownToggle);
    categoryDropdown.style.display = 'block';
    categoryInput.focus();
  }
}

/**
 * Changes the category icon based on its current source.
 *
 * @param {string} id - The id of the category icon element.
 * @return {void} This function does not return anything.
 */
function changeCategoryIcon() {
  const dropdownIcon = document.getElementById('task-category-icon');
  const src = dropdownIcon.src;

  if (src.endsWith('drop_down.png')) {
    dropdownIcon.src = '../assets/img/drop_down_mirror.png';
  } else {
    dropdownIcon.src = '../assets/img/drop_down.png';
  }
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
    closeCategoryDropdown(event, dropdownCategory);
    closeAssignedToDropdown(event, dropdownAssignedTo)
  });
});

/**
 * Close the category dropdown when clicking outside of it.
 *
 * @param {Event} event - The click event.
 * @param {HTMLElement} dropdown - The category dropdown element.
 * @return {void} This function does not return anything.
 */
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