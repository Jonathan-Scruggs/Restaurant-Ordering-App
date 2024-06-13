import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export const menuArray = [
    {
        name: "Pizza",
        ingredients: ["pepperoni", "mushrom", "mozarella"],
        UUID: uuidv4(),
        price: 14,
        image: "images/pizza.png" 
    },
    {
        name: "Hamburger",
        ingredients: ["beef", "cheese", "lettuce"],
        UUID: uuidv4(),
        price: 12,
        image: "images/hamburger_1f354.png",
    },
    {
        name: "Beer",
        ingredients: ["grain, hops, yeast, water"],
        UUID: uuidv4(),
        price: 12,
        image: "images/beer-mug_1f37a.png",
    }
]