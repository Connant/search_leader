import React from "react";
import Footer from "../common/footer/footer";
import Header from "../common/header/header";
import Basket from "./basket";


export default function BasketPage() {
  return (
    <React.Fragment>
      <Header />
      <Basket />
      <Footer />
    </React.Fragment>
  )
};
