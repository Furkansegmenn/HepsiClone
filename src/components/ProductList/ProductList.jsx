import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import "./ProductList.scss";
import { Link } from "react-router-dom";

const ProductList = () => {
	const { products, addToCart } = useContext(ShopContext);
	const [hoveredProduct, setHoveredProduct] = useState(null);

	const handleMouseEnter = (productId) => {
		setHoveredProduct(productId);
	};

	const handleMouseLeave = () => {
		setHoveredProduct(null);
	};

	const handleAddToCart = (event, product) => {
		event.preventDefault();
		addToCart(product);
	};

	return (
		<div className='container'>
			{products.length > 0 &&
				products.map((product) => (
					<div className='link' key={product.id}>
						<Link to={`/product/${product.id}`} className='product-link'>
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
												<span className='discountPercentage'>
													%{product.discountPercentage}
												</span>
												<span className='discounted-price'>
													{(product.price * (1 - product.discountPercentage / 100)).toFixed(
														2
													)}
													$
												</span>
											</>
										) : (
											`${product.price}$`
										)}
									</span>
									{hoveredProduct === product.id && (
										<button
											className='product-button'
											onClick={(event) => handleAddToCart(event, product)}
										>
											Add to Cart
										</button>
									)}
								</div>
							</div>
						</Link>
					</div>
				))}
		</div>
	);
};

export default ProductList;
