import React, { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import { Button } from './UI/Button';
import CartContext from '../store/CartContext.jsx';
import UserProgressContext from '../store/UserProgressContext';


export const Header = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);


  const totalcartItems = cartCtx.items.reduce((totalNumberOfItems, item)=>{
    return totalNumberOfItems + item.quantity;
  },0);

  const handleShowCart = () => {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Rincon Criollo Restaurant"/>
        <h1>Food Order</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalcartItems})</Button>
      </nav>
    </header>
  )
}
