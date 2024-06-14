import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalAmount: 0,
  },
  reducers: {
    addItemToCart: (state, action) => {
      const { product, restaurant } = action.payload;

      if (state.items.length > 0 && restaurant.id !== state.restaurantId) {
        throw new Error("You cannot order from multiple restaurants!");
      }

      const existingProductIndex = state.items.findIndex(
        (p) => p.id === product.id
      );
      if (existingProductIndex >= 0) {
        state.items[existingProductIndex].quantity++;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.totalAmount += parseFloat(product.price);
      state.restaurantId = restaurant.id;
    },
    removeItemFromCart: (state, action) => {
      const id = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);
      if (itemIndex >= 0) {
        state.totalAmount -=
          parseFloat(state.items[itemIndex].price) *
          parseFloat(state.items[itemIndex].quantity);
        state.items.splice(itemIndex, 1);
      }
    },
    resetItemsInCart: (state, action) => {
      state.items = [];
      state.totalAmount = 0;
    },
  },
});

export const { addItemToCart, removeItemFromCart, resetItemsInCart } =
  cartSlice.actions;
export default cartSlice.reducer;
