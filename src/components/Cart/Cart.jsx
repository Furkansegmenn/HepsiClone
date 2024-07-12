import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useParams } from "react-router-dom";

const Cart = () => {
	const { cartItems } = useContext(CartContext);

	return <div> {cartItems}</div>;
};

export default Cart;
