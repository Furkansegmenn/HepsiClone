import React, { createContext, useEffect, useState } from "react";

//context oluşturma
export const ShopContext = createContext({});

//context te Provider fonksiyonu sayesinde variable lara diğer components ve pagelerden erişebiliyoruz.
export const ShopContextProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [status, setStatus] = useState("idle");
	const [cart, setCart] = useState(JSON.parse(localStorage.getItem("hepsiburada")) || []);
	const [searchTerm, setSearchTerm] = useState("");

	//apiyi çağırma fonksiyonu
	const fetchProducts = async () => {
		setStatus("loading");
		const response = await fetch("https://dummyjson.com/products");
		const data = await response.json();
		setProducts(data.products);
		setStatus("succeeded");
	};

	//sepete ürün ekleme ve arttırma
	const addToCart = (product) => {
		setCart((prevCart) => {
			const existingProductIndex = prevCart.findIndex((item) => item.id === product.id);

			let updatedCart;
			if (existingProductIndex !== -1) {
				// Ürün zaten varsa, miktarını artır
				updatedCart = prevCart.map((item, index) => {
					if (index === existingProductIndex) {
						return { ...item, quantity: item.quantity + 1 };
					}
					return item;
				});
			} else {
				// Ürün yoksa, sepete yeni ürün olarak ekle
				updatedCart = [...prevCart, { ...product, quantity: 1 }];
			}

			// Güncellenmiş sepeti localStorage'a kaydet
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

				// Güncellenmiş sepeti localStorage'a kaydet
				localStorage.setItem("hepsiburada", JSON.stringify(updatedCart));
				return updatedCart;
			} else {
				return prevCart;
			}
		});
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
			}}
		>
			{children}
		</ShopContext.Provider>
	);
};
