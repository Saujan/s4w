import React from 'react'
import {toast, ToastContainer, Bounce} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const CONFIG_DEFAULT = {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        transition : Bounce,
        className : 'styled-toast-default'
    };
var CONFIG = CONFIG_DEFAULT;
CONFIG['className'] = 'styled-toast';

export function ToastNotification(type, msg){
    if(type == 'success'){
        toast.success(msg,CONFIG);
    }else if(type == 'info'){
        toast.info(msg,CONFIG)
    }else if(type == 'error'){
        toast.error(msg,CONFIG)
    }else{
        toast(msg,CONFIG_DEFAULT)
    }
}

export default ToastNotification;
