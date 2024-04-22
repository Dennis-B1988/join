/**
 * Focuses the task subtasks input element.
 *
 * @return {void} This function does not return anything.
 */
function openSubtask() {
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
    let subtask = {
    'subtask': subtaskValue,
    'completed': false
  }
  subtaskArray.push(subtask);
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
function addSubtaskDoubleClick() {
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
function emptySubtask() {
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
    for (let j = 0; j < subtaskArray.length; j++) {
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

/**
 * Saves the edited subtask at the specified index.
 *
 * @param {number} index - The index of the subtask to be edited.
 * @return {void} This function does not return anything.
 */
function saveEditedSubtask(index) {
  const input = document.getElementById(`edit-input-${index}`);
  const text = input.value.trim();
  if (text) {
    subtaskArray[index].subtask = text;
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