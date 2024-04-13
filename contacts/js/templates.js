function contactsTemplate(contact, i, j, firstNameInitial, lastNameInitial) {
    return /*html*/`
        <div onclick="openOrCloseContact()" class="contact-container">
        <div class="circle circle${i}${j}">${firstNameInitial}${lastNameInitial}</div>
        <div class="contact-description">
            <span>${contact.name}</span>
            <span class="contact-email">${contact.email}</span>
        </div>
        </div>
    `;
}