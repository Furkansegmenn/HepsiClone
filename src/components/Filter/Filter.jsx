import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import "./Filter.scss";

const Filter = () => {
	const { products } = useContext(ProductContext);
	//useRef ile checbox kontrolü

	const getBrands = () => {
		const brandList = [];
		products.forEach((product) => {
			if (brandList.findIndex((brand) => brand == product.brand) == -1) {
				brandList.push(product.brand);
			}
		});
		const filteredBrandList = brandList.filter((brand) => brand);
		return filteredBrandList;
	};

	const getCategory = () => {
		const categoryList = [];
		products.forEach((product) => {
			if (categoryList.findIndex((category) => category == product.category) == -1) {
				categoryList.push(product.category);
			}
		});
		const filteredCategoryList = categoryList.filter((category) => category);
		return filteredCategoryList;
	};

	

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	};
	const brands = getBrands().map((brand) => capitalizeFirstLetter(brand));
	const categories = getCategory().map((category) => capitalizeFirstLetter(category));
	return (
		<div className='filter-container'>
			<h5>Brand</h5>
			{brands.map((brand) => (
				<div className='items' key={brand}>
					<input type='checkbox' name={brand} id={brand} />
					<label className='list-item' htmlFor={brand}>
						{brand}{" "}
					</label>
				</div>
			))}
			<h5>Category</h5>
			{categories.map((category) => (
				<div htmlFor={category} className='items' key={category}>
					<input type='checkbox' name={category} id={category} />
					<label className='list-item'>{category}</label>
				</div>
			))}
			<h5>Price</h5>
			<div className='items'>
				<input type='checkbox' />
				<label className='list-item'>0-20 $</label>
			</div>
			<div className='items'>
				<input type='checkbox' />
				<label className='list-item'>50-100 $</label>
			</div>

			<div className='items'>
				<input type='checkbox' />
				<label className='list-item'>100-250 $</label>
			</div>

			<div className='items'>
				<input type='checkbox' />
				<label className='list-item'>250-500 $</label>
			</div>

			<div className='items'>
				<input type='checkbox' />
				<label className='list-item'>500 $ +</label>
			</div>

			<h5>Rating</h5>
			<div className='items'>
				<input type='checkbox' />
				<label className='list-item'>4.5 points and above</label>
			</div>
			<div className='items'>
				<input type='checkbox' />
				<label className='list-item'>4 points and below</label>
			</div>
		</div>
	);
};

export default Filter;
