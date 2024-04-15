let findedContact;
let indexI;
let indexJ;


async function initContacts() {
    await includeHTML();
    await loadData();
    await initTemplate();
    showContacts();
}


function openOrCloseAddContact(event, id, child) {
    if (event.target.tagName === child || event.target.id === id) {
        showAddContactOrEditContact('none', '');
        resetValues();
        toggleAnimation();
    }
}


function showEditContact(firstNameLetter, lastNameLetter, contactEmail) {
    findedContact = contacts.filter(contact => contact.email === contactEmail);
    showAddContactOrEditContact('', 'none');
    currentValueFromContact();
    toggleAnimation();
    circleBig.style.backgroundColor = findedContact[0].color;
    circleBig.innerHTML = firstNameLetter + lastNameLetter;
}


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


function resetValues() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    name.value = '';
    email.value = '';
    phone.value = '';
}


function currentValueFromContact() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    name.value = findedContact[0].name;
    email.value = findedContact[0].email;
    phone.value = findedContact[0].phone;
}


function toggleAnimation() {
    let bigContainer = document.getElementById('bigContainer');
    let smallContainer = document.getElementById('smallContainer');
    bigContainer.classList.toggle('show-background');
    smallContainer.classList.toggle('show-add-contact');
}


function openOrCloseContact(i, j, firstNameInitial, lastNameInitial) {
    let bigContactContainer = document.getElementById('bigContactContainer');
    let animation = document.querySelector(`.animation${i}${j}`);
    indexI = i;
    indexJ = j;
    let contactContainer = document.querySelectorAll('.contact-container');
    const letterKey = letters[i];
    const contactsForLetter = contacts.filter(contact => {
        const nameParts = contact.name.split(' ');
        const firstNameInitial = nameParts[0].charAt(0);
        return firstNameInitial === letterKey;
    });
    bigContactContainer.innerHTML = contactsRightSiteTemplate(contactsForLetter[j], i, j, firstNameInitial, lastNameInitial);
    document.querySelector(`.circle-big${i}${j}`).style.backgroundColor = contactsForLetter[j].color;
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


function saveContacts() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let noMatchEmail = document.getElementById('noMatchEmail');
    const randomIndex = Math.floor(Math.random() * colors.length);
    const randomColor = colors[randomIndex];
    if (existingEmail(email)) {
        showErrorMessage(email, noMatchEmail)
    } else {
        let contact = {
            'name': name.value,
            'email': email.value,
            'phone': phone.value,
            'color': randomColor
        };
        contacts.push(contact);
        setItem('contacts', contacts);
        resetValues();
        showContacts();
        const nameParts = contact.name.split(' ');
        const firstNameInitial = nameParts[0].charAt(0);
        const lastNameInitial = nameParts[1].charAt(0);
        document.getElementById('bigContactContainer').innerHTML = contactsRightSiteTemplate(contact, contacts.length, contacts.length, firstNameInitial, lastNameInitial);
        document.querySelector(`.circle-big${contacts.length}${contacts.length}`).style.backgroundColor = contact.color;
        document.getElementById('bigContactContainer').classList.add('show-contact');
        document.querySelectorAll('.contact-container').forEach(contactContainer => {
            const firstSpan = contactContainer.querySelector('span');
            if (firstSpan.innerHTML === contact.name) {
                const parentElement = firstSpan.parentElement.parentElement;
                parentElement.classList.add('contact-container-active');
                parentElement.scrollIntoView({ behavior: 'auto', block: 'center' });
            }
        });
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
}


function existingEmail(email) {
    let index = contacts.findIndex(contact => contact.email === email.value);
    if (index !== -1) {
        return true;
    } else {
        return false;
    }
}


function showErrorMessage(input, message) {
    input.style.borderColor = 'red';
    message.style = '';
    setTimeout(function () {
        input.style.borderColor = '';
        message.style.display = 'none';
    }, 3000);
}


function showContacts() {
    const contactsContainer = document.getElementById('contacts');
    contactsContainer.innerHTML = '';
    letters.forEach((letter, i) => {
        const contactsForLetter = contacts.filter(contact => {
            const nameParts = contact.name.split(' ');
            const firstNameInitial = nameParts[0].charAt(0);
            return firstNameInitial === letter;
        });
        if (contactsForLetter.length !== 0) {
            contactsContainer.innerHTML += `
                <div class="first-letter">${letter}</div>
                <div class="underline"></div>
            `;
        }
        contactsForLetter.forEach((contact, j) => {
            const nameParts = contact.name.split(' ');
            const firstNameInitial = nameParts[0].charAt(0);
            const lastNameInitial = nameParts[1] ? nameParts[1].charAt(0) : '';
            contactsContainer.innerHTML += contactsTemplate(contact, i, j, firstNameInitial, lastNameInitial);
            document.querySelectorAll(`.circle${i}${j}`).forEach(circle => {
                circle.style.backgroundColor = contact.color;
            });
        });
    });
}


function deleteContact(contactEmail) {
    let email = document.getElementById('email');
    if (contactEmail === 'contact.email') {
        contactEmail = email.value;
    }
    const index = contacts.findIndex(contact => contact.email === contactEmail);
    contacts.splice(index, 1);
    document.getElementById('bigContactContainer').classList.remove('show-contact');
    document.getElementById('bigContainer').classList.remove('show-background');
    document.getElementById('smallContainer').classList.toggle('show-add-contact');
    setItem('contacts', contacts);
    showContacts();
}


function saveEditContact() {
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
    document.getElementById('bigContainer').classList.remove('show-background');
    setItem('contacts', contacts);
    showContacts();
    let animation = document.querySelector(`.animation${indexI}${indexJ}`);
    animation.classList.add('contact-container-active');
}