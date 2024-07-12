import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import "./ProductList.scss";
import { Link } from "react-router-dom";

const ProductList = () => {
	const { products } = useContext(ShopContext);
	const [hoveredProduct, setHoveredProduct] = useState(null);

	const handleMouseEnter = (productId) => {
		setHoveredProduct(productId);
	};
	const handleMouseLeave = () => {
		setHoveredProduct(null);
	};

	return (
		<div className='container'>
			{products.length > 0 &&
				products.map((product) => (
					<Link to={`/product/${product.id} `} className='link' key={product.id}>
						<div
							className='products'
							onMouseEnter={() => handleMouseEnter(product.id)}
							onMouseLeave={handleMouseLeave}
						>
							<div className='image-box'>
								<img src={product.images[0]} alt={product.title} />
							</div>

							<div className='product-bottom'>
								<div className='bottom-top'>
									<h5>
										<span>{product.brand} </span>
										{product.title}
									</h5>
								</div>
								<span className='price'>
									{product.discountPercentage > 0 ? (
										<>
											<span className='original-price'>{product.price}$ </span>
											<span className='discountPercentage'> %{product.discountPercentage}</span>
											<span className='discounted-price'>
												{(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}$
											</span>
										</>
									) : (
										`${product.price}$`
									)}
								</span>
								{hoveredProduct === product.id && (
									<button className='product-button'>Sepete Ekle</button>
								)}
							</div>
						</div>
					</Link>
				))}
		</div>
	);
};

export default ProductList;
