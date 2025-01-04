import express from "express";
import mysql from "mysql";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // Required for ESM

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "gunpla_marketplace",
});

app.use(express.json());
app.use(cors());

// Correct ESM way to get __dirname
const __filename = fileURLToPath(import.meta.url); // Current file path
const __dirname = path.dirname(__filename); // Directory of the current file

// Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/", (req, res) => {
  res.json("hi, this is the backend");
});

app.get("/gunpla", (req, res) => {
  const q = "SELECT * FROM gunpla";
  db.query(q, (err, data) => {
    if (err) {
      console.error("Error fetching gunpla:", err);
      return res.status(500).json({ message: "Error fetching data" });
    }
    return res.json(data);
  });
});

app.post("/gunpla", (req, res) => {
  console.log("Request body:", req.body);
  const q =
    "INSERT INTO gunpla (`prod_name`, `prod_description`, `image`, `price`) VALUES(?)";
  const values = [
    req.body.prod_name,
    req.body.prod_description,
    req.body.image,
    req.body.price,
  ];

  db.query(q, [values], (err, data) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ message: "Error inserting data" });
    }
    return res.json("successfully executed");
  });
});

app.delete("/gunpla/:id", (req, res) => {
  const gunplaId = req.params.id;
  const q = "DELETE FROM gunpla WHERE id = ?";

  db.query(q, [gunplaId], (err, data) => {
    if (err) {
      console.error("Error deleting data:", err);
      return res.status(500).json({ message: "Error deleting item" });
    }
    return res.status(200).json("Successfully deleted");
  });
});

app.put('/gunpla/:id', (req, res) => {
    const { prod_name, prod_description, price, image } = req.body;
    const gunplaId = req.params.id;
    
    const query = 'UPDATE gunpla SET prod_name = ?, prod_description = ?, price = ?, image = ? WHERE id = ?';
    db.query(query, [prod_name, prod_description, price, image, gunplaId], (err, result) => {
      if (err) {
        console.error("Error updating gunpla:", err);
        return res.status(500).json({ message: "Error updating gunpla" });
      }
      res.status(200).json({ message: "Gunpla updated successfully" });
    });
  });
  


// Start server
app.listen(8800, () => {
  console.log("connected to backend");
});
