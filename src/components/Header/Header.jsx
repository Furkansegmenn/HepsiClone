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
			<div className='box'>
				<i className='fa-solid fa-basket-shopping'></i>
				<Link to='../../page/Checkout/Checkout' className='link'>
					Sepetim
				</Link>
			</div>
		</div>
	);
};

export default Header;
