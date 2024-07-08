import { useEffect } from "react";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./features/ProductSlice";

function App() {
	const dispatch = useDispatch();
	const { product, status, error } = useSelector((state) => state.product);

	useEffect(() => {
		if (status === "idle") {
			dispatch(fetchProducts());
		}
	}, [status, dispatch]);

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	if (status === "failed") {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			{product.map((product) => (
				<div key={product.id}>
					{product.images.map((image, index) => (
						<img key={index} src={image} alt={product.title} />
					))}
					<span>{product.title}</span>
					<span>{product.rating}</span>
					<span>{product.price}</span>
				</div>
			))}
		</div>
	);
}

export default App;
