const burgerIcon = document.querySelector('.nav__toggle')
const navContener = document.querySelector('.nav__links')
const shopItemContainer = document.querySelector('.shop__item-container')
const navLines = document.querySelectorAll('.nav__toggle span')
const shoppingIcon = document.querySelectorAll('.nav__shopping-quantity')
let cart = JSON.parse(localStorage.getItem('cart')) || []
let allItems
let itemBtn
let num = 0

burgerIcon.addEventListener('click', () => {
	navContener.classList.toggle('nav-active')
	navLines.forEach(x => x.classList.toggle('active-line'))
})

async function getProducts() {
	try {
		const res = await fetch('https://fakestoreapi.com/products')
		const products = await res.json()
		// const products = await JSON.parse(localStorage.getItem('products'))
		// console.log(products)
		displayProducts(products)
		onHoverDisplay(products)
		// getFromStorage()
		localStorage.setItem('products', JSON.stringify(products))
	} catch (error) {
		console.log(error)
	}
}

const displayProducts = products => {
	shopItemContainer.innerHTML = products
		.map(product => {
			let { category, id, description, image, price, title } = product
			let { rate, count } = product.rating
			return `<div class="shop__item">
	<img src=${image} alt="" class="shop__item-img">
	<hr>
	<div class="shop__item-content">
                        <div class="shop__item-rate">
                         	${itemRateStars(rate)}
                        </div>
                        <p class="shop__item-title text-overflow">${title}</p>
                        <div class="shop__item-bottom">
                            <h4 class="shop__item-price">$ ${price}</h4>
                            <div class="shop__item-quanity-box">
                                <i class="fa-solid fa-minus" onclick="decrement(this)"></i>
                                <span data-id=${id} class="shop__item-quantity">0</span>
                                <i class="fa-solid fa-plus" onclick="increment(this)"></i>
								<button disabled><i class='bx bx-shopping-bag shop__item-bag'></i></button>
                            </div>
                        </div>
                    </div>
</div>`
		})
		.join('')
	checkQuantity()
	allItems = shopItemContainer.querySelectorAll('.shop__item')
}

const checkQuantity = () => {
	const itemQuantity = shopItemContainer.querySelectorAll('.shop__item-quantity')
	for (const q of itemQuantity) {
		const search = cart.find(x => x.id === q.dataset.id)
		if (search) {
			const btn = q.nextElementSibling.nextElementSibling
			q.textContent = search.quantity
			if (search.quantity > 0) {
				btn.disabled = false
			}
		}
	}
}

const onHoverDisplay = products => {
	allItems.forEach(item => {
		item.addEventListener('click', e => {
			if (e.target.matches('.shop__item-bag')) {
				const id = e.target.parentElement.previousElementSibling.previousElementSibling.dataset.id
				const search = cart.find(item => item.id === id)
				let quantity = e.target.parentElement.previousElementSibling.previousElementSibling.textContent
				if (!search && quantity != 0) {
					cart.push({ id, quantity: num })
				} else {
					search.quantity = num
				}
				cart = cart.filter(item => item.quantity > 0)
				// console.log(cart)
				if (num === 0) {
					e.target.parentElement.disabled = true
				}
				update()
				addToStorage()
			}
		})

		item.addEventListener('mouseenter', e => {
			const quantity = e.target.children[2].children[2].children[1].children[1]
			const search = cart.find(item => item.id == quantity.dataset.id)
			const element = e.target.children[2].children[1]
			element.classList.remove('text-overflow')

			if (!search) {
				num = 0
			} else {
				num = search.quantity
			}
		})
		item.addEventListener('mouseleave', e => {
			const element = e.target.children[2].children[1]
			element.classList.add('text-overflow')
			const quantity = e.target.children[2].children[2].children[1].children[1]
			const search = cart.find(item => item.id == quantity.dataset.id)
			// if (!search) {
			quantity.textContent = 0
			// }
			if (search) {
				quantity.textContent = search.quantity
			}
		})
	})
}

const addToStorage = products => {
	localStorage.setItem('cart', JSON.stringify(cart))
}

const getFromStorage = () => {}
//zz
const update = () => {
	let amount = cart.map(q => q.quantity).reduce((prev, next) => prev + next, 0)
	shoppingIcon.forEach(item => {
		item.textContent = amount
		if (amount > 0) {
			item.style.display = 'block'
		} else {
			item.style.display = 'none'
		}
	})
}

const increment = el => {
	num++
	el.previousElementSibling.textContent = num
	if (num > 0) {
		el.nextElementSibling.disabled = false
	}
}
const decrement = el => {
	if (num > 0) {
		num--
	}
	el.nextElementSibling.textContent = num
}

const itemRateStars = rate => {
	rate = Math.round(rate)
	const star = '<i class="fas fa-star shop__item-rate-star"></i>'
	let rateStar = ''
	for (let i = 0; i < rate; i++) {
		rateStar += star
	}
	return rateStar
}

document.addEventListener('DOMContentLoaded', () => {
	getProducts()
	update()
})

// const shortenTitle = text => {
// 	const count = 40
// 	const shortTitle = text.slice(0, count) + (text.length > count ? '...' : '')
// 	return shortTitle
// }
