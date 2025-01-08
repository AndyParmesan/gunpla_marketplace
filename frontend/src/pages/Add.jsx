import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [gunpla, setGunpla] = useState({
    prod_name: "",
    prod_description: "",
    price: null,
    image: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setGunpla((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!gunpla.prod_name || !gunpla.prod_description || !gunpla.price || !gunpla.image) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await axios.post("http://localhost:8800/gunpla", gunpla);
      navigate("/gunpla");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <div className="form">
        <h1>Add New Item</h1>
        <input
          type="text"
          placeholder="name"
          onChange={handleChange}
          name="prod_name"
        />
        <input
          type="text"
          placeholder="description"
          onChange={handleChange}
          name="prod_description"
        />
        <input
          type="text"
          placeholder="image"
          onChange={handleChange}
          name="image"
        />
        <input
          type="number"
          placeholder="price"
          onChange={handleChange}
          name="price"
        />
        <button onClick={handleClick}>Add</button>
      </div>
    </div>
  );
};

export default Add;
