const mobileNav = document.querySelector('.nav_list');
const burgerIcon = document.querySelector('.burger');

burgerIcon.addEventListener('click', function() {
    mobileNav.classList.toggle('active');
    burgerIcon.classList.toggle('active')
})