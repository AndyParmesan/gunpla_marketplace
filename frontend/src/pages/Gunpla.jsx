import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Gunpla = ({ setOrders }) => {
  const [gunpla, setGunpla] = useState([]);

  useEffect(() => {
    const fetchAllGunpla = async () => {
      try {
        const res = await axios.get("http://localhost:8800/gunpla");
        setGunpla(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllGunpla();
  }, []);

  const handleShopNow = (product) => {
    setOrders((prevOrders) => [...prevOrders, product]);
    alert(`${product.prod_name} added to your cart!`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/gunpla/${id}`);
      setGunpla(gunpla.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
    }
  };  

  return (
    <div className="App">
      <h1>Gunpla Model Marketplace</h1>
      <div className="Gunpla">
        {gunpla.map((item) => (
          <div className="Gunpla-item" key={item.id}>
            <img
              src={`http://localhost:8800/uploads/${item.image}`}
              alt={item.prod_name}
              style={{ width: "200px", height: "auto" }}
            />
            <h2>{item.prod_name}</h2>
            <p>{item.prod_description}</p>
            <span>${item.price}</span>
            <div className="actions">
              <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
              <button className="update">
                <Link to={`/update/${item.id}`}>Update</Link>
              </button>
              <button className="shop" onClick={() => handleShopNow(item)}>Shop Now</button>
            </div>
          </div>
        ))}
      </div>
      <div className="buttons-container">
        <button className="add-button">
          <Link to="/add" style={{ textDecoration: "none", color: "white" }}>
            Add New Gunpla
          </Link>
        </button>
        <button className="view-cart">
          <Link to="/orders" style={{ textDecoration: "none", color: "white" }}>
            View Cart
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Gunpla;
