import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Update = () => {
  const [gunpla, setGunpla] = useState({
    prod_name: "",
    prod_description: "",
    price: null,
    image: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const gunplaId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchGunplaData = async () => {
      try {
        const response = await axios.get(`http://localhost:8800/gunpla/${gunplaId}`);
        setGunpla(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGunplaData();
  }, [gunplaId]);

  const handleChange = (e) => {
    setGunpla((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function handleClick(e) {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8800/gunpla/${gunplaId}`, gunpla);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="form-container">
      <div className="form">
        <h1>Update Gunpla</h1>
        <input
          type="text"
          placeholder="name"
          value={gunpla.prod_name}
          onChange={handleChange}
          name="prod_name"
        />
        <input
          type="text"
          placeholder="description"
          value={gunpla.prod_description}
          onChange={handleChange}
          name="prod_description"
        />
        <input
          type="text"
          placeholder="image"
          value={gunpla.image}
          onChange={handleChange}
          name="image"
        />
        <input
          type="number"
          placeholder="price"
          value={gunpla.price}
          onChange={handleChange}
          name="price"
        />
        <button onClick={handleClick}>Update</button>
      </div>
    </div>
  );
};

export default Update;
