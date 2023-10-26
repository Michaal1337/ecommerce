const burgerIcon = document.querySelector('.nav__toggle')
const navContener = document.querySelector('.nav__links')
const navLines = document.querySelectorAll('.nav__toggle span')

burgerIcon.addEventListener('click', () => {
	navContener.classList.toggle('nav-active')
	navLines.forEach(x => x.classList.toggle('active-line'))
})
