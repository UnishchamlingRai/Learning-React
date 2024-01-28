import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addingCart(state, action) {
      //   console.log("hello from add cart:", action.payload)
      state.cart.push(action.payload);
    },
    deleteCart(state, action) {
      state.cart = state.cart.filter((cart) => {
        return cart.pizzaId !== action.payload;
      });
    },
    increaseCartQuanitity(state, action) {
      let item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
    },
    decreaseCartQuanitity(state, action) {
      let item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      if (item.quantity === 0) {
        state.cart = state.cart.filter(
          (item) => item.pizzaId !== action.payload,
        );
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addingCart,
  deleteCart,
  increaseCartQuanitity,
  decreaseCartQuanitity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

///get useSlector
export function getAllCart(state) {
  return state.cart.cart;
}

export const getTotalCartPizzaQuantity = (state) =>
  state.cart.cart.reduce((sum, currPizza) => {
    return sum + currPizza.quantity;
  }, 0);
export const getTotalCartPizzaPrice = (state) => {
  return state.cart.cart.reduce((sum, currPizza) => {
    return sum + currPizza.quantity * currPizza.unitPrice;
  }, 0);
};

export const getCurrentCartById = (id) => {
  return (state) => state.cart.cart.find((item) => item.pizzaId === id);
};
