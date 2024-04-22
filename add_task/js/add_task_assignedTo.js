/**
 * Renders a user list in the assigned to dropdown.
 *
 * @return {void} This function does not return anything.
 */
function createUserList() {
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

  for (let i = 0; i < contacts.length; i++) {
    let user = contacts[i].name;
    let initials = generateInitials(user);

    renderUser(assignedDropdown, i, user, initials);
    styleUserInitials(i);
  }
}


function renderUser(dropdown, userIndex, userName, initials) {
  let currentUser;
  if (loadPage('user') === null || loadPage('user') === undefined) {
    currentUser = users[0];
  } else {
    currentUser = users[loadPage('user')].name;
  }
  const userLabel = userName + (userName === currentUser ? ' (YOU)' : '');
  dropdown.innerHTML += renderAssignedToDropdown(userIndex, userLabel, initials);
}

/**
 * Sets the background color of the element with the id `user-initials-${i}` to the color specified in `contacts[i].color`.
 *
 * @param {number} i - The index of the user whose initials are being styled.
 * @return {void} This function does not return anything.
 */
function styleUserInitials(i) {
  document.getElementById(`user-initials-${i}`).style.backgroundColor = contacts[i].color;
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
 * Toggles the display of the assigned to dropdown. If the dropdown is currently hidden, it is displayed and the assigned icon is changed. 
 * If the dropdown is currently displayed, it is hidden and the assigned icon is changed.
 *
 * @return {void} This function does not return anything.
 */
function assignedToDropdown() {
  let assignedToDropdown = document.getElementById('task-assigned-to-dropdown');
  let assignedToDropdownContainer = document.getElementById('task-assigned-to-dropdown-container');
  if (assignedToDropdown.style.display !== 'flex') {
    assignedToDropdown.style.display = 'flex';
    assignedToDropdownContainer.style.display = 'flex';
    changeAssignedIcon();
  } else {
    assignedToDropdown.style.display = 'none';
    assignedToDropdownContainer.style.display = 'none';
    changeAssignedIcon();
  }
}

/**
 * Toggles the checkmark image and updates the assigned users list and display based on the given i.
 *
 * @param {number} i - The index of the user in the contacts array.
 * @return {void} This function does not return a value.
 */
function userCheckmark(i) {
  const checkmark = document.getElementById(`checkmark-${i}`);
  if (checkmark.src.includes('/assets/img/checkmark-empty_dark.png')) {
    checkmark.src = '../assets/img/checkmark_checked_white.png';
    addUserToAssignedUsers(i);
    displayUsers();
    checkedBackgroundDark(i);
  } else {
    checkmark.src = '../assets/img/checkmark-empty_dark.png';
    removeUserFromAssignedUsers(i);
    displayUsers();
    checkedBackgroundWhite(i);
  }
}

/**
 * Adds the user at the given index to the list of assigned users.
 *
 * @param {number} i - The index of the user to be added.
 * @return {void} This function does not return anything.
 */
function addUserToAssignedUsers(i) {
  assignedUsers.push(contacts[i]);
}

/**
 * Removes a user from the list of assigned users.
 *
 * @param {number} i - The index of the user to be removed.
 * @return {undefined} This function does not return a value.
 */
function removeUserFromAssignedUsers(i) {
  let userIndex = assignedUsers.findIndex(user => user.name === contacts[i].name);
  if (userIndex !== -1) assignedUsers.splice(userIndex, 1);
}

/**
 * Sets the background color of the assigned dropdown item to a dark color and the text color of the assigned dropdown user to white.
 *
 * @param {number} i - The index of the assigned dropdown item to apply the styling to.
 * @return {void} This function does not return anything.
 */
function checkedBackgroundDark(i) {
  document.getElementById(`assigned-dropdown-item-${i}`).style.backgroundColor = 'rgb(42, 54, 71)';
  document.getElementById(`assigned-dropdown-user-${i}`).style.color = 'rgb(255, 255, 255)';
}

/**
 * Set the background color of the assigned dropdown item to white and the text color to black.
 *
 * @param {number} i - The index of the assigned dropdown item to apply the styling.
 * @return {void} This function does not return anything.
 */
function checkedBackgroundWhite(i) {
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
  for (let i = 0; i < assignedUsers.length; i++) {
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
  const dropdownClosed = '../assets/img/drop_down.png';
  const dropdownOpen = '../assets/img/drop_down_mirror.png';
  dropdownIcon.src = dropdownIcon.src.endsWith('drop_down.png') ? dropdownOpen : dropdownClosed;
}

/**
 * Unchecks all the checkboxes by setting their source to an empty dark checkmark image, clears the assigned users array,
 * and empties the inner HTML of the 'assigned-to-users' element.
 *
 * @return {undefined} This function does not return a value.
 */
function uncheckAll() {
  for (let i = 0; i < contacts.length; i++) {
    const checkmark = document.getElementById(`checkmark-${i}`);
    checkmark.src = '../assets/img/checkmark-empty_dark.png';
    checkedBackgroundWhite(i);
  }
  assignedUsers = [];
  document.getElementById('assigned-to-users').innerHTML = '';
}

/**
 * Sorts the usernames based on the current user, and updates the 'contacts' and 'assignedUsers' arrays accordingly.
 *
 * @return {void} This function does not return anything.
 */
function sortUsernames() {
  let currentUser;
  if (loadPage('user') === null || loadPage('user') === undefined) {
    currentUser = users[0];
  } else {
    currentUser = users[loadPage('user')];
    contacts.sort((firstUser, otherUser) => {
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
}

/**
 * Close assigned to dropdown when clicking outside of it.
 *
 * @param {Event} event - The click event.
 * @param {HTMLElement} dropdown - The assigned to dropdown element.
 * @return {void}
 */
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