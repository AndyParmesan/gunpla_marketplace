import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const [gunpla, setGunpla] = useState({
    prod_name: "",
    prod_description: "",
    price: null,
    image: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Get the product ID from the URL

  useEffect(() => {
    const fetchGunpla = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/gunpla/${id}`);
        setGunpla(response.data);
      } catch (err) {
        console.error("Error fetching Gunpla:", err);
      }
    };
    fetchGunpla();
  }, [id]);

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
      await axios.put(`http://localhost:8800/gunpla/${id}`, gunpla);
      navigate("/");
    } catch (err) {
      console.error("Error updating Gunpla:", err);
    }
  };

  return (
    <div className="form-container">
      <div className="form">
        <h1>Update Gunpla</h1>
        <input
          type="text"
          placeholder="name"
          onChange={handleChange}
          name="prod_name"
          value={gunpla.prod_name}
        />
        <input
          type="text"
          placeholder="description"
          onChange={handleChange}
          name="prod_description"
          value={gunpla.prod_description}
        />
        <input
          type="text"
          placeholder="image"
          onChange={handleChange}
          name="image"
          value={gunpla.image}
        />
        <input
          type="number"
          placeholder="price"
          onChange={handleChange}
          name="price"
          value={gunpla.price}
        />
        <button onClick={handleClick}>Update</button>
      </div>
    </div>
  );
};

export default Update;
