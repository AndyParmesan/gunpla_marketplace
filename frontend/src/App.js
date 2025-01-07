import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Gunpla from "./pages/Gunpla";
import Update from "./pages/Update";
import Add from "./pages/Add";
import Orders from "./pages/Orders";
import Login from "./components/Login"; // Adjust the path if needed
import Signup from "./components/Signup"; // Import Signup
import "./styles.css";

function App() {
    const [orders, setOrders] = useState([]);

    return (
        <Router>
            <Routes>
                {/* Set Login as the landing page */}
                <Route path="/" element={<Login />} />
                {/* Add Signup Route */}
                <Route path="/signup" element={<Signup />} /> {/* Add this line */}
                {/* Other routes */}
                <Route path="/gunpla" element={<Gunpla setOrders={setOrders} />} />
                <Route path="/add" element={<Add />} />
                <Route path="/update/:id" element={<Update />} />
                <Route path="/orders" element={<Orders orders={orders} setOrders={setOrders} />} />
            </Routes>
        </Router>
    );
}

export default App;
