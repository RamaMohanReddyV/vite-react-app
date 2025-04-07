import React, { useContext, useState } from 'react';
import './Checkout.css';
import { StoreContext } from '../../context/StoreContext';

const Checkout = () => {
  const { cartItems, food_list, getTotalCartAmount } = useContext(StoreContext);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [upiApp, setUpiApp] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardType, setCardType] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });

  const totalAmount = getTotalCartAmount();

  const handlePlaceOrder = () => {
    if (!address.trim()) {
      alert("Please enter a delivery address.");
      return;
    }

    if (paymentMethod === 'UPI' && (!upiApp || !upiId)) {
      alert("Please select a UPI app and enter your UPI ID.");
      return;
    }

    if (paymentMethod === 'Card' && (!cardType || !cardDetails.number || !cardDetails.expiry || !cardDetails.cvv)) {
      alert("Please fill in all card details.");
      return;
    }

    alert(`✅ Order placed successfully!\n🧾 Payment Mode: ${paymentMethod}\n💰 Total Paid: ₹${totalAmount}`);
    // Reset or API call can be placed here
  };

  return (
    <div className="checkout">
      <h2>Checkout</h2>

      <div className="checkout-section">
        <h3>Delivery Address</h3>
        <textarea
          rows="4"
          placeholder="Enter your full delivery address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="checkout-section">
        <h3>Payment Method</h3>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="COD">Cash on Delivery</option>
          <option value="UPI">UPI</option>
          <option value="Card">Credit/Debit Card</option>
        </select>

        {/* UPI Section */}
        {paymentMethod === 'UPI' && (
          <div className="upi-options">
            <p>Select UPI App:</p>
            <div className="upi-icons">
              <img
                src="https://th.bing.com/th/id/OIP.30p4F0pq4TYLAp7bQ45TCAAAAA?rs=1&pid=ImgDetMain"
                alt="GPay"
                onClick={() => setUpiApp('GPay')}
                className={upiApp === 'GPay' ? 'selected' : ''}
              />
              <img
                src="https://th.bing.com/th/id/OIP.59OS_QJy4kWoMQlAtXCs8AHaHa?rs=1&pid=ImgDetMain"
                alt="PhonePe"
                onClick={() => setUpiApp('PhonePe')}
                className={upiApp === 'PhonePe' ? 'selected' : ''}
              />
              <img
                src="https://pnghq.com/wp-content/uploads/2023/02/paytm-transparent-logo-png-1542-768x252.png"
                alt="Paytm"
                onClick={() => setUpiApp('Paytm')}
                className={upiApp === 'Paytm' ? 'selected' : ''}
              />
            </div>
            <input
              type="text"
              placeholder="Enter your UPI ID"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
            />
          </div>
        )}

        {/* Card Section */}
        {paymentMethod === 'Card' && (
          <div className="card-section">
            <p>Select Card Type:</p>
            <div className="card-icons">
              <img
                src="https://imgk.timesnownews.com/story/1569653930-Credit_Card.jpg"
                alt="Credit Card"
                onClick={() => setCardType('Credit')}
                className={cardType === 'Credit' ? 'selected' : ''}
              />
              <img
                src="https://thumbs.dreamstime.com/z/credit-cards-26582712.jpg"
                alt="Debit Card"
                onClick={() => setCardType('Debit')}
                className={cardType === 'Debit' ? 'selected' : ''}
              />
            </div>
            <input
              type="text"
              placeholder="Card Number"
              maxLength="16"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
            />
            <input
              type="text"
              placeholder="MM/YY"
              maxLength="5"
              value={cardDetails.expiry}
              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
            />
            <input
              type="password"
              placeholder="CVV"
              maxLength="3"
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
            />
          </div>
        )}
      </div>

      <div className="checkout-section">
        <h3>Order Summary</h3>
        <ul className="order-summary">
          {food_list.map(item => {
            if (cartItems[item._id] > 0) {
              return (
                <li key={item._id}>
                  <span>{item.name} x {cartItems[item._id]}</span>
                  <span>₹{item.price * cartItems[item._id]}</span>
                </li>
              );
            }
            return null;
          })}
        </ul>
        <h4>Total to Pay: ₹{totalAmount}</h4>
      </div>

      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default Checkout;