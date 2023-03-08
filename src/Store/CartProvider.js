import React, {useReducer} from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = ( state, action) => {
    if( action.type === "ADD"){
        return {
            items: state.items.concat(action.item),
            total: state.totalAmount + action.item.price * action.item.amount
        };
    }else if( action.type === "REMOVE"){

    }
    return defaultCartState;
};

const CartProvider = (props) => { 
    const [cartState, dispatchCartAction] = useReducer( cartReducer, defaultCartState);

    const addToCart = (item) => {
        dispatchCartAction({type: "ADD", item: item});
    };
    const removeFromCart = (id) => {
        dispatchCartAction({type: "REMOVE", id: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addToCart,
        removeItem: removeFromCart
    };

    return(<CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>);
};

export default CartProvider;