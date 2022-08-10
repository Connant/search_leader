/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { deleteFromBasket, setQuantity } from "../../store/reducer";
import { selectCart } from "../../store/selectors";
import { CardType } from "../../types/common_types";

import "./basket.scss";
import BasketForm from "./form/basket-form";
import Counter from "./counter/counter";

export default function Basket() {
  const cart = useAppSelector(selectCart);
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (sum, product) => sum + +product.productPrice * product.quantity,
        0
      ),
    [cart]
  );

  useEffect(() => {
    if (cart.length === 0) nav("/", { replace: true });
  }, [cart.length, nav]);

  return (
    <section className="basket">
      <div className="basket__content">
        <h2 className="basket__content--title">Корзина</h2>
        <ul className="basket__content--list basket-list">
          {cart.map((product: CardType, i) => (
            <li className="basket-list__item" key={i}>
              <div className="basket-list__item-img-wrapper">
                <img
                  className="basket-list__item--img"
                  src={product.productImage}
                  alt="Product"
                  height="150"
                />
              </div>

              <h3 className="basket-list__item--name">{product.productName}</h3>

              <div className="quantity cart-item__quantity">
                <Counter
                  value={product.quantity ?? 1}
                  onChange={(quantity) =>
                    dispatch(setQuantity({ id: product.id, quantity }))
                  }
                />
              </div>

              <div className="basket-list__item--price">
                {+product.productPrice * (product.quantity ?? 1)} ₽
              </div>
              <button
                className="basket-list__item--button counter__button"
                onClick={() => dispatch(deleteFromBasket(product.id))}
              >
                <span>
                Удалить
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className="basket__content--price">Сумма {totalPrice} ₽</p>
      </div>
      <BasketForm />
    </section>
  );
}
