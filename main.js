const typedText = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');
const textArray = ['JavaScript', 'HTML', 'CSS', 'Node.js', 'Python', 'Django Rest Framework', 'Java'];
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
const btnSwitch = document.querySelector('.switch')
btnSwitch.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    btnSwitch.classList.toggle('active')
});