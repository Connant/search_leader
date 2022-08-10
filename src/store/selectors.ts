import { State } from "./reducer";

export const selectProducts = (state: State) => state.products;
export const selectCart = (state: State) => state.cart;

export const getProductsInCart = (state: State) => state.productsInCart;
