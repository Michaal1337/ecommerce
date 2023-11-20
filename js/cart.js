let cart = JSON.parse(localStorage.getItem('cart')) || []
const shoppingIcon = document.querySelector('.nav__shopping-quantity')
const cartContainer = document.querySelector('.cart__products')
const cartTotal = document.querySelector('.cart__interface-total')
const products = JSON.parse(localStorage.getItem('products'))

const update = () => {
	let amount = cart.map(q => q.quantity).reduce((prev, next) => prev + next, 0)
	shoppingIcon.textContent = amount
	if (amount > 0) {
		shoppingIcon.style.display = 'block'
	} else {
		shoppingIcon.style.display = 'none'
	}
}

const getCartProducts = () => {
	cartContainer.innerHTML = cart
		.map(item => {
			const search = products.find(x => x.id == item.id)
			let { title, price, id, image: img } = search
			let { quantity } = item
			return `<article class="cart__item">
        <img src=${img} alt="">
        <div class="cart__details">
            <div class="cart__details-title-price">
                <h4 class="text-overflow">${title}</h4>
                <p class="cart__details-price">$ ${price}</p>
                <i></i>
            </div>
            <div class="cart__details-btns">
                <i class="fa-solid fa-minus" onclick="decrement(this)"></i>
                <span data-id=${id} class="cart__details-quantity">${quantity}</span>
                <i class="fa-solid fa-plus" onclick="increment(this)"></i>
                <i class="fa-solid fa-xmark"></i>
            </div>
            <h3 class="cart__details-total">$ ${quantity * price}</h3>
        </div>
    </article>`
		})
		.join('')
	getCartItems()
	getTotalBill()
}

const getCartItems = () => {
	allCartItems = document.querySelectorAll('.cart__item')
	allCartItems.forEach(item => {
		item.addEventListener('mouseenter', e => {
			const title = e.target.children[1].children[0].children[0]
			title.classList.remove('text-overflow')
		})
		item.addEventListener('mouseleave', e => {
			const title = e.target.children[1].children[0].children[0]
			title.classList.add('text-overflow')
		})
		item.addEventListener('click', e => {
			if (e.target.matches('.fa-xmark')) {
				const element = e.target.previousElementSibling.previousElementSibling
				const search = cart.find(x => x.id === element.dataset.id)
				cart = cart.filter(x => x.id !== element.dataset.id)
				getCartProducts()
				update()
				addToStorage()
			}
		})
	})
}

const addToStorage = () => {
	localStorage.setItem('cart', JSON.stringify(cart))
}

const getTotalBill = () => {
	let totalBill = 0
	cartTotal.textContent = 'Total bill: $ ' + totalBill
}

const increment = el => {
	let quantity = el.previousElementSibling
	const search = cart.find(item => item.id === quantity.dataset.id)
	search.quantity += 1
	quantity.textContent = search.quantity
	addToStorage()
	update()
}

const decrement = el => {
	let quantity = el.nextElementSibling
	const search = cart.find(item => item.id === quantity.dataset.id)

	if (search.quantity > 0) {
		search.quantity -= 1
		quantity.textContent = search.quantity
		addToStorage()
		update()
	}
}

// allCartItems.forEach(item => console.log(item))

// cartProducts.addEventListener('mouseenter', e => {
// 	console.log(e.target)
// 	console.log(e.currentTarget)
// 	// console.log(e.currentTarget.matches('.cart__item'))
// 	if (e.currentTarget.matches('.cart__item')) {
// 		console.log('elo')
// 	}
// })

document.addEventListener('DOMContentLoaded', () => {
	update()
	getCartProducts()
})
