import React, {useState, useEffect} from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvaliableMeals.module.css";

import useHttp from "../../Hooks/use-http";

const AvaliableMeals = () => {
    const [meals, setMeals] = useState([]);
    const {isLoading, error, sendRequest: fetchMeals} = useHttp();  

    useEffect(() => {
        const transformMeals = (meals) => {
            const loadedMeals = [];
            for( const key in meals) {
                loadedMeals.push({
                    id:meals[key].id, 
                    name:meals[key].name, 
                    description:meals[key].name, 
                    price:meals[key].price})
            }; 
            setMeals(loadedMeals);
        };
        fetchMeals({url:'https://order-app-a8639-default-rtdb.europe-west1.firebasedatabase.app/meals.json'},transformMeals);
    }, [fetchMeals]);
    
    const mealsList = meals.map( (meal) => {
        return <MealItem id={meal.id} key={meal.id} name={meal.name} description={meal.name} price={meal.price}/>
    });
 
    if( isLoading){
        return <section className={classes.MealsLoading}><p>Is Loading...</p></section>;
    }   

    if( error){
        return <section className={classes.MealsError}><p>{error}</p></section>;
    }

    return(
        <section className={classes.meals}>
            <Card>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvaliableMeals;