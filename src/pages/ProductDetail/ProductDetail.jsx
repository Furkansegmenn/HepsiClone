import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ProductDetail.scss";
import ProductList from "../../components/ProductList/ProductList";

const ProductDetail = () => {
	const [product, setProduct] = useState(null);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const params = useParams();

	const handlePrevClick = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
	};

	const handleNextClick = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex === product.images.length - 1 ? prevIndex : prevIndex + 1));
	};

	useEffect(() => {
		const getProduct = async () => {
			const res = await fetch(`https://dummyjson.com/products/${params.id}`);
			const data = await res.json();
			setProduct(data);
		};
		getProduct();
	}, []);
	if (!product) {
		return "loading";
	}

	return (
		<>
			<div className='detail-container'>
				<div className='left-container'>
					<button onClick={handlePrevClick}>
						<span>&lt;</span>
					</button>
					<img src={product.images[currentImageIndex]} alt={product.title} />
					<button onClick={handleNextClick}>
						<span>&gt;</span>
					</button>
				</div>
				<div className='right-container'>
					<span className='brand'>
						{product.brand} <span className='title'>{product.title} </span>{" "}
					</span>
					<span className='rating-title'>
						Rating: <span className='rating'>{product.rating.toFixed(1)}/5</span>{" "}
					</span>

					<span className='price'>
						<br />
						{product.discountPercentage > 0 ? (
							<>
								<span className='discounted-price'>
									{(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}$
								</span>
								<span className='original-price'>{product.price}$ </span>

								<span className='profit'>
									Kazancım: {((product.price * product.discountPercentage) / 100).toFixed(2)}$
								</span>
							</>
						) : (
							`${product.price}$`
						)}
					</span>
					{product.stock < 30 && <span className='run-out'>About to run out</span>}
					<br />
					<button className='product-button'>Add to cart</button>
				</div>
				<div className='empty'></div>
			</div>
		</>
	);
};

export default ProductDetail;
