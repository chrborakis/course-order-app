import React from 'react';
import MainHeader from './Components/UI/MainHeader';
import Meals from './Components/Meals/Meals';
import './App.css';

function App() {

    const mealsList = [
        {id:"f01", name:"Sushi", description:"Finest fish and veggies", price:"22.99"},
        {id:"f02", name:"Schnitzel", description:"A german specialty!", price:"16.50"},
        {id:"f03", name:"Barbecue Burger", description:"American, raw, meaty", price:"12.99"},
        {id:"f04", name:"Green Bowl", description:"Heathy...and...green...", price:"18.99"}
    ];

    return (
      <React.Fragment>
        <MainHeader />
        <Meals meals={mealsList}/>
      </React.Fragment>
    );
}

export default App;
