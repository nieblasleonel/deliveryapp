import React from 'react';
import logoImg from '../assets/logo.jpg';

export const Header = () => {
  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="Rincon Criollo Restaurant"/>
        <h1>Food Order</h1>
      </div>
      <nav>
        <button>Cart (0)</button>
      </nav>
    </header>
  )
}
