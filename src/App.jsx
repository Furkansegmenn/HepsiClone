import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import Checkout from "./pages/Checkout/Checkout";
import { ShopContextProvider } from "./context/ShopContext";
import Header from "./components/Header/Header";

function App() {
	return (
		<ShopContextProvider>
			<Header />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/product/:id' element={<ProductDetail />} />
				<Route path='/checkout' element={<Checkout />} />
			</Routes>
			{/* <Footer /> */}
		</ShopContextProvider>
	);
}

export default App;
