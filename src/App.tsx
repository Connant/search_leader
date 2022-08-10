import React from 'react';
import { Route, Routes } from "react-router-dom";
import Main from './components/main/main';
import './app.scss';
import BasketPage from './components/basket/basket-page';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/basket" element={<BasketPage />} />
    </Routes>
  );
}
