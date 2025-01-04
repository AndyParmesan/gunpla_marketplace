import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Gunpla = () => {
  const [Gunpla, setGunpla] = useState([]);

  useEffect(() => {
    const fetchAllGunpla = async () => {
      try {
        const res = await axios.get("http://localhost:8800/Gunpla");
        setGunpla(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllGunpla();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/Gunpla/${id}`);
      setGunpla(Gunpla.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <h1>Gunpla Model Marketplace</h1>
      <div className="Gunpla">
        {Gunpla.map((item) => (
          <div className="Gunpla-item" key={item.id}>
            <img src={`http://localhost:8800/${item.image}`} alt={item.prod_name} />
            <h2>{item.prod_name}</h2>
            <p>{item.prod_description}</p>
            <span>${item.price}</span>
            <div className="actions">
              <button className="delete" onClick={() => handleDelete(item.id)}>
                Delete
              </button>
              <button className="update"><Link to={`/update/${Gunpla.id}`}>Update</Link></button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-button">
        <Link to="/add" style={{ textDecoration: "none", color: "white" }}>
          Add New Gunpla
        </Link>
      </button>
    </div>
  );
};

export default Gunpla;
