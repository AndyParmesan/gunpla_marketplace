import React from "react";
import { Link } from "react-router-dom";

const Orders = ({ orders, setOrders }) => {
  // Ensure price is numeric
  const totalPrice = orders.reduce((sum, item) => sum + (Number(item.price) || 0), 0);

  // Remove an item from the cart
  const handleRemove = (index) => {
    const updatedOrders = orders.filter((_, i) => i !== index);
    setOrders(updatedOrders);
  };

  // Handle checkout (clear cart)
  const handleCheckout = () => {
    if (orders.length === 0) {
      alert("Your cart is empty. Add some items before checking out!");
      return;
    }

    alert("Thank you for your purchase! Your order has been placed.");
    setOrders([]);
  };

  return (
    <div className="Orders">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>
          No items in your cart yet! <Link to="/gunpla">Shop Now</Link>
        </p>
      ) : (
        <>
          <div className="OrderSummary">
            <h2>Order Summary</h2>
            <p>Total Items: {orders.length}</p>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
          </div>

          <div className="Gunpla">
            {orders.map((item, index) => (
              <div className="Gunpla-item" key={index}>
                {item.image && (
                  <img
                    src={`http://localhost:8800/uploads/${item.image}`}
                    alt={item.prod_name}
                    style={{ width: "200px", height: "auto" }}
                  />
                )}
                <h2>{item.prod_name}</h2>
                <p>{item.prod_description}</p>
                <span>${(Number(item.price) || 0).toFixed(2)}</span>
                <button
                  className="remove"
                  onClick={() => handleRemove(index)}
                >
                  Remove from Cart
                </button>
              </div>
            ))}
          </div>

          <div className="Buttons">
            <button className="checkout" onClick={handleCheckout}>
              Checkout
            </button>
            <button className="continue-shopping">
              <Link to="/gunpla" style={{ textDecoration: "none", color: "white" }}>
                Continue Shopping
              </Link>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;
