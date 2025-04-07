import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const itemId = id?.toString(); // safe conversion

  if (!id || !name) {
    return <div className="food-item">Invalid item data</div>;
  }

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt={name} />
        {!cartItems?.[itemId] ? (
          <img
            className='add'
            onClick={() => addToCart(itemId)}
            src={assets.add_icon_white}
            alt='Add to cart'
          />
        ) : (
          <div className='food-item-counter'>
            <img onClick={() => removeFromCart(itemId)} src={assets.remove_icon_red} alt="Remove" />
            <p>{cartItems[itemId]}</p>
            <img onClick={() => addToCart(itemId)} src={assets.add_icon_green} alt="Add" />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="fooditem-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
