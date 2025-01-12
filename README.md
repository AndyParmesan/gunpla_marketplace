Overview

The Gunpla Marketplace is a full-stack e-commerce application for buying and managing Gunpla models. The platform allows users to view, add, update, and delete products while managing a shopping cart and processing orders.
Key Features

    Frontend:
        Built with React, displaying Gunpla models (Gunpla.jsx) and a cart/checkout page (Orders.jsx).
        Interactive user experience for managing products and orders.

    Backend:
        Powered by Node.js, Express, and MySQL.
        Handles CRUD operations for Gunpla, orders, and user authentication (registration/login with JWT).
        API Endpoints:
            /gunpla: Manage Gunpla models.
            /orders: Create, fetch, update, or delete user orders.
            /register & /login: User authentication.

    Database:
        MySQL database with tables for Gunpla, orders, and users.

How It Works

    Users can browse Gunpla, add items to their cart, and proceed to checkout.
    Orders are saved in the backend via the /orders API, enabling future order management.
    The platform supports both admin (product management) and user workflows.
