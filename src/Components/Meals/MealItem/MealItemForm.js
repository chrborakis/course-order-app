import { useState, useRef } from "react";

import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {   
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredAmountStr = amountInputRef.current.value;
        const enteredAmount = +enteredAmountStr;

        if( enteredAmount.lenght === 0 || enteredAmount < 1 || enteredAmount > 10){
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmount);
    };

    return(
        <form onClick={submitHandler} className={classes.form}>
            <Input ref={amountInputRef} label="Amount" input={{
                id: 'amount_' + props.id, type: 'number',
                min: '1',max: '5', step: '1', defaultValue: '1'
            }}/>
            <button>Add</button>
            {!amountIsValid && <p>Please entere a valid Amount!</p>}
        </form>
    );
};

export default MealItemForm;