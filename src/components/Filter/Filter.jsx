import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import "./Filter.scss";

const Filter = () => {
	const { products } = useContext(ProductContext);
	return (
		<div className='filter-container'>
			{products.map(
				(product) =>
					product.brand && (
						<div key={product.id}>
							<ul className='list'>
								<li className='list-item'>{product.brand}</li>
							</ul>
						</div>
					)
			)}
		</div>
	);
};

export default Filter;
