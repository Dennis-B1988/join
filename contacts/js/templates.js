/**
 * Generates the HTML template for a contact container.
 *
 * @param {Object} contact - The contact object containing name, email, and initials.
 * @param {number} i - The index of the letter in the alphabet.
 * @param {number} j - The index of the contact within the letter.
 * @param {string} firstNameInitial - The initial of the first name of the contact.
 * @param {string} lastNameInitial - The initial of the last name of the contact.
 * @return {string} The HTML template for the contact container.
 */
function contactsTemplate(contact, i, j, firstNameInitial, lastNameInitial) {
    return /*html*/`
        <div onclick="desktopOrMobileFunction(${i}, ${j}, '${firstNameInitial}', '${lastNameInitial}')" class="contact-container animation${i}${j}">
            <div class="circle circle${i}${j}">${firstNameInitial}${lastNameInitial}</div>
            <div class="contact-description">
                <span>${contact.name}</span>
                <span class="contact-email">${contact.email}</span>
            </div>
        </div>
    `;
}


/**
 * Generates the HTML template for the right side of the contact container.
 *
 * @param {Object} contact - The contact object containing name, email, phone, and color.
 * @param {number} i - The index of the letter in the alphabet.
 * @param {number} j - The index of the contact within the letter.
 * @param {string} firstNameInitial - The initial of the first name of the contact.
 * @param {string} lastNameInitial - The initial of the last name of the contact.
 * @return {string} The HTML template for the right side of the contact container.
 */
function contactsRightSiteTemplate(contact, i, j, firstNameInitial, lastNameInitial) {
    return /*html*/ `
        <div class="contact-upper-container">
            <div class="circle-big circle-big${i}${j}">${firstNameInitial}${lastNameInitial}</div>
            <div class="contact-action-big">
                <span id="contactName">${contact.name}</span>
                <div class="edit-delete-container">
                    <div onclick="showEditContact('${firstNameInitial}', '${lastNameInitial}', '${contact.email}')" id="edit" class="edit"></div>
                    <div onclick="deleteContact('${contact.email}')" class="delete"></div>
                </div>
            </div>
        </div>
        <div class="contact-information">Contact Information</div>
        <div class="information-container">
            <span class="information-headline">Email</span>
            <span id="contactEmail" class="contact-email">${contact.email}</span>
            <span class="information-headline">Phone</span>
            <span id="contactPhone">${contact.phone}</span>
        </div>
        <div style="display: none;" onclick="openOrCloseMobileEditDeleteContainer(event, 'backgroundMobileEditDeleteContainer')" id="backgroundMobileEditDeleteContainer" class="background-mobile-edit-delete-container">
            <div class="mobile-edit-delete-container">
                <div onclick="showEditContact('${firstNameInitial}', '${lastNameInitial}', '${contact.email}')" id="editMobile" class="edit"></div>
                <div onclick="deleteContact('${contact.email}')" class="delete"></div>
            </div>
      </div>
    `;
}