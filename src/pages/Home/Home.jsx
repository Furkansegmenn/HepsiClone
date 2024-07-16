import  { useContext } from "react";
import Filter from "../../components/Filter/Filter";
import ProductList from "../../components/ProductList/ProductList";
import "./Home.scss";
import { ShopContext } from "../../context/ShopContext";

const Home = () => {
	const { status } = useContext(ShopContext);
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
