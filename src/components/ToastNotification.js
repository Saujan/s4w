import React from 'react'
import {toast, ToastContainer, Bounce} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export function ToastNotification(msg){
    toast.success(msg,{
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition : Bounce,
        className : 'styled-toast-success'
      });
}

export default ToastNotification;
