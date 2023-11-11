const burgerIcon = document.querySelector('.nav__toggle')
const navContener = document.querySelector('.nav__links')
const shopItemContainer = document.querySelector('.shop__item-container')
const navLines = document.querySelectorAll('.nav__toggle span')
const shopRate = document.querySelector('.shop__item-rate')

let onItem = false
let allItems
let cart = []

burgerIcon.addEventListener('click', () => {
	navContener.classList.toggle('nav-active')
	navLines.forEach(x => x.classList.toggle('active-line'))
})

async function getProducts() {
	try {
		const res = await fetch('https://fakestoreapi.com/products')
		const products = await res.json()
		console.log(products)
		displayProducts(products)
		onHoverDisplay(products)
		saveInStorage(products)
	} catch (error) {
		console.log(error)
	}
}

const saveInStorage = products => {
	localStorage.setItem('products', JSON.stringify(products))
}

const displayProducts = products => {
	shopItemContainer.innerHTML = products
		.map(product => {
			let { category, id, description, image, price, title } = product
			let { rate, count } = product.rating
			// if (!onItem) {
			// 	title = shortenTitle(title)
			// }
			return `<div class="shop__item"  data-id=${id}>
	<img src=${image} alt="" class="shop__item-img">
	<hr>
	<div class="shop__item-content">
	<div class="shop__item-rate">
	${itemRateStars(rate)}
		</div>
		<p class="shop__item-title text-overflow">${title}</p>
		<h4 class="shop__item-price">$ ${price}</h4>
		<a href="#cart"><a href=""><i class='bx bx-shopping-bag shop__item-bag'></i></a>
	</div>
</div>`
		})
		.join('')
	allItems = shopItemContainer.querySelectorAll('.shop__item')
}

const itemRateStars = rate => {
	rate = Math.floor(rate)
	if (rate === 1) {
		return `<i class="fas fa-star shop__item-rate-star"></i>`
	} else if (rate === 2) {
		return `<i class="fas fa-star shop__item-rate-star"></i> <i class="fas fa-star shop__item-rate-star"></i>`
	} else if (rate === 3) {
		return `<i class="fas fa-star shop__item-rate-star"></i> <i class="fas fa-star shop__item-rate-star"></i> <i class="fas fa-star shop__item-rate-star"></i>`
	} else if (rate === 4) {
		return `<i class="fas fa-star shop__item-rate-star"></i> <i class="fas fa-star shop__item-rate-star"></i> <i class="fas fa-star shop__item-rate-star"></i> <i class="fas fa-star shop__item-rate-star"></i>`
	}
}

// const shortenTitle = text => {
// 	const count = 40
// 	const shortTitle = text.slice(0, count) + (text.length > count ? '...' : '')
// 	return shortTitle
// }

const onHoverDisplay = products => {
	allItems.forEach(item => {
		item.addEventListener('mouseenter', e => {
			const element = e.target.children[2].children[1]
			element.classList.remove('text-overflow')
		})
		item.addEventListener('mouseleave', e => {
			const element = e.target.children[2].children[1]
			element.classList.add('text-overflow')
		})
	})
}

document.addEventListener('DOMContentLoaded', () => {
	getProducts()
})
/* products
		.map(product => {
			let { category, id, description, image, price, title } = product
			let { rate, count } = product.rating
			if (!onItem) {
				title = shortenTitle(title)
			}
			const newItem = document.createElement('article')
			newItem.setAttribute('data-id', id)
			newItem.classList.add('shop__item')
			newItem.innerHTML = `<img src=${image} alt="" class="shop__item-img">
			<hr>
			<div class="shop__item-content">
				<div class="shop__item-rate">
					<i class="fas fa-star 
					shop__item-rate-star"></i>
					<i class="fas fa-star shop__item-rate-star"></i>
					<i class="fas fa-star shop__item-rate-star"></i>
					<i class="fas fa-star shop__item-rate-star"></i>
				</div>
				<p class="shop__item-title text-overflow">${title}</p>
				<h4 class="shop__item-price">$ ${price}</h4>
			</div>`
			shopItemContainer.append(newItem) */
