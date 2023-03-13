import { useRef, useState} from "react";
import classes from './CheckOut.module.css';

const isEmpty = value => value.trim() === "";
const isFiveChars = value => value.trim().length === 5;

const CheckOut = (props) => {
    const [formInputsValidity, setFromInputsValidity] = useState({
        name: true, city: true, street: true, postal: true
    });

    const nameRef = useRef();
    const cityRef = useRef();
    const streetRef = useRef();
    const postalRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const name = nameRef.current.value;
        const city = cityRef.current.value;
        const street = streetRef.current.value;
        const postal = postalRef.current.value;

        setFromInputsValidity({
            name:   !isEmpty(name),
            city:   !isEmpty(city),
            street: !isEmpty(street),
            postal: isFiveChars(postal)
        });

        const formIsValid = formInputsValidity;
        if( !formIsValid){
            return;
        }

        props.onConfirm({name, city, street, postal});
    };

    const nameControlClasses   = `${classes.control} ${formInputsValidity.name ? "" : classes.invalid}`;
    const cityControlClasses   = `${classes.control} ${formInputsValidity.city ? "" : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formInputsValidity.street ? "" : classes.invalid}`;
    const postalControlClasses = `${classes.control} ${formInputsValidity.postal ? "" : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
            <label htmlFor='name'>Your Name</label>
            <input ref={nameRef} type='text' id='name' />
            {!formInputsValidity.name && <p>Please enter a valid name!</p>}
        </div>
        <div className={cityControlClasses}>
            <label htmlFor='city'>City</label>
            <input ref={cityRef} type='text' id='city' />
            {!formInputsValidity.city && <p>Please enter a valid City!</p>}
        </div>
        <div className={streetControlClasses}>
            <label htmlFor='street'>Street</label>
            <input ref={streetRef} type='text' id='street' />
            {!formInputsValidity.street && <p>Please enter a valid Street!</p>}
        </div>
        <div className={postalControlClasses}>
            <label htmlFor='postal'>Postal Code</label>
            <input ref={postalRef} type='text' id='postal' />
            {!formInputsValidity.postal && <p>Please enter a valid Postal Code!</p>}
        </div>
        <div className={classes.actions}>
            <button type='button' onClick={props.onCancel}>
            Cancel
            </button>
            <button className={classes.submit}>Confirm</button>
        </div>
        </form>
    );
};

export default CheckOut;