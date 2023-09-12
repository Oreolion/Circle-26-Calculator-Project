// DARK & LIGHT TOGGLE BUTTON

const body = document.querySelector('body')
const btn = document.querySelector('.btn');
const btnIcon = document.querySelector('.btn_icon');

btn.addEventListener('click', () => {
    body.classList.toggle('darkmode')

    if (body.classList.contains('darkmode')) {
        btnIcon.classList.remove('fa-sun')
        btnIcon.classList.add('fa-moon')

    } else {
        btnIcon.classList.remove('fa-moon')
        btnIcon.classList.add('fa-sun')
    }
})

// SETTING THE CURRENT DATE

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const dateElement = document.getElementById('date');
dateElement.textContent = currentYear.toString(); // or currentYear + '' to convert to a string
