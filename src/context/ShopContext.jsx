import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext({});

export const ShopContextProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [status, setStatus] = useState("idle");
	const [cart, setCart] = useState([]);

	const fetchProducts = async () => {
		setStatus("loading");
		const response = await fetch("https://dummyjson.com/products");
		const data = await response.json();
		setProducts(data.products);
		setStatus("succeeded");
	};

	useEffect(() => {
		fetchProducts();
	}, []);

	return <ShopContext.Provider value={{ products, status, cart, setCart }}>{children}</ShopContext.Provider>;
};
