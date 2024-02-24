import React, { useEffect } from 'react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

export const Modal = ({children, open, className=''}) => {

    const dialog = useRef();

    useEffect(() => {
    if(open){
      dialog.current.showModal();
    }
    }, [open])
    

  return createPortal(
     <dialog ref={dialog} className={`modal ${className}`}>{children}</dialog>, 
     document.getElementById('modal')
  );
  
}
