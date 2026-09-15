import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  original_total: 0,
  final_total: 0,
};

export const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // ================= ADD TO CART =================
    addToCart: (state, { payload }) => {
      const product = state.items.find(
        (item) => item._id === payload._id
      );

      if (product) {
        product.qty += 1;
      } else {
        state.items.push({
          ...payload,
          qty: 1,
        });
      }

      state.original_total += Number(payload.originalPrice);
      state.final_total += Number(payload.salePrice);

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // ================= INCREASE QUANTITY =================
    increaseQty: (state, { payload }) => {
      const product = state.items.find(
        (item) => item._id === payload
      );

      if (product) {
        product.qty += 1;

        state.original_total += Number(product.originalPrice);
        state.final_total += Number(product.salePrice);
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // ================= DECREASE QUANTITY =================
    decreaseQty: (state, { payload }) => {
      const product = state.items.find(
        (item) => item._id === payload
      );

      if (product && product.qty > 1) {
        product.qty -= 1;

        state.original_total -= Number(product.originalPrice);
        state.final_total -= Number(product.salePrice);
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // ================= REMOVE PRODUCT =================
    removeFromCart: (state, { payload }) => {
      const product = state.items.find(
        (item) => item._id === payload
      );

      if (product) {
        state.original_total -=
          Number(product.originalPrice) * product.qty;

        state.final_total -=
          Number(product.salePrice) * product.qty;

        state.items = state.items.filter(
          (item) => item._id !== payload
        );
      }

      localStorage.setItem("cart", JSON.stringify(state));
    },

    // ================= LOAD LOCAL STORAGE CART =================
    lsToCart: (state) => {
      const lscart = JSON.parse(
        localStorage.getItem("cart")
      );

      if (lscart) {
        state.items = lscart.items || [];
        state.original_total =
          lscart.original_total || 0;
        state.final_total =
          lscart.final_total || 0;
      }
    },

    // ================= EMPTY CART =================
    emptyCart: (state) => {
      state.items = [];
      state.original_total = 0;
      state.final_total = 0;

      localStorage.removeItem("cart");
    },
  },
});

// ================= EXPORT ACTIONS =================

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  lsToCart,
  emptyCart,
} = cartSlice.actions;

// ================= EXPORT REDUCER =================

export default cartSlice.reducer;