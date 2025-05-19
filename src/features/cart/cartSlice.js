import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItems(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    addQuantity(state, action) {
      const item = state.cart.find((item) => action.payload === item.pizzaId);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    deleteQuantity(state, action) {
      const item = state.cart.find((item) => action.payload === item.pizzaId);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { addItem, deleteItems, addQuantity, deleteQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

export const totalCartPizzaQuantity = (state)=> state.cart.cart.reduce((sum,items)=>sum + items.quantity,0);

export const totalPizzaPrice1 = (state) =>state.cart.cart.reduce((sum, item) => sum + item.totalPrice,0);