import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
	const cart = useSelector(state => state.cart.items); // Get cart items from Redux store
	const dispatch = useDispatch();

	// Parse cost string (e.g., "$15") to a number for calculations
	const parseCost = (cost) => {
		return parseFloat(cost.replace('$', ''));
	};

	// Calculate total amount for all items in the cart
	const calculateTotalAmount = () => {
		return cart.reduce((total, item) => total + (parseCost(item.cost) * item.quantity), 0);
	};

	// Handle incrementing item quantity
	const handleIncrement = (item) => {
		dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
	};

	// Handle decrementing item quantity or removing if quantity reaches 0
	const handleDecrement = (item) => {
		if (item.quantity > 1) {
			dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
		} else {
			dispatch(removeItem(item.name));
		}
	};

	// Calculate subtotal for a specific item (cost * quantity)
	const calculateTotalCost = (item) => {
		return parseCost(item.cost) * item.quantity;
	};

	// Handle checkout button click (placeholder functionality)
	const handleCheckoutShopping = (e) => {
		alert('Functionality to be added for future reference');
	};

	return (
		<div className="cart-container">
			<h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
			<div>
				{cart.map(item => (
					<div className="cart-item" key={item.name}>
						<img className="cart-item-image" src={item.image} alt={item.name} />
						<div className="cart-item-details">
							<div className="cart-item-name">{item.name}</div>
							<div className="cart-item-cost">{item.cost}</div>
							<div className="cart-item-quantity">
								<button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
								<span className="cart-item-quantity-value">{item.quantity}</span>
								<button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
							</div>
							<div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
							<button className="cart-item-delete" onClick={() => dispatch(removeItem(item.name))}>Delete</button>
						</div>
					</div>
				))}
			</div>
			<div className="continue_shopping_btn">
				<button className="get-started-button" onClick={(e) => onContinueShopping(e)}>Continue Shopping</button>
				<br />
				<button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
			</div>
		</div>
	);
};

export default CartItem;