import React, { useContext, useState, useEffect } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import { food_list } from '../../assets/assets';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  const { cartItems } = useContext(StoreContext);
  const [filteredFood, setFilteredFood] = useState([]);

  useEffect(() => {
    if (category === "All") {
      setFilteredFood(food_list);
    } else {
      const filtered = food_list.filter(item => item.category === category);
      setFilteredFood(filtered);
    }
  }, [category]);

  useEffect(() => {
    const handleSearch = (e) => {
      const term = e.detail;
      const searchFiltered = food_list.filter(item =>
        item.name.toLowerCase().includes(term)
      );
      setFilteredFood(searchFiltered);
    };

    window.addEventListener("search-items", handleSearch);
    return () => window.removeEventListener("search-items", handleSearch);
  }, []);

  return (
    <div className="food-display" id="food-display">
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {filteredFood.map((item) => (
          <FoodItem
            key={item._id}
            id={item._id} 
            name={item.name}
            image={item.image}
            price={item.price}
            description={item.description}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
