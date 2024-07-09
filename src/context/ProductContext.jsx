import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const [status, setStatus] = useState("idle");

	const fetchProducts = async () => {
		setStatus("loading");
		const response = await fetch("https://dummyjson.com/products");
		const data = await response.json();
		setProducts(data.products);
		console.log(data.products);
		setStatus("succeeded");
	};

	useEffect(() => {
		fetchProducts();
	}, []);
	return <ProductContext.Provider value={{ products: products, status }}>{children}</ProductContext.Provider>;
};
