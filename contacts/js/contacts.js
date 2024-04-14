async function initContacts() {
    await includeHTML();
    await loadData();
    await initTemplate();
    showContacts();
}


function openOrCloseAddContact(event, id, child) {
    let bigContainer = document.getElementById('bigContainer');
    let smallContainer = document.getElementById('smallContainer');
    let targetElement = event.target;
    if (targetElement.tagName === child || targetElement.id === id) {
        bigContainer.classList.toggle('show-background');
        smallContainer.classList.toggle('show-add-contact');
    }
}


function openOrCloseContact(i, j, firstNameInitial, lastNameInitial) {
    let bigContactContainer = document.getElementById('bigContactContainer');
    let animation = document.querySelector(`.animation${i}${j}`);
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
        resetValues(name, email, phone);
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


function resetValues(name, email, phone) {
    name.value = '';
    email.value = '';
    phone.value = '';
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
