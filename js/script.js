const myPortfolioApp = {};

myPortfolioApp.waitEvent = function(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

myPortfolioApp.dateYearEvent = function() {
    // Gets the date year
    const year = document.querySelector('#year');
    const date = new Date().getFullYear();
    year.innerHTML = date;
}

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

myPortfolioApp.init = function() {
    myPortfolioApp.dateYearEvent();
    myPortfolioApp.hoverLetterEvent();
}

document.addEventListener("DOMContentLoaded", function() {
    myPortfolioApp.init();
});