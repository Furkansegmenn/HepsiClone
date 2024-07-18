import { useContext, useEffect, useState } from "react";
import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const Header = () => {
	const { totalItemsInCart, searchTerm, setSearchTerm, updatedParams, setSearchParams } = useContext(ShopContext);
	const [inputValue, setInputValue] = useState(searchTerm);
	const location = useLocation();

	// URL parametrelerinde değişiklik olduğunda inputValue'yi güncelle
	useEffect(() => {
		setInputValue(searchTerm);
	}, [searchTerm]);

	const handleLogoClick = () => {
		if (location.pathname === "/") {
			window.location.replace();
		} else {
			window.location.pathname = "/";
		}
	};

	const handleText = (e) => {
		setInputValue(e.target.value);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		setSearchTerm(inputValue);

		if (inputValue) {
			updatedParams.set("search", inputValue);
		} else {
			updatedParams.delete("search");
		}
		setSearchParams(updatedParams);
	};

	return (
		<div className='header'>
			<Link onClick={handleLogoClick}>
				<img src='../../public/images/icon.png' alt='HepsiBurada.com' title='Anasayfa' />
			</Link>
			<form className='search-bar'>
				<input type='text' placeholder='Product name...' value={inputValue} onChange={handleText} />
				<button onClick={handleSearch} className='search-button'>
					Search
				</button>
			</form>
			<Link to='./checkout' className='link'>
				<div className='box'>
					<i className='fa-solid fa-basket-shopping'></i>
					<div className='nav-cart-count'>{totalItemsInCart}</div>
					<span>Cart</span>
				</div>
			</Link>
		</div>
	);
};

export default Header;
