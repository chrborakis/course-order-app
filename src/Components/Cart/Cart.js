import React, {useContext} from "react";
import CartContext from "../../Store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const total = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem(item);
    };

    const cartItems = <ul key={props.id} className={classes["cart-items"]}>
        {cartCtx.items.map( (item) => {
            return <CartItem key={item.id} 
                name={item.name} amount={item.amount} price={item.price}
                onRemove={cartItemRemoveHandler.bind( null, item.id)} onAdd={cartItemAddHandler.bind(null,item)}
            />
    })}</ul>

    return(
        <Modal onClose={props.onClose}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{total}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
                {hasItems && <button className={classes.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;