let contactsForLetter;
let findedContact;
let indexI;
let indexJ;


/**
 * Initializes the contacts functionality.
 *
 * @return {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function initContacts() {
    await includeHTML();
    await loadData();
    await initTemplate();
    showContacts();
}


/**
 * Toggles the visibility of the add contact form and performs necessary actions.
 *
 * @param {Event} event - The event that triggered the function.
 * @param {string} id - The ID of the element triggering the function.
 * @param {string} child - The tag name of the child element triggering the function.
 * @return {void} This function does not return a value.
 */
function openOrCloseAddContact(event, id, child) {
    if (event.target.tagName === child || event.target.id === id) {
        showAddContactOrEditContact('none', '');
        resetValues();
        toggleAnimation();
    }
}


/**
 * Renders the edit contact view with the provided initials and email.
 *
 * @param {string} firstNameLetter - The first letter of the first name.
 * @param {string} lastNameLetter - The first letter of the last name.
 * @param {string} contactEmail - The email of the contact.
 * @return {void} This function does not return a value.
 */
function showEditContact(firstNameLetter, lastNameLetter, contactEmail) {
    findedContact = contacts.filter(contact => contact.email === contactEmail);
    showAddContactOrEditContact('', 'none');
    currentValueFromContact();
    toggleAnimation();
    circleBig.style.backgroundColor = findedContact[0].color;
    circleBig.innerHTML = firstNameLetter + lastNameLetter;
}


/**
 * Toggles the visibility of the add contact and edit contact views.
 *
 * @param {string} edit - The display style for the edit headline, edit button, and circle big.
 * @param {string} add - The display style for the add contact headline, add contact button, and letters for icon.
 * @return {void} This function does not return a value.
 */
function showAddContactOrEditContact(edit, add) {
    let editHeadline = document.getElementById('editHeadline');
    let addContactHeadline = document.getElementById('addContactHeadline');
    let editButton = document.getElementById('editButton');
    let addContactButton = document.getElementById('addContactButton');
    let circleBig = document.getElementById('circleBig');
    let lettersForIcon = document.getElementById('lettersForIcon');
    editHeadline.style.display = edit;
    addContactHeadline.style.display = add;
    editButton.style.display = edit;
    addContactButton.style.display = add;
    circleBig.style.display = edit;
    lettersForIcon.style.display = add;
}


/**
 * Resets the values of the name, email, and phone input fields.
 *
 * @param {none} none - This function does not take any parameters.
 * @return {none} This function does not return any value.
 */
function resetValues() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    name.value = '';
    email.value = '';
    phone.value = '';
}


/**
 * Updates the name, email, and phone input fields with the values from the found contact.
 *
 * @param {none} none - This function does not take any parameters.
 * @return {none} This function does not return any value.
 */
function currentValueFromContact() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    name.value = findedContact[0].name;
    email.value = findedContact[0].email;
    phone.value = findedContact[0].phone;
}


/**
 * Toggles the visibility of bigContainer and smallContainer by adding or removing classes.
 *
 * @param {none} none - This function does not take any parameters.
 * @return {none} This function does not return any value.
 */
function toggleAnimation() {
    let bigContainer = document.getElementById('bigContainer');
    let smallContainer = document.getElementById('smallContainer');
    bigContainer.classList.toggle('show-background');
    smallContainer.classList.toggle('show-add-contact');
}


function desktopOrMobileFunction(i, j, firstNameInitial, lastNameInitial) {
    let windowWidth = window.innerWidth;
    if (windowWidth > 750) {
        openOrCloseContact(i, j, firstNameInitial, lastNameInitial);
    } else {
        mobileOpenOrCloseContact(i, j, firstNameInitial, lastNameInitial);
    }
}


function mobileOpenOrCloseContact(i, j, firstNameInitial, lastNameInitial) {
    toggleMobileLeftContainerOrRightContainer();
    indexI = i;
    indexJ = j;
    const letterKey = letters[i];
    duplicateFirstLetterOfFirstNameAndLastName(letterKey);
    document.getElementById('bigContactContainer').innerHTML = contactsRightSiteTemplate(contactsForLetter[j], i, j, firstNameInitial, lastNameInitial);
    document.querySelector(`.circle-big${i}${j}`).style.backgroundColor = contactsForLetter[j].color;
}


function toggleMobileLeftContainerOrRightContainer() {
    document.querySelector('.left-container').style.display = 'none';
    document.querySelector('.right-container').style.display = 'unset';
    document.getElementById('goBackArrow').style.display = 'unset';
    document.querySelector('.contact-mobile-line-img').style.display = 'unset';
    document.querySelector('.contact-line-img').style.display = 'none';
    document.querySelector('.menu-contact-option').style.display = 'unset';
}


function goBackToLeftContainer() {
    document.querySelector('.left-container').style.display = 'unset';
    document.querySelector('.right-container').style = '';
    document.getElementById('goBackArrow').style.display = 'none';
    document.querySelector('.contact-mobile-line-img').style.display = 'none';
    document.querySelector('.contact-line-img').style.display = 'unset';
    document.querySelector('.menu-contact-option').style.display = 'none';
}


function openOrCloseMobileEditDeleteContainer(event, id) {
    let backgroundMobileEditDeleteContainer = document.getElementById('backgroundMobileEditDeleteContainer');
    let targetElement = event.target;
    if (targetElement.id === id) {
        document.querySelector('.mobile-edit-delete-container').classList.remove('show-container');
        backgroundMobileEditDeleteContainer.style.display = 'none';
    } else {
        backgroundMobileEditDeleteContainer.style = '';
        setTimeout(() => {
            document.querySelector('.mobile-edit-delete-container').classList.add('show-container');
        }, 100);
    }
}


/**
 * Opens or closes a contact based on the provided parameters.
 *
 * @param {number} i - The index of the letter in the alphabet.
 * @param {number} j - The index of the contact within the letter.
 * @param {string} firstNameInitial - The initial of the first name of the contact.
 * @param {string} lastNameInitial - The initial of the last name of the contact.
 */
function openOrCloseContact(i, j, firstNameInitial, lastNameInitial) {
    let bigContactContainer = document.getElementById('bigContactContainer');
    let animation = document.querySelector(`.animation${i}${j}`);
    indexI = i;
    indexJ = j;
    let contactContainer = document.querySelectorAll('.contact-container');
    const letterKey = letters[i];
    duplicateFirstLetterOfFirstNameAndLastName(letterKey);
    bigContactContainer.innerHTML = contactsRightSiteTemplate(contactsForLetter[j], i, j, firstNameInitial, lastNameInitial);
    document.querySelector(`.circle-big${i}${j}`).style.backgroundColor = contactsForLetter[j].color;
    handleAnimation(contactContainer, animation, bigContactContainer);
}


/**
 * Filters the contacts array to include only those contacts whose first name initial matches the given letter key.
 *
 * @param {string} letterKey - The letter key to match against the first name initials of the contacts.
 * @return {Array} An array of contacts whose first name initial matches the given letter key.
 */
function duplicateFirstLetterOfFirstNameAndLastName(letterKey) {
    contactsForLetter = contacts.filter(contact => {
        const nameParts = contact.name.split(' ');
        const firstNameInitial = nameParts[0].charAt(0);
        return firstNameInitial === letterKey;
    });
}


/**
 * Handles the animation of a contact container by adding or removing classes.
 *
 * @param {NodeList} contactContainer - The list of contact containers.
 * @param {HTMLElement} animation - The animation element.
 * @param {HTMLElement} bigContactContainer - The big contact container element.
 * @return {void} This function does not return a value.
 */
function handleAnimation(contactContainer, animation, bigContactContainer) {
    if (animation.classList.contains('contact-container-active')) {
        animation.classList.remove('contact-container-active');
        bigContactContainer.classList.remove('show-contact');
    } else {
        contactContainer.forEach(contact => {
            contact.classList.remove('contact-container-active');
        });
        bigContactContainer.classList.remove('show-contact');
        setTimeout(() => {
            bigContactContainer.classList.add('show-contact');
            animation.classList.add('contact-container-active');
        }, 100);
    }
}


/**
 * Saves the contact information entered by the user.
 *
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 * @param {string} phone - The phone number of the contact.
 * @return {void} This function does not return a value.
 */
function saveContacts() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let noMatchEmail = document.getElementById('noMatchEmail');
    if (existingEmail(email)) {
        showErrorMessage(email, noMatchEmail)
    } else {
        addContactAndShowMessage(name, email, phone);
    }
}


/**
 * Adds a new contact to the list of contacts, saves the contact information, resets the form fields,
 * displays the updated list of contacts, displays the details of the newly added contact, highlights
 * the newly added contact, and toggles the containers to show a success message.
 *
 * @param {Object} name - The name input field.
 * @param {Object} email - The email input field.
 * @param {Object} phone - The phone number input field.
 * @return {void} This function does not return a value.
 */
function addContactAndShowMessage(name, email, phone) {
    let contact = {
        'name': name.value,
        'email': email.value,
        'phone': phone.value,
        'color': randomColor()
    };
    contacts.push(contact);
    if (loadPage('guest') === 'guest') {
        savePage('contacts', contacts);
    } else {
        setItem('contacts', contacts);
    }
    resetValues();
    if (window.innerWidth > 750) {
        showContacts();
    } else {
        toggleMobileLeftContainerOrRightContainer()
    }
    displayContactDetails(contact);
    highlightContactByName(contact);
    toggleContainersAndShowMessage();
}


/**
 * Displays the details of a contact in the big contact container.
 *
 * @param {Object} contact - The contact object containing name, email, phone, and color.
 * @return {void} This function does not return a value.
 */
function displayContactDetails(contact) {
    const nameParts = contact.name.split(' ');
    const firstNameInitial = nameParts[0].charAt(0);
    const lastNameInitial = nameParts[1].charAt(0);
    document.getElementById('bigContactContainer').innerHTML = contactsRightSiteTemplate(contact, contacts.length, contacts.length, firstNameInitial, lastNameInitial);
    document.querySelector(`.circle-big${contacts.length}${contacts.length}`).style.backgroundColor = contact.color;
    document.getElementById('bigContactContainer').classList.add('show-contact');
}


/**
 * Highlights a contact container by name.
 *
 * @param {Object} contact - The contact object containing name, email, phone, and color.
 * @return {void} This function does not return a value.
 */
function highlightContactByName(contact) {
    document.querySelectorAll('.contact-container').forEach(contactContainer => {
        const firstSpan = contactContainer.querySelector('span');
        if (firstSpan.innerHTML === contact.name) {
            const parentElement = firstSpan.parentElement.parentElement;
            parentElement.classList.add('contact-container-active');
            parentElement.scrollIntoView({ behavior: 'auto', block: 'center' });
        }
    });
}


/**
 * Toggles the visibility of the bigContainer and smallContainer elements, and displays a success message for a short duration.
 *
 * @return {void} This function does not return a value.
 */
function toggleContainersAndShowMessage() {
    let bigContainer = document.getElementById('bigContainer');
    let smallContainer = document.getElementById('smallContainer');
    bigContainer.classList.toggle('show-background');
    smallContainer.classList.toggle('show-add-contact');
    let messageCreateContact = document.getElementById('messageCreateContact');
    setTimeout(() => {
        messageCreateContact.classList.add('show-message');
    }, 500);
    setTimeout(() => {
        messageCreateContact.classList.remove('show-message');
    }, 2000);
}


/**
 * Checks if the provided email already exists in the contacts array.
 *
 * @param {Object} email - The email input to check.
 * @return {boolean} Returns true if the email is already in contacts, otherwise false.
 */
function existingEmail(email) {
    let index = contacts.findIndex(contact => contact.email === email.value);
    if (index !== -1) {
        return true;
    } else {
        return false;
    }
}


/**
 * Sets the border color of the input element to red and displays the message element for 3 seconds.
 *
 * @param {HTMLInputElement} input - The input element to apply the error style to.
 * @param {HTMLElement} message - The message element to display.
 * @return {void} This function does not return a value.
 */
function showErrorMessage(input, message) {
    input.style.borderColor = 'red';
    message.style = '';
    setTimeout(function () {
        input.style.borderColor = '';
        message.style.display = 'none';
    }, 3000);
}


/**
 * Renders the list of contacts by populating the contacts container with the contacts grouped by their first letter of the first name and last name.
 *
 * @return {void} This function does not return a value.
 */
function showContacts() {
    const contactsContainer = document.getElementById('contacts');
    contactsContainer.innerHTML = '';
    letters.forEach((letter, i) => {
        duplicateFirstLetterOfFirstNameAndLastName(letter);
        filterLettersFromContact(contactsContainer, contactsForLetter, letter);
        renderContacts(contactsContainer, contactsForLetter, i);
    });
}


/**
 * Appends a div element with the class "first-letter" and the value of the letter parameter,
 * and a div element with the class "underline" to the contactsContainer element if the contactsForLetter array is not empty.
 *
 * @param {HTMLElement} contactsContainer - The element to which the new div elements will be appended.
 * @param {Array} contactsForLetter - The array of contacts for the given letter.
 * @param {string} letter - The letter for which the contacts are being filtered.
 * @return {void} This function does not return a value.
 */
function filterLettersFromContact(contactsContainer, contactsForLetter, letter) {
    if (contactsForLetter.length !== 0) {
        contactsContainer.innerHTML += `
                <div class="first-letter">${letter}</div>
                <div class="underline"></div>
            `;
    }
}


/**
 * Renders the contacts in the contacts container based on the contacts for a specific letter.
 *
 * @param {HTMLElement} contactsContainer - The container to render the contacts into.
 * @param {Array} contactsForLetter - The contacts array for the specific letter.
 * @param {number} i - The index representing the letter in the alphabet.
 * @return {void} This function does not return a value.
 */
function renderContacts(contactsContainer, contactsForLetter, i) {
    contactsForLetter.forEach((contact, j) => {
        const nameParts = contact.name.split(' ');
        const firstNameInitial = nameParts[0].charAt(0);
        const lastNameInitial = nameParts[1] ? nameParts[1].charAt(0) : '';
        contactsContainer.innerHTML += contactsTemplate(contact, i, j, firstNameInitial, lastNameInitial);
        document.querySelectorAll(`.circle${i}${j}`).forEach(circle => {
            circle.style.backgroundColor = contact.color;
        });
    });
}


/**
 * Deletes a contact from the contacts list based on the provided contact email.
 *
 * @param {string} contactEmail - The email of the contact to be deleted.
 * @return {void} This function does not return a value.
 */
function deleteContact(contactEmail) {
    let email = document.getElementById('email');
    if (contactEmail === 'contact.email') {
        contactEmail = email.value;
    }
    const index = contacts.findIndex(contact => contact.email === contactEmail);
    contacts.splice(index, 1);
    document.getElementById('bigContactContainer').classList.remove('show-contact');
    document.getElementById('bigContainer').classList.remove('show-background');
    document.getElementById('smallContainer').classList.remove('show-add-contact');
    if (loadPage('guest') === 'guest') {
        savePage('contacts', contacts);
    } else {
        setItem('contacts', contacts);
    }
    showContacts();
}


/**
 * Saves the edited contact by updating the contact information, toggling the animation,
 * updating the contacts list in local storage, showing the updated contacts, and adding
 * the 'contact-container-active' class to the animation element.
 *
 * @return {void} This function does not return a value.
 */
function saveEditContact() {
    editContact();
    toggleAnimation();
    if (loadPage('guest') === 'guest') {
        savePage('contacts', contacts);
    } else {
        setItem('contacts', contacts);
    }
    showContacts();
    let animation = document.querySelector(`.animation${indexI}${indexJ}`);
    animation.classList.add('contact-container-active');
}


/**
 * Updates the contact details with the values from the input fields and displays them in the contact container.
 *
 * @param {none} none - This function does not take any parameters.
 * @return {void} This function does not return a value.
 */
function editContact() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let contactName = document.getElementById('contactName');
    let contactEmail = document.getElementById('contactEmail');
    let contactPhone = document.getElementById('contactPhone');
    findedContact[0].name = name.value;
    findedContact[0].email = email.value;
    findedContact[0].phone = phone.value;
    contactName.innerHTML = name.value;
    contactEmail.innerHTML = email.value;
    contactPhone.innerHTML = phone.value;
}


/**
 * Submits the add or edit form and saves the contact information.
 *
 * @return {undefined} This function does not return a value.
 */
function submitAddOrEdit() {
    if (document.getElementById('editHeadline').style.display === '') {
        saveEditContact();
    } else {
        saveContacts();
    }
}