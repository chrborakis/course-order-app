import React from "react";

const MealItem = (props) => {
    return(
        <ul>
            <div>
                <p>{props.name}</p>
                <p>{props.description}</p>
            </div>
            <div>
                <p>{props.price}</p>
            </div>
        </ul>
    );
};

export default MealItem;