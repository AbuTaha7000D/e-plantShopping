// Import configureStore function from Redux Toolkit to create the Redux store
import { configureStore } from '@reduxjs/toolkit';

// Import the cart reducer from CartSlice to manage cart-related state
import cartReducer from './CartSlice';

// Configure and create the Redux store using configureStore
const store = configureStore({
	// Define the root reducer object
	reducer: {
		// 'cart' is the slice name in the global state, managed by cartReducer
		// This allows accessing cart state via state.cart in components
		cart: cartReducer,
	},
});

// Export the configured store as default to be used in the app's Provider
export default store;