import { setProducts, setError,  } from "./reducer";
import { api } from "../service/service";
import { ThunkAction, Action } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const getAllProducts =
  (): AppThunk =>
  async (dispatch, _getState): Promise<void> => {
    try {
      const { products } = await api.getProducts()
      dispatch(setProducts(products.map((card => ({...card, quantity: 1, price: +card.productPrice})))));
    } catch (error: any) {
      dispatch(setError(error.message));
    }
  };
