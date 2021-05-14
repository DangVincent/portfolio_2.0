const myPortfolioApp = {};

// Wait Event Function for set timeout promises
myPortfolioApp.waitEvent = function(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Smooth Scroll Function for anchor tags to have smooth scroll behaviour
myPortfolioApp.linkSmoothScrollEvent = function() {
    const scroll = new SmoothScroll('a[href*="#"]');
}

// Hover Letter Function that allows letters to change color on hover
myPortfolioApp.hoverLetterEvent = function() {
    const outlineLetter = document.querySelectorAll("span[class*=outlineLetter]"); 
    outlineLetter.forEach(letter => {
        letter.addEventListener('mouseover', async function(e) {
            e.target.classList.add("active");
            await myPortfolioApp.waitEvent(500);
            e.target.classList.remove("active");
        });
    });
}

// Contact form function controls the ajax call when the form is submitted
myPortfolioApp.contactFormEvent = function () {
    const form = document.querySelector('#footer__form');
    const name = document.querySelector('#name');
    const email = document.querySelector('#emailAddress');
    // email regular expression obtained from https://emailregex.com/
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const nameRegExp = /^\s+$/;

    function handleSubmit(event) {
        event.preventDefault();
        const validEmail = (email.value).match(emailRegExp);
        const validName = (name.value).match(nameRegExp);
        const data = new FormData(event.target);
        if (validEmail && !validName) {
            fetch("https://formspree.io/f/xpzqzavo", {
                method: "POST",
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(res => res.json())
            .then(function (data) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Your message has been sent!',
                    showConfirmButton: false,
                    timer: 1500
                });
                form.reset();
            }).catch((function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!'
                });
            }));
        }
        else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter a valid name and email!'
            });
        }
    }
    form.addEventListener('submit', handleSubmit);
}

// Date Year Function that gets current year
myPortfolioApp.dateYearEvent = function() {
    const year = document.querySelector('#year');
    const date = new Date().getFullYear();
    year.innerHTML = date;
}

myPortfolioApp.init = function() {
    myPortfolioApp.linkSmoothScrollEvent();
    myPortfolioApp.hoverLetterEvent();
    myPortfolioApp.contactFormEvent();
    myPortfolioApp.dateYearEvent();
}

document.addEventListener("DOMContentLoaded", function() {
    myPortfolioApp.init();
});