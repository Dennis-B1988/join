async function initContacts() {
    await includeHTML();
    await loadData();
    await initTemplate();
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


function openOrCloseContact() {
    let bigContactContainer = document.getElementById('bigContactContainer');
    bigContactContainer.classList.toggle('show-contact');
}


function saveContacts() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let noMatchEmail = document.getElementById('noMatchEmail');
    if (existingEmail(email)) {
        showErrorMessage(email, noMatchEmail)
    } else {
        let contact = {
            'name': name.value,
            'email': email.value,
            'password': phone.value,
        };
        contacts.push(contact);
        setItem('contacts', contacts);
        resetValues(name, email, phone);
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