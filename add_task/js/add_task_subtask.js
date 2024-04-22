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
 * Adds an event listener to the task subtasks input for the Enter key press, triggering the addition of a subtask.
 *
 * @param {Event} event - The event object representing the key press.
 * @return {void} This function does not return anything.
 */
function subtaskOnEnter(){
document.getElementById('task-subtasks-input').addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addSubtask();
    }
  });
}

/**
 * Renders the subtasks list on the webpage.
 *
 * @param {Array} subtaskArray - An array of subtasks.
 * @return {undefined} This function does not return a value.
 */
function renderSubtasks() {
  const subtaskList = document.getElementById('task-subtasks-list');
  subtaskList.innerHTML = subtaskArray.map((subtask, i) => addSubtaskList(subtask, i)).join('');

  addSubtaskDoubleClick();
}

/**
 * Adds a double click event listener to each subtask item in the subtaskArray.
 * When a subtask item is double clicked, the editSubtask function is called with the i of the subtask item.
 *
 * @return {void} This function does not return anything.
 */
function addSubtaskDoubleClick() {
  subtaskArray.forEach((_, i) => {
    const subtaskItem = document.getElementById(`subtask-${i}`);
    subtaskItem.addEventListener('dblclick', () => editSubtask(i));
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
 * @param {number} i - The index of the subtask item to be edited.
 * @return {void} This function does not return anything.
 */
function editSubtask(i) {
  const listItem = document.getElementById(`subtask-${i}`);
  const subtaskText = listItem.textContent.trim();
  listItem.innerHTML = changeSubtaskToInput(i, subtaskText);

  document.getElementById(`subtask-icons-${i}`).classList.add('hidden');
  document.getElementById(`subtask-icons-${i}`).classList.remove('subtask-icons');
  document.getElementById(`subtask-icons-edit-${i}`).classList.remove('hidden');

  const inputElement = document.getElementById(`edit-input-${i}`);
  inputElement.focus();
  inputElement.selectionStart = inputElement.selectionEnd = inputElement.value.length;
}

/**
 * Saves the edited subtask at the specified i.
 *
 * @param {number} i - The index of the subtask to be edited.
 * @return {void} This function does not return anything.
 */
function saveEditedSubtask(i) {
  const input = document.getElementById(`edit-input-${i}`);
  const text = input.value.trim();
  if (text) {
    subtaskArray[i].subtask = text;
    const listItem = document.getElementById(`subtask-${i}`);
    listItem.textContent = text;
    showSubtaskIcons(i);
  } else {
    deleteSubtask(i);
  }
}

/**
 * Saves the edited subtask when the Enter key is pressed.
 *
 * @param {Event} event - The event object representing the key press.
 * @param {number} index - The index of the subtask being edited.
 * @return {void} This function does not return anything.
 */
function saveEditedSubtaskOnEnter(event, index) {
  if (event.key === "Enter") {
    saveEditedSubtask(index);
  }
}

/**
 * Shows the subtask icons for a given i.
 *
 * @param {number} i - The index of the subtask.
 * @return {void} This function does not return anything.
 */
function showSubtaskIcons(i) {
  const icons = document.getElementById(`subtask-icons-${i}`);
  const iconsEdit = document.getElementById(`subtask-icons-edit-${i}`);
  icons.classList.add('subtask-icons');
  icons.classList.remove('hidden');
  iconsEdit.classList.add('hidden');
}