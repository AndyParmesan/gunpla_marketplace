import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Add = () => {
  const [Gunpla, setGunpla] = useState({
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
    // Validation
    if (!Gunpla.prod_name || !Gunpla.prod_description || !Gunpla.price || !Gunpla.image) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await axios.post("http://localhost:8800/Gunpla", Gunpla);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Add New Item</h1>
      <input type="text" placeholder="name" onChange={handleChange} name="prod_name" />
      <input type="text" placeholder="description" onChange={handleChange} name="prod_description" />
      <input type="text" placeholder="image" onChange={handleChange} name="image" />
      <input type="number" placeholder="price" onChange={handleChange} name="price" />

      <button onClick={handleClick}>Add</button>
    </div>
  );
};

export default Add;
