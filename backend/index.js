import express from "express";
import mysql from "mysql";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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

// User Registration (for creating new users)
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  // Hash the password before saving
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    const query = "INSERT INTO users (username, password) VALUES (?, ?)";
    db.query(query, [username, hashedPassword], (err) => {
      if (err) {
        console.error("Error registering user:", err);
        return res.status(500).json({ message: "Error registering user" });
      }
      res.json({ message: "User registered successfully" });
    });
  });
});

// User Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], (err, result) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ message: "Error fetching user" });
    }

    if (result.length === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the password with the stored hash
    bcrypt.compare(password, result[0].password, (err, isMatch) => {
      if (err) {
        console.error("Error comparing passwords:", err);
        return res.status(500).json({ message: "Error comparing passwords" });
      }

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ id: result[0].id, username: result[0].username }, "your_jwt_secret_key", {
        expiresIn: "1h",
      });

      res.json({ message: "Login successful", token });
    });
  });
});

// Start server
app.listen(8800, () => {
  console.log("Backend connected on port 8800");
});
