import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import "./Checkout.scss";

const Checkout = () => {
	const { cart, removeFromCart, addToCart, totalItemsInCart } = useContext(ShopContext);

	const handleIncreaseQuantity = (productId) => {
		const product = cart.find((item) => item.id === productId);
		if (product) {
			addToCart(product);
		}
	};

	const handleRemoveFromCart = (productId) => {
		removeFromCart(productId);
	};

	const getItemPrice = (item) => {
		return item.price * item.quantity;
	};

	const getTotalPrice = () => {
		let totalPrice = 0;
		cart.forEach((item) => {
			totalPrice += getItemPrice(item);
		});
		return totalPrice.toFixed(2);
	};

	return (
		<div className='cart-container'>
			<div className='left-side'>
				<div className='myCart'>
					<h2>My Cart</h2>
					<span> ({totalItemsInCart} products) </span>
				</div>

				<div className='bottom'>
					<div className='cart-items'>
						{cart.map((item) => (
							<div key={item.id} className='cart-item'>
								<div className='left-side'>
									<div className='img-box'>
										<img src={item.images[0]} alt='' />
									</div>
									<div className='detail-box'>
										<span className='title'>{item.title}</span>
										<div className='quantity-box'>
											<button
												className='minus-button'
												onClick={() => handleRemoveFromCart(item.id)}
											>
												_
											</button>
											<span> {item.quantity}</span>
											<button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
										</div>
									</div>
								</div>

								<div className='price'>
									<span className='profit'>
										Kazancım: {((getItemPrice(item) * item.discountPercentage) / 100).toFixed(2)}$
									</span>
									<span className='orgnl-price'>{getItemPrice(item).toFixed(2)}$ </span>
								</div>
							</div>
						))}
					</div>
					<div className='right-side'>
						<div className='buy-box'>
							<span className='products-count'> PRODUCTS ({totalItemsInCart}) </span>
							<span className='total-price'> {getTotalPrice()}$</span>
							<button type='button' className='shopping-button'>
								COMPLATE SHOPPİNG
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checkout;
