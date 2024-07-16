import React, { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import "./Filter.scss";

const Filter = () => {
	const { products, handleBrandChange, handleCategoryChange, handlePriceRange, selectedPriceRange } =
		useContext(ShopContext);
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

	const priceRanges = [
		{ label: "0-50$", value: { min: 0, max: 50 } },
		{ label: "50-100$", value: { min: 50, max: 100 } },
		{ label: "100-200$", value: { min: 100, max: 200 } },
		{ label: "200$+", value: { min: 200, max: Infinity } },
	];
	console.log(selectedPriceRange);
	const brands = getBrands().map((brand) => capitalizeFirstLetter(brand));
	const categories = getCategory().map((category) => capitalizeFirstLetter(category));

	return (
		<div className='filter-container'>
			<h5>Brand</h5>
			{brands.map((brand) => (
				<div className='items' key={brand}>
					<input type='checkbox' name={brand} id={brand} onChange={() => handleBrandChange(brand)} />
					<label className='list-item' htmlFor={brand}>
						{brand}
					</label>
				</div>
			))}
			<h5>Category</h5>
			{categories.map((category) => (
				<div htmlFor={category} className='items' key={category}>
					<input
						type='checkbox'
						name={category}
						id={category}
						onChange={() => handleCategoryChange(category)}
					/>
					<label className='list-item'>{category}</label>
				</div>
			))}
			<h5>Price Range</h5>
			{priceRanges.map((range) => (
				<div className='items' key={range.label}>
					<input
						type='radio'
						name='price-range'
						id={range.label}
						checked={selectedPriceRange?.max === range.value.max}
						onChange={() => handlePriceRange(range.value)}
					/>
					<label className='list-item' htmlFor={range.label}>
						{range.label}
					</label>
				</div>
			))}
		</div>
	);
};

export default Filter;
