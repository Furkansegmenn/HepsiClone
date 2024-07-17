import { createContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

//context oluşturma
export const ShopContext = createContext({});

//context te Provider fonksiyonu sayesinde variable lara diğer components ve pagelerden erişebiliyoruz.
export const ShopContextProvider = ({ children }) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [products, setProducts] = useState([]);
	const [status, setStatus] = useState("idle");
	const [cart, setCart] = useState(JSON.parse(localStorage.getItem("hepsiburada")) || []);
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedBrands, setSelectedBrands] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedPriceRange, setSelectedPriceRange] = useState(null);
	const [selectedRatingRange, setSelectedRatingRange] = useState(null);
	//apiyi çağırma fonksiyonu
	const fetchProducts = async () => {
		setStatus("loading");
		const response = await fetch("https://dummyjson.com/products");
		const data = await response.json();
		setProducts(data.products);
		setStatus("succeeded");
	};

	//sepete ürün ekleme ve arttırma (Local Storage' kaydetme)
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

	// sepetten ürün azaltma
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
	//marka filtresi ile çağırılan fonk.
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
		if (priceRange) {
			updatedParams.set("priceRange", priceRange);
		} else {
			updatedParams.delete("priceRange");
		}
		setSearchParams(updatedParams);
	};

	const handleRatingRange = (ratingRange) => {
		setSelectedRatingRange(ratingRange);
		if (ratingRange) {
			updatedParams.set("ratingRange", ratingRange);
		} else {
			updatedParams.delete("ratingRange");
		}
		setSearchParams(updatedParams);
	};

	const totalItemsInCart = cart.length;

	//apiyi çağırdığımız fonksiyonu useEffect ile sayfa yüklendiğinde çağırıyoruz. Arrayin içi boş olduğu için herhangi bir duruma bağlı değil şuan.
	useEffect(() => {
		fetchProducts();
	}, []);

	return (
		//bu value ları useContext ile diğer sayfalarda kullanılabilir hale getiriyoruz.
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
				searchParams,
				setSearchParams,
			}}
		>
			{children}
		</ShopContext.Provider>
	);
};
