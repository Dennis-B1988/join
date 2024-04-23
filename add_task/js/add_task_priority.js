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