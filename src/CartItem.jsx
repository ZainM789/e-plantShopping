import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach(item => {
      const costNum = typeof item.cost === "string"
        ? parseFloat(item.cost.replace(/^\$/, ""))
        : Number(item.cost);
      total += costNum * item.quantity;
    });
    return total.toFixed(2);
  };

  // Calculate subtotal for each item
  const calculateTotalCost = (item) => {
    const costNum = typeof item.cost === "string"
      ? parseFloat(item.cost.replace(/^\$/, ""))
      : Number(item.cost);
    return (costNum * item.quantity).toFixed(2);
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) onContinueShopping(e);
  };

  const handleCheckoutShopping = () => {
    alert('Functionality to be added for future reference');
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <button onClick={handleContinueShopping}>Continue Shopping</button>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map(item => (
              <li key={item.name} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-cost">${typeof item.cost === "string"
                    ? item.cost.replace(/^\$/, "")
                    : item.cost}</span>
                  <div className="cart-item-quantity">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <span className="cart-item-subtotal">
                    Subtotal: ${calculateTotalCost(item)}
                  </span>
                  <button
                    className="cart-item-remove"
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <strong>Total: ${calculateTotalAmount()}</strong>
          </div>
          <div className="cart-controls">
            <button onClick={handleContinueShopping}>Continue Shopping</button>
            <button onClick={handleCheckoutShopping}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
