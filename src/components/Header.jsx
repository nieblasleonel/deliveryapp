import React, { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import { Button } from './UI/Button';
import CartContext from '../store/CartContext.jsx';


export const Header = () => {
  const cartCtx = useContext(CartContext);
  const totalcartItems = cartCtx.items.reduce((totalNumberOfItems, item)=>{
    return totalNumberOfItems + item.quantity;
  },0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Rincon Criollo Restaurant"/>
        <h1>Food Order</h1>
      </div>
      <nav>
        <Button textOnly >Cart ({totalcartItems})</Button>
      </nav>
    </header>
  )
}
