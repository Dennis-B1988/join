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
    if (window.innerWidth <= 750) {
        goBackToLeftContainer()
    }
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
    if (window.innerWidth <= 750) {
        document.querySelector('.mobile-edit-delete-container').classList.remove('show-container');
        backgroundMobileEditDeleteContainer.style.display = 'none';
    } else {
        let animation = document.querySelector(`.animation${indexI}${indexJ}`);
        animation.classList.add('contact-container-active');
    }
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