import React from 'react';
import './Toast.scss'
import success from '../../../assets/icons/success.svg'


function Toast({visible, data}) {
    return(<div id="snackbar" className={visible ? 'show' : 'hide'}>
        <div className="snackbar-body">
         <div className="snackbar-img">
             <img src={success} alt="success" />
             </div>
         <div className="snackbar-group">
            <div className="snackbar-title">{data.name}</div> 
            <div className="snackbar-qty">Stock purchased of Qty {data.qty}</div>
         </div>
        </div>
        </div>)
}

export default Toast