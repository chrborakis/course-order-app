import React from "react";
import MealItem from "./MealItem";

const Meals = (props) => {
    return(
        <ul>
            {props.meals.map( (meal) => {
                return(
                    <MealItem key={meal.id} 
                        name={meal.name} 
                        description={meal.description} 
                        price={meal.price}
                    />
                )
            }
            )}
        </ul>
    );
};

export default Meals;
