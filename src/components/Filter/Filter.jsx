import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import "./Filter.scss";

const Filter = () => {
	const { products } = useContext(ProductContext);

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
			<h5>Marka</h5>
			{brands.map((brand) => (
				<div className='items' key={brand}>
					<input type='checkbox' name={brand} id={brand} />
					<label htmlFor={brand} className='list-item'>
						{brand}
					</label>
				</div>
			))}
			<h5>Kategori</h5>
			{categories.map((category) => (
				<div htmlFor={category} className='items' key={category}>
					<input type='checkbox' name={category} id={category} />
					<label className='list-item'>{category}</label>
				</div>
			))}
			{/* <div htmlFor={category} className='items'>
				<input type='checkbox' name={price} id={price} />
				<label className='list-item'></label>
				
			</div> */}
		</div>
	);
};

export default Filter;
