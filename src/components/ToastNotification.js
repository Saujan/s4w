import React from 'react'
import {toast, ToastContainer, Bounce} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

export function ToastNotification(type,msg){
    var config = {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition : Bounce,
            className : 'styled-toast'
        };
    var config_default = {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            transition : Bounce,
            className : 'styled-toast-default'
        };
    if(type == 'success'){
        toast.success(msg,config);
    }else if(type == 'info'){
        toast.info(msg,config)
    }else if(type == 'error'){
        toast.error(msg,config)
    }else{
        toast(msg,config_default)
    }
}

export default ToastNotification;
