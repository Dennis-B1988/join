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


function openOrCloseContact() {
    let bigContactContainer = document.getElementById('bigContactContainer');
    let contactContainer = document.querySelector('.contact-container');
    bigContactContainer.classList.toggle('show-contact');
    contactContainer.classList.toggle('contact-container-active');
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
            'password': phone.value,
            'color': randomColor
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


function showContacts() {
    const contactsContainer = document.getElementById('contacts');
    contactsContainer.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        letters.forEach(letter => {
            const letterKey = Object.keys(letter)[0];
            const nameParts = contact.name.split(' ');
            const firstNameInitial = nameParts[0].charAt(0);
            if (letterKey === firstNameInitial) {
                const indexOfLetter = letters.indexOf(letter);
                letters[indexOfLetter][letterKey].push(contact);
            }
        });
        letters.forEach(letter => {
            console.log(letter)
            const letterKey = Object.keys(letter)[0];
            if (letter[letterKey].length !== 0) {
                contactsContainer.innerHTML = `
                <div class="first-letter">${letterKey}</div>
                <div class="underline"></div>
                `;
            }
            for (let j = 0; j < letter[letterKey].length; j++) {
                const contact = letter[letterKey][j];
                const nameParts = contact.name.split(' ');
                const firstNameInitial = nameParts[0].charAt(0);
                const lastNameInitial = nameParts[1].charAt(0);
                contactsContainer.innerHTML += contactsTemplate(contact, i, j, firstNameInitial, lastNameInitial);
                document.querySelector(`.circle${i}${j}`).style.backgroundColor = contact.color;
            }
            
        });
    }
}