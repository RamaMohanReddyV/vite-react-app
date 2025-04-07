import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems = {}, food_list = [], removeFromCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const getTotalAmount = () => {
    return food_list.reduce((total, item) => {
      return total + (cartItems[item._id] || 0) * item.price;
    }, 0);
  };

  const cartHasItems = food_list.some(item => cartItems[item._id] > 0);

  return (
    <div className="cart">
      <h2 className="cart-heading">Your Cart</h2>

      {!cartHasItems ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-grid cart-header">
            <p>Item</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <hr />

          {food_list.map(item => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id} className="cart-grid cart-row">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>₹{item.price * cartItems[item._id]}</p>
                  <p className="remove" onClick={() => removeFromCart(item._id)}>×</p>
                </div>
              );
            }
            return null;
          })}

          <hr />
          <div className="cart-summary">
            <h3>Total: ₹{getTotalAmount()}</h3>
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
