import express from "express";
import mysql from "mysql";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // Required for ESM

const app = express();

// Database connection
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
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Test Route
app.get("/", (req, res) => {
  res.json("hi, this is the backend");
});

// Get all Gunpla
app.get("/gunpla", (req, res) => {
  const query = "SELECT * FROM gunpla";
  db.query(query, (err, data) => {
    if (err) {
      console.error("Error fetching gunpla:", err);
      return res.status(500).json({ message: "Error fetching data" });
    }
    res.json(data);
  });
});

// Add new Gunpla
app.post("/gunpla", (req, res) => {
  const { prod_name, prod_description, image, price } = req.body;
  const query =
    "INSERT INTO gunpla (`prod_name`, `prod_description`, `image`, `price`) VALUES (?)";
  const values = [prod_name, prod_description, image, price];

  db.query(query, [values], (err) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ message: "Error inserting data" });
    }
    res.json("Successfully executed");
  });
});

// Delete Gunpla
app.delete("/gunpla/:id", (req, res) => {
  const gunplaId = req.params.id;
  const query = "DELETE FROM gunpla WHERE id = ?";

  db.query(query, [gunplaId], (err) => {
    if (err) {
      console.error("Error deleting data:", err);
      return res.status(500).json({ message: "Error deleting item" });
    }
    res.status(200).json("Successfully deleted");
  });
});

// Update Gunpla
app.put("/gunpla/:id", (req, res) => {
  const { prod_name, prod_description, price, image } = req.body;
  const gunplaId = req.params.id;
  const query =
    "UPDATE gunpla SET prod_name = ?, prod_description = ?, price = ?, image = ? WHERE id = ?";

  db.query(query, [prod_name, prod_description, price, image, gunplaId], (err) => {
    if (err) {
      console.error("Error updating gunpla:", err);
      return res.status(500).json({ message: "Error updating gunpla" });
    }
    res.status(200).json("Gunpla updated successfully");
  });
});

// Start server
app.listen(8800, () => {
  console.log("Backend connected on port 8800");
});
