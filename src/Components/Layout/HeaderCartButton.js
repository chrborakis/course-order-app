import React, {useContext} from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../Store/cart-context";

import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
    const cartContext = useContext(CartContext);

    const cartSize = cartContext.items.reduce( (currNumber, item) => {
        return( currNumber + item.amount);
    }, 0);

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon /></span>
            <span>My Cart</span>
            <span className={classes.badge}>{cartSize}</span>
        </button>
    );
};

export default HeaderCartButton;