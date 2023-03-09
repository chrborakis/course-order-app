import React, {useContext, useEffect, useState} from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../../Store/cart-context";

import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
    const cartContext = useContext(CartContext);
    const [btnHighlighted, setBtnHighlighted] = useState(false);

    const {items} = cartContext;

    const cartSize = items.reduce( (currNumber, item) => {
        return( currNumber + item.amount);
    }, 0);

    const btnClasses = `${classes.button} ${ btnHighlighted ? classes.bump : ""}`;

    useEffect( () => {
        if( items.length === 0) return;
        setBtnHighlighted(true); 

        const timer = setTimeout( () => {
            setBtnHighlighted(false);
        }, 300)

        return () => clearTimeout(timer);
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon /></span>
            <span>My Cart</span>
            <span className={classes.badge}>{cartSize}</span>
        </button>
    );
};

export default HeaderCartButton;