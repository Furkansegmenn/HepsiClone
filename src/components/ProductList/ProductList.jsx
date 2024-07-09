import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import "./ProductList.scss";

const ProductList = () => {
	const { products } = useContext(ProductContext);

	return (
		<div className='container'>
			{products.length > 0 ? (
				products.map((product) => (
					<div key={product.id}>
						<img src={product.images[0]} alt={product.title} />
						<span>{product.title}</span>
					</div>
				))
			) : (
				<p>Loading...</p>
			)}
		</div>
	);
};

export default ProductList;
