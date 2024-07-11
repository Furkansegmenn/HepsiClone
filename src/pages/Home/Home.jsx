import React, { useContext } from "react";
import Filter from "../../components/Filter/Filter";
import ProductList from "../../components/ProductList/ProductList";
import "./Home.scss";
import { ProductContext } from "../../context/ProductContext";

const Home = () => {
	const { status } = useContext(ProductContext);
	if (status == "loading") {
		return null;
	}
	return (
		<div className='home'>
			<Filter />
			<ProductList />
		</div>
	);
};
export default Home;
