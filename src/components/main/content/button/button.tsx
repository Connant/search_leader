import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { addProductInCart } from "../../../../store/reducer";
import { selectCart } from "../../../../store/selectors";
import { CardType } from "../../../../types/common_types";

import './button.scss';

type AddToCartButtonProps = {
  product: CardType;
  products: CardType[];
};

export default function AddToCartButton({ product, products }: AddToCartButtonProps): JSX.Element {

  const productsInCart = useAppSelector(selectCart)
  const dispatch = useAppDispatch();

  const alreadyInCart = useMemo(() => productsInCart.some(p => p.id === product.id), [productsInCart, product]);

  return (
    <button
      className={
        alreadyInCart
          ? "list__item--button--active"
          : " list__item--button"
      }
      disabled={(alreadyInCart === true)}
      onClick={() => dispatch(addProductInCart(product.id))}
      type="button"
    >
      {alreadyInCart ? "В корзине" : "Добавить в корзину"}
    </button>
  );
}
