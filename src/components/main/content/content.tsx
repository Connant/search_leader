import React, { useEffect } from "react";
import { getAllProducts } from "../../../store/actions_api";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { selectProducts } from "../../../store/selectors";
import { CardType } from "../../../types/common_types";
import { prettify } from "../../../utils";
import AddToCartButton from "./button/button";

import "./content.scss";

export default function Content(): JSX.Element {
  const products = useAppSelector(selectProducts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <section className="main">
      <h1 className="main__title visually-hidden">
        Лидер Поиска - интернет магазин техники и электроники
      </h1>
      <h2 className="main__section-title">Каталог товаров</h2>
      <ul className="main__list list">
        {products.map((product: CardType, i) => (
          <li className="list__item" key={i}>
            <img
              className="list__item--img"
              src={product.productImage}
              alt="Product"
              height="200"
            />
            <h3 className="list__item--name">{product.productName}</h3>
            <span className="list__item--price">
              {prettify(product.productPrice)} ₽
            </span>
            <AddToCartButton product={product} products={products} />
          </li>
        ))}
      </ul>
    </section>
  );
}
