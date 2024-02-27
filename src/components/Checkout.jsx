import React, { useContext } from 'react'
import CartContext from '../store/CartContext';
import { Modal } from './UI/Modal';
import {currencyFormatter} from '../utils/formatting.jsx';
import { Input } from './UI/Input';
import { Button } from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import useHttp from '../hooks/useHttp';
import { Error } from './Error';

const requestConfig = {
    method: 'POST',
    headers:{
        'Content-Type': 'application/json'
    },
};

export const Checkout = () => {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    
    const {
        data, 
        isLoading: isSending, 
        error,
        sendRequest,
        clearData
      } = useHttp('http://localhost:3000/orders', requestConfig)


    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item)=>totalPrice + item.quantity * item.price ,
         0
    );

    const handleClose = () => {
        userProgressCtx.hideCheckout();
    }

    const handleFinish = () =>{
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));
        
    }
    
    let actions = (
        <>
           <Button onClick={handleClose} type="button" textOnly>Close</Button>
           <Button>Submit Order</Button>
        </>
    );
    if(isSending){
        actions = <span>Sending order data...</span>
    }

    if(data && !error){
    return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
               <h2>Succes!</h2>
               <p>Your order was submited succesfully</p>
               <p>We will get back to you with more details via email within the next few minutes</p>
               <p className='modal-actions'>
                <Button onClick={handleFinish}>Okay</Button>
               </p>
           </Modal>
    }

  return (
    <Modal 
       open={userProgressCtx.progress === 'checkout'}
       onClose={handleClose}
    >
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total amount: {currencyFormatter.format(cartTotal)}</p>

            <Input label="Full Name" type="text" id="name"/>
            <Input label="E-Mail Address" type="email" id="email"/>
            <Input label="Street" type="text" id="street"/>
            <div className='control-row'>
               <Input label="Postal Code" type="text" id="postal-code"/>
               <Input label="City" type="text" id="city"/>
            </div>

            {error && <Error title="Failed to submit order" message={error}/>}

            <p className='modal-actions'>{actions}</p>
        </form>
    </Modal>
  )
}
