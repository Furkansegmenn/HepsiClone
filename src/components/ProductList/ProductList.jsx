import { useContext, useState } from "react";
import { ShopContext } from "../../context/ShopContext";
import "./ProductList.scss";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductList = () => {
	const {
		products,
		addToCart,
		searchTerm,
		selectedBrands,
		selectedCategories,
		selectedPriceRange,
		selectedRatingRange,
	} = useContext(ShopContext);
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
		toast.success("Product added your");
	};

	// Filtrelenmiş ürünleri alma
	const filteredProducts = products.filter((product) => {
		const brandMatch =
			selectedBrands.length === 0 ||
			selectedBrands.some((brand) => brand.toLowerCase() === product.brand?.toLowerCase());
		const categoryMatch =
			selectedCategories.length === 0 ||
			selectedCategories.some((category) => category.toLowerCase() === product.category?.toLowerCase());
		const searchMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
		const priceMatch =
			!selectedPriceRange || (product.price >= selectedPriceRange.min && product.price <= selectedPriceRange.max);
		const ratingMatch =
			!selectedRatingRange ||
			(product.rating >= selectedRatingRange.min && product.rating <= selectedRatingRange.max);
		return brandMatch && categoryMatch && searchMatch && priceMatch && ratingMatch;
	});

	return (
		<div className='container'>
			{filteredProducts.length > 0 ? (
				filteredProducts.map((product) => (
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
														//indirimli fiyatı hesaplama
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
											onClick={(event) => handleAddToCart(event, product)} //sepete ürün ekleme butonu
										>
											Add to Cart
										</button>
									)}
								</div>
							</div>
						</Link>
					</div>
				))
			) : (
				<p className='not-found'>Ürün bulunamadı :(</p>
			)}
		</div>
	);
};

export default ProductList;
