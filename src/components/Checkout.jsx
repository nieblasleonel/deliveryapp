import React, { useContext } from 'react'
import CartContext from '../store/CartContext';
import { Modal } from './UI/Modal';
import {currencyFormatter} from '../utils/formatting.jsx';
import { Input } from './UI/Input';
import { Button } from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';

export const Checkout = () => {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item)=>totalPrice + item.quantity * item.price ,
         0
    );

    const handleClose = () => {
        userProgressCtx.hideCheckout();
    }
    
  return (
    <Modal 
       open={userProgressCtx.progress === 'checkout'}
       onClose={handleClose}
    >
        <form>
            <h2>Checkout</h2>
            <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

            <Input label="Full Name" type="text" id="full-name"/>
            <Input label="E-Mail Address" type="email" id="email"/>
            <Input label="Street" type="text" id="street"/>
            <div className='control-row'>
               <Input label="Postal Code" type="text" id="postal-code"/>
               <Input label="City" type="text" id="city"/>
            </div>

            <p className='modal-actions'>
                <Button onClick={handleClose} type="button" textOnly>Close</Button>
                <Button>Submit Order</Button>
            </p>
        </form>
    </Modal>
  )
}
