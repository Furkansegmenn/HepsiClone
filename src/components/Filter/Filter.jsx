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
				<div key={brand}>
					<div className='brand'>
						<input type='checkbox' name={brand} />
						<li className='list-item'>{brand}</li>
					</div>
				</div>
			))}
			<h5>Kategori</h5>
			{categories.map((category) => (
				<div key={category}>
					<div className='category'>
						<ul className='list'>
							<input type='checkbox' />
							<li className='list-item'>{category}</li>
						</ul>
					</div>
				</div>
			))}
		</div>
	);
};

export default Filter;
