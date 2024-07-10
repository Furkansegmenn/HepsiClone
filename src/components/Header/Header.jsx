import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<div className='header'>
			<img src='../../public/images/icon.png' alt='' />
			<form className='search-bar'>
				<input type='text' placeholder='Ürün Adı giriniz.' />
				<button className='search-button'>ARA</button>
			</form>
			<Link to='../../page/Checkout/Checkout' className='link'>
				<div className='box'>
					<i className='fa-solid fa-basket-shopping'></i>
					<div className='nav-cart-count'>0</div>
					Sepetim
				</div>
			</Link>
		</div>
	);
};

export default Header;
