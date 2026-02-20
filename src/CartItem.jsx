import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
	// Get cart items from Redux store
	const cart = useSelector(state => state.cart.items);
	const dispatch = useDispatch();

	// Parse cost string (e.g., "$15") to a number for calculations
	const parseCost = (cost) => {
		return parseFloat(cost.replace('$', ''));
	};

	// Calculate total amount for all items in the cart
	const calculateTotalAmount = () => {
		let total = 0;
		cart.forEach((item) => {
			const itemCost = parseCost(item.cost);
			total += itemCost * item.quantity;
		});
		return total;
	};

	// Calculate subtotal for a specific item (cost * quantity)
	const calculateTotalCost = (item) => {
		const itemCost = parseCost(item.cost);
		return itemCost * item.quantity;
	};

	// Handle incrementing item quantity by 1
	const handleIncrement = (item) => {
		dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
	};

	// Handle decrementing item quantity or removing if quantity reaches 0
	const handleDecrement = (item) => {
		if (item.quantity > 1) {
			// Decrease quantity by 1
			dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
		} else {
			// Remove item from cart if quantity would drop to 0
			dispatch(removeItem(item.name));
		}
	};

	// Handle remove item from cart (delete functionality)
	const handleRemove = (itemName) => {
		dispatch(removeItem(itemName));
	};

	// Handle continue shopping - navigate back to product list
	const handleContinueShopping = (e) => {
		e.preventDefault();
		onContinueShopping(e);
	};

	// Handle checkout button click (placeholder functionality)
	const handleCheckoutShopping = (e) => {
		e.preventDefault();
		alert('Functionality to be added for future reference');
	};

	return (
		<div className="cart-container">
			{/* Display total cart amount */}
			<h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>

			{/* Render each item in the cart */}
			<div>
				{cart.map((item) => (
					<div className="cart-item" key={item.name}>
						{/* Item image */}
						<img className="cart-item-image" src={item.image} alt={item.name} />

						{/* Item details section */}
						<div className="cart-item-details">
							<div className="cart-item-name">{item.name}</div>
							<div className="cart-item-cost">Unit Price: {item.cost}</div>

							{/* Quantity controls: decrement, quantity display, increment */}
							<div className="cart-item-quantity">
								<button
									className="cart-item-button cart-item-button-dec"
									onClick={() => handleDecrement(item)}
								>
									-
								</button>
								<span className="cart-item-quantity-value">{item.quantity}</span>
								<button
									className="cart-item-button cart-item-button-inc"
									onClick={() => handleIncrement(item)}
								>
									+
								</button>
							</div>

							{/* Item subtotal */}
							<div className="cart-item-total">Subtotal: ${calculateTotalCost(item).toFixed(2)}</div>

							{/* Delete button */}
							<button
								className="cart-item-delete"
								onClick={() => handleRemove(item.name)}
							>
								Delete
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Action buttons: Continue Shopping and Checkout */}
			<div className="continue_shopping_btn">
				<button className="get-started-button" onClick={handleContinueShopping}>
					Continue Shopping
				</button>
				<br />
				<button className="get-started-button1" onClick={handleCheckoutShopping}>
					Checkout
				</button>
			</div>
		</div>
	);
};

export default CartItem;