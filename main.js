const typedText = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');
const textArray = ['JavaScript', 'HTML', 'CSS', 'Node.js', 'Java', 'Python', 'Django Rest Framework'];
const typingDelay = 100;
const erasingDelay = 70;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

// Simular que se está escribiendo en el html
function type() {
    if(charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    }
    else {
        cursorSpan.classList.remove('typing');
        setTimeout(erase, newTextDelay)
    }
}

// Simular que se borra en el html
function erase() {
    if(charIndex > 0) {
        if(!cursorSpan.classList.contains('typing')) cursorSpan.classList.add('typing');
        typedText.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    }
    else {
        cursorSpan.classList.remove('typing');
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if(textArray.length) setTimeout(type, newTextDelay + 250);
});

//Crear la funcionalidad para el modo oscuro
const btnSwitch = document.querySelector('.switch');
btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active')
});

//Validar el form
const userName = document.getElementById("name");
const userEmail = document.getElementById('email');
const userPhone = document.getElementById('phone');
const userAsunto = document.getElementById('asunto');
const userMessage = document.getElementById('message');
const form = document.getElementById('form');


form.addEventListener("submit", e => {
    e.preventDefault();
    let regExpEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$|^$/
    let regExpName = /^[A-Za-z]*$/
    let regExpPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$|^$/g


    if(userName.value == '') {
        alert('Debe de ingresar su nombre');
    }
    if(userEmail.value == '' && userPhone.value == '') {
        alert('Debe de ingresar al menos un correo electrónico o un teléfono para poder contactarte');
    }
    if(userMessage.value == '') {
        alert('Debe de ingresar algún mensaje');
    }
    if(!regExpName.test(userName.value)) {
        alert('Su nombre no debe de contener caracteres especiales');
    }
    if(!regExpEmail.test(userEmail.value)) {
        alert('Su correo electrónico no cuenta con el formato correcto');
    }
    if(!regExpPhone.test(userPhone.value)) {
        alert('Su teléfono no cuenta con el formato correcto');
    }
})

