import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
	name: 'cart',
	initialState: {
		items: [], // Array to store cart items
	},
	reducers: {
		// Add a new item to the cart or increase quantity if it already exists
		addItem: (state, action) => {
			const { name, image, cost } = action.payload; // Extract product details from action payload
			// Check if the item already exists in the cart by comparing names
			const existingItem = state.items.find(item => item.name === name);
			if (existingItem) {
				// If item exists, increment its quantity
				existingItem.quantity++;
			} else {
				// If item doesn't exist, add it to the cart with quantity 1
				state.items.push({ name, image, cost, quantity: 1 });
			}
		},

		// Remove an item from the cart based on its name
		removeItem: (state, action) => {
			// Filter out the item with the matching name
			state.items = state.items.filter(item => item.name !== action.payload);
		},

		// Update the quantity of a specific item in the cart
		updateQuantity: (state, action) => {
			const { name, quantity } = action.payload; // Extract item name and new quantity from payload
			// Find the item in the cart that matches the given name
			const itemToUpdate = state.items.find(item => item.name === name);
			if (itemToUpdate) {
				// Update the item's quantity to the new value
				itemToUpdate.quantity = quantity;
			}
		},
	},
});

// Export action creators for use in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export reducer as default for use in store.js
export default CartSlice.reducer;