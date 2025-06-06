import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  items: [],
};

// Create the slice
export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add item to cart or increase quantity if already present
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    // Remove item from cart by name
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },
    // Update the quantity of a cart item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// Export action creators for use in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export reducer as default for store.js
export default CartSlice.reducer;
