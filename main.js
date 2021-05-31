const typedText = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');
const userName = document.getElementById("name");
const userEmail = document.getElementById('email');
const userPhone = document.getElementById('phone');
const userAsunto = document.getElementById('asunto');
const userMessage = document.getElementById('message');
const formulario = document.getElementById('formulario');
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


// Validar y enviar el form a netlify
formulario.addEventListener('submit', e => {
    e.preventDefault();

    let regExpEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$|^$/
    let regExpName = /^[a-zA-Z\s]*$/
    let regExpPhone = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$|^$/g


    if(userName.value == '') {
        alert('Debe de ingresar su nombre');
        return;
    }
    if(userEmail.value == '' && userPhone.value == '') {
        alert('Debe de ingresar al menos un correo electrónico o un teléfono para poder contactarte');
        return;
    }
    if(userMessage.value == '') {
        alert('Debe de ingresar algún mensaje');
        return;
    }
    if(!regExpName.test(userName.value)) {
        alert('Su nombre no debe de contener caracteres especiales');
        return;
    }
    if(!regExpEmail.test(userEmail.value)) {
        alert('Su correo electrónico no cuenta con el formato correcto');
        return;
    }
    if(!regExpPhone.test(userPhone.value)) {
        alert('Su teléfono no cuenta con el formato correcto');
        return;
    }

    const formData = new FormData(formulario);
    fetch(formulario.getAttribute('action'), {
        method: 'POST',
        headers: {
            'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: new URLSearchParams(formData).toString(),
    })
    .then(res => {
        
        if(res) {
            formulario.reset();
            alert('Se envío de manera satisfactoria el formulario');
        } else {
            alert('Hubo un problema al envíar el formulario')
        }
    });
});