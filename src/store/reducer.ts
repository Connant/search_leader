import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardType, TotalPrice } from "../types/common_types";

export type State = {
  products: Array<CardType>;
  error: string;
  cart: Array<CardType>;
  totalPrice: TotalPrice;
  productsInCart: CardType[];
};

const initialState: State = {
  products: [],
  error: "",
  cart: [],
  totalPrice: {},
  productsInCart: [],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Array<CardType>>) => {
      state.products = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addProductInCart: (state, action: PayloadAction<number>) => {
      const selectedProduct = state.products?.find(
        (i) => i.id === action.payload
      );
      if (!selectedProduct) return;
      state.cart.push(selectedProduct);
    },
    deleteFromBasket: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((i) => i.id !== action.payload);
    },

    setQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const selectedProduct = state.cart.find(
        (i) => i.id === action.payload.id
      );
      if (!selectedProduct) return;
      selectedProduct.quantity = action.payload.quantity;
    },
  },
});

export const {
  setProducts,
  setError,
  deleteFromBasket,
  addProductInCart,
  setQuantity,
} = mainSlice.actions;

export default mainSlice.reducer;
