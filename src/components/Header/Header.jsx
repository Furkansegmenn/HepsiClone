import React, { useContext } from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const Header = () => {
	const { totalItemsInCart } = useContext(ShopContext);

	return (
		<div className='header'>
			<Link to={"/"}>
				<img src='../../public/images/icon.png' alt='HepsiBurada.com' title='Anasayfa' />
			</Link>
			<form className='search-bar'>
				<input type='text' placeholder='Product name...' />
				<button className='search-button'>Search</button>
			</form>
			<Link to='./checkout' className='link'>
				<div className='box'>
					<i className='fa-solid fa-basket-shopping'></i>
					<div className='nav-cart-count'>{totalItemsInCart}</div>
					Cart
				</div>
			</Link>
		</div>
	);
};

export default Header;
