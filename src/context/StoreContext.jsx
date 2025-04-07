import React, { createContext, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (id) => {
    setCartItems((prev) => ({
      ...prev,
      [id]: prev[id] ? prev[id] + 1 : 1,
    }));
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => {
      if (!prev[id]) return prev;
      const updatedCart = { ...prev };
      if (updatedCart[id] === 1) {
        delete updatedCart[id];
      } else {
        updatedCart[id] -= 1;
      }
      return updatedCart;
    });
  };

  // const getTotalCartAmount = () => {
  //   let total = 0;
  //   for (const itemId in cartItems) {
  //     const foodItem = food_list.find((item) => item?.id?.toString() === itemId);
  //     if (foodItem) {
  //       total += foodItem.price * cartItems[itemId];
  //     }
  //   }
  //   return total;
  // };
  const getTotalCartAmount = () => {
    return food_list.reduce((total, item) => {
      const quantity = cartItems[item._id] || 0;
      return total + quantity * item.price;
    }, 0);
  };
  

  return (
    <StoreContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        food_list, // Ensuring food_list is passed into context
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
