import React, { useContext } from "react";
import Filter from "../../components/Filter/Filter";
import ProductList from "../../components/ProductList/ProductList";
import "./Home.scss";

const Home = () => {
	return (
		<div className='home'>
			{/* <Filter /> */}
			<ProductList />
		</div>
	);
};
export default Home;
