import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // Ensure your CSS is linked

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            // Call your backend register API here
            const response = await fetch("http://localhost:8800/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });

            const data = await response.json();
            if (data.message === "User registered successfully") {
                navigate("/");  // Redirect to Login page after successful signup
            } else {
                setError(data.message);
            }
        } catch (err) {
            console.error("Error:", err);
            setError("Something went wrong!");
        }
    };

    return (
<div className="signup-container">
  <div className="login-box">
    <h2>Sign Up</h2>
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" className="submit-button">Sign Up</button>
      </form>
        <p>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}  // This will redirect to the Login page
            className="link-text"
            style={{ cursor: 'pointer', color: 'blue' }}  // Style to indicate it's clickable
          >
            Log In
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
