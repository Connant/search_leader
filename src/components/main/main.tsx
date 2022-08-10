import React from "react";
import Footer from "../common/footer/footer";
import Header from "../common/header/header";
import Content from "./content/content";

export default function Main(): JSX.Element {

  return (
    <React.Fragment>
      <Header />
      <Content />
      <Footer />
    </React.Fragment>
  );
}
