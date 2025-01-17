import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const ShopContext = createContext({});

export const ShopContextProvider = ({ children }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [products, setProducts] = useState([]);
	const [status, setStatus] = useState("idle");
	const [cart, setCart] = useState(JSON.parse(localStorage.getItem("hepsiburada")) || []);
	const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
	const [selectedBrands, setSelectedBrands] = useState(searchParams.get("brands")?.split(",") || []);
	const [selectedCategories, setSelectedCategories] = useState(searchParams.get("categories")?.split(",") || []);
	const [selectedPriceRange, setSelectedPriceRange] = useState(() => {
		const priceRangeFromParams = searchParams.get("priceRange");
		if (priceRangeFromParams) {
			const [min, max] = priceRangeFromParams.split("-").map(Number);
			return { min, max };
		}
		return null;
	});
	const [selectedRatingRange, setSelectedRatingRange] = useState(() => {
		const ratingRangeFromParams = searchParams.get("ratingRange");
		if (ratingRangeFromParams) {
			const [min, max] = ratingRangeFromParams.split("-").map(Number);
			return { min, max };
		}
		return null;
	});

	const fetchProducts = async () => {
		setStatus("loading");
		try {
			const response = await fetch("https://dummyjson.com/products");
			if (!response.ok) {
				throw new Error("Failed to fetch products");
			}
			const data = await response.json();
			setProducts(data.products);
			setStatus("succeeded");
		} catch (error) {
			setStatus("failed");
			console.error("Error fetching products:", error);
		}
	};

	const addToCart = (product) => {
		setCart((prevCart) => {
			const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);

			let updatedCart;
			if (existingProductIndex !== -1) {
				updatedCart = prevCart.map((item, index) => {
					if (index === existingProductIndex) {
						return { ...item, quantity: item.quantity + 1 };
					}
					return item;
				});
			} else {
				updatedCart = [...prevCart, { ...product, quantity: 1 }];
			}

			localStorage.setItem("hepsiburada", JSON.stringify(updatedCart));
			return updatedCart;
		});
	};

	const removeFromCart = (productId) => {
		setCart((prevCart) => {
			const existingProductIndex = prevCart.findIndex((item) => item.id === productId);

			if (existingProductIndex !== -1) {
				const updatedCart = prevCart
					.map((item, index) => {
						if (index === existingProductIndex) {
							return { ...item, quantity: item.quantity - 1 };
						}
						return item;
					})
					.filter((item) => item.quantity > 0);

				localStorage.setItem("hepsiburada", JSON.stringify(updatedCart));
				return updatedCart;
			} else {
				return prevCart;
			}
		});
	};

	const updatedParams = new URLSearchParams(searchParams);

	const handleBrandChange = (brand) => {
		setSelectedBrands((prevSelectedBrands) => {
			const updatedBrands = prevSelectedBrands.includes(brand)
				? prevSelectedBrands.filter((b) => b !== brand)
				: [...prevSelectedBrands, brand];

			if (updatedBrands.length > 0) {
				updatedParams.set("brands", updatedBrands.join(","));
			} else {
				updatedParams.delete("brands");
			}

			setSearchParams(updatedParams);
			return updatedBrands;
		});
	};

	const handleCategoryChange = (category) => {
		setSelectedCategories((prevSelectedCategories) => {
			const updatedCategories = prevSelectedCategories.includes(category)
				? prevSelectedCategories.filter((c) => c !== category)
				: [...prevSelectedCategories, category];

			if (updatedCategories.length > 0) {
				updatedParams.set("categories", updatedCategories.join(","));
			} else {
				updatedParams.delete("categories");
			}

			setSearchParams(updatedParams);
			return updatedCategories;
		});
	};

	const handlePriceRange = (priceRange) => {
		setSelectedPriceRange(priceRange);
		const updatedParams = new URLSearchParams(searchParams);

		if (priceRange) {
			updatedParams.set("priceRange", `${priceRange.min}-${priceRange.max}`);
		} else {
			updatedParams.delete("priceRange");
		}

		setSearchParams(updatedParams);
	};

	const handleRatingRange = (ratingRange) => {
		setSelectedRatingRange(ratingRange);
		const updatedParams = new URLSearchParams(searchParams);

		if (ratingRange) {
			updatedParams.set("ratingRange", `${ratingRange.min}-${ratingRange.max}`);
		} else {
			updatedParams.delete("ratingRange");
		}

		setSearchParams(updatedParams);
	};

	const totalItemsInCart = cart.length;

	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		<ShopContext.Provider
			value={{
				products,
				status,
				cart,
				addToCart,
				removeFromCart,
				totalItemsInCart,
				searchTerm,
				setSearchTerm,
				selectedBrands,
				selectedCategories,
				handleBrandChange,
				handleCategoryChange,
				selectedPriceRange,
				handlePriceRange,
				selectedRatingRange,
				handleRatingRange,
				setSearchParams,
				updatedParams,
			}}
		>
			{children}
		</ShopContext.Provider>
	);
};
