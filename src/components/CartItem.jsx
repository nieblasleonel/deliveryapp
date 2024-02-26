import React from 'react';
import { Button } from './UI/Button';
import {currencyFormatter} from '../utils/formatting.jsx';

export const CartItem = ({name, quantity, price, onIncrease, onDecrease}) => {
  return <li className='cart-item'>
    <p>
        {name} - {quantity} x {currencyFormatter.format(price)}
    </p>
    <p className='cart-item-actions'>
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
    </p>
  </li>
}
