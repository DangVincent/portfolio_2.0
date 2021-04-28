const myPortfolioApp = {};

myPortfolioApp.dateYearEvent = function() {
    // Gets the date year
    const $year = $('#year');
    const date = new Date().getFullYear();
    $year.text(date);
}

myPortfolioApp.init = function() {
    myPortfolioApp.dateYearEvent();
}

$(function() {
    myPortfolioApp.init();
});