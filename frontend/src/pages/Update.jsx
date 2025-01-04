import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [Gunpla, setGunpla] = useState({
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
        console.log(err);
      }
    };
    fetchGunplaData();
  }, [gunplaId]);

  const handleChange = (e) => {
    setGunpla((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("Gunpla state:", Gunpla);  // Debug: Check if state is updated correctly
    if (!Gunpla.prod_name || !Gunpla.prod_description || !Gunpla.price || !Gunpla.image) {
      alert("Please fill in all fields.");
      return;
    }
    try {
      await axios.put(`http://localhost:8800/gunpla/${gunplaId}`, Gunpla);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form">
      <h1>Update Gunpla Item</h1>
      <input
        type="text"
        placeholder="name"
        value={Gunpla.prod_name}
        onChange={handleChange}
        name="prod_name"
      />
      <input
        type="text"
        placeholder="description"
        value={Gunpla.prod_description}
        onChange={handleChange}
        name="prod_description"
      />
      <input
        type="text"
        placeholder="image"
        value={Gunpla.image}
        onChange={handleChange}
        name="image"
      />
      <input
        type="number"
        placeholder="price"
        value={Gunpla.price}
        onChange={handleChange}
        name="price"
      />

      <button onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;
