function contactsTemplate(contact, i, j, firstNameInitial, lastNameInitial) {
    return /*html*/`
        <div onclick="openOrCloseContact(${i}, ${j}, '${firstNameInitial}', '${lastNameInitial}')" class="contact-container animation${i}${j}">
            <div class="circle circle${i}${j}">${firstNameInitial}${lastNameInitial}</div>
            <div class="contact-description">
                <span>${contact.name}</span>
                <span class="contact-email">${contact.email}</span>
            </div>
        </div>
    `;
}


function contactsRightSiteTemplate(contact, i, j, firstNameInitial, lastNameInitial) {
    return /*html*/ `
        <div class="contact-upper-container">
            <div class="circle-big circle-big${i}${j}">${firstNameInitial}${lastNameInitial}</div>
            <div class="contact-action-big">
                <span>${contact.name}</span>
                <div class="edit-delete-container">
                    <div class="edit"></div>
                    <div class="delete"></div>
                </div>
            </div>
        </div>
        <div class="contact-information">Contact Information</div>
        <div class="information-container">
            <span class="information-headline">Email</span>
            <span class="contact-email">${contact.email}</span>
            <span class="information-headline">Phone</span>
            <span>${contact.phone}</span>
        </div>
    `;
}