import React, { useState, useContext} from "react";
import CartContext from "../../Store/cart-context";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

import classes from "./Cart.module.css";

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);
    const total = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;
    
    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem(item);
    };

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch("https://order-app-a8639-default-rtdb.europe-west1.firebasedatabase.app/orders.json",{
            method: "POST",
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartItems = <ul key={props.id} className={classes["cart-items"]}>
        {cartCtx.items.map( (item) => {
            return <CartItem key={item.id} 
                name={item.name} amount={item.amount} price={item.price}
                onRemove={cartItemRemoveHandler.bind( null, item.id)} onAdd={cartItemAddHandler.bind(null,item)}
            />
    })}</ul>

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const modalActions = <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
        {hasItems && <button onClick={orderHandler} className={classes.button}>Order</button>}
    </div>;

    const cartModalContent = <React.Fragment>{cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{total}</span>
        </div>
        {isCheckout && <CheckOut onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
        {!isCheckout && modalActions}
    </React.Fragment>

    const isSubmittingModalContent = <p>Processing order...!</p>
    const didSubmitModalContent = <React.Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>
            <button className={classes["button--alt"]} onClick={props.onClose}>Close</button>
        </div>
    </React.Fragment>

    return(
        <Modal onClose={props.onClose}>
            { !isSubmitting && !didSubmit && cartModalContent}
            { isSubmitting  && isSubmittingModalContent}
            { !isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;