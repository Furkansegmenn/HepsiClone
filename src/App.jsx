import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Checkout from "./pages/Checkout/Checkout";
import { ProductProvider } from "./context/ProductContext";

function App() {
	return (
		<ProductProvider>
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/product/:id' element={<ProductDetail />} />
				<Route path='/checkout' element={<Checkout />} />
			</Routes>
		</ProductProvider>
	);
}

export default App;
