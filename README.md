
# AdaptNXT E-commerce Frontend Assignment

This repository contains the frontend solution for the "Simple E-commerce API" assignment from AdaptNXT. It's a modern, responsive, and feature-complete single-page application built with React and TypeScript, showcasing a professional and clean user interface.

## Project Overview

This application provides a user-friendly e-commerce experience, complete with product browsing, a fully functional shopping cart, and a role-based authentication system distinguishing between regular customers and administrators. The UI is designed with a professional dark theme, is fully responsive, and includes modern features like toast notifications and modals for a seamless user experience.

The entire backend is simulated via a mock API service, allowing the frontend to be demonstrated as a standalone project without requiring a live server.

---

## Author

- **LAKSHMI NARASIMHA REDDY RAMIREDDY**

---

## Features

This project successfully implements all core, recommended, and optional requirements from the assignment.

### Core & Recommended Features:
-   **Product Listings:** Users can view a paginated list of all available products.
-   **Cart Management:**
    -   Add products to the shopping cart.
    -   Update item quantities directly in the cart.
    -   Remove items from the cart.
-   **Order Creation:** Users can "place an order," which simulates the checkout process, shows a success notification, and clears the cart.
-   **User Roles & Authentication:**
    -   A simulated login system allows users to sign in as either a **Customer** or an **Admin**.
    -   **Customer Role:** Can view products, add items to the cart, and place orders.
    -   **Admin Role:** Has all customer privileges plus the ability to manage the product catalog.
-   **Basic Frontend:** A complete and interactive HTML/React-based interface to interact with all API features.

### Admin-Specific Features:
-   **Product CRUD Operations:**
    -   **Create:** Admins can add new products through a dedicated form modal.
    -   **Update:** Admins can edit the details of any existing product.
    -   **Delete:** Admins can remove products from the store.
-   **Protected Routes:** The `/admin` dashboard and product management controls are only accessible to authenticated administrators.

### Extra Credit & UI/UX Enhancements:
-   **Product Pagination:** The main products page is paginated to efficiently handle a large number of items.
-   **Product Search:** Users can search for products by name.
-   **Category Filtering:** Products can be filtered by their category.
-   **Professional Dark Theme:** A sleek, modern dark theme is applied across the entire application for a premium look and feel.
-   **Fully Responsive Design:** The layout adapts seamlessly to all screen sizes, from mobile phones to desktops.
-   **Toast Notifications:** Non-intrusive feedback for actions like adding items to the cart or placing an order.
-   **Image Zoom:** Users can click on any product image (on the product page or in the cart) to see a larger view in a modal.

---

## Tech Stack

-   **Framework/Library:** React 18
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS (via CDN)
-   **Routing:** React Router
-   **State Management:** React Context API (for Auth and Cart state)
-   **Module Loading:** ES Modules via `esm.sh` (no build step required)

---

## Project Structure

The codebase is organized into logical directories for maintainability and scalability.

```
/
├── components/       # Reusable React components (Header, ProductCard, Modal, etc.)
├── context/          # Global state management (AuthContext, CartContext)
├── pages/            # Top-level page components (HomePage, ProductsPage, etc.)
├── services/         # Mock API simulation (api.ts)
├── App.tsx           # Main application component with routing setup
├── constants.ts      # Application-wide constants (e.g., user roles)
├── index.html        # The main HTML entry point
├── index.tsx         # The React application root
├── types.ts          # TypeScript type definitions
└── README.md         # You are here!
```

---

## Getting Started

This project is set up to run without a complex build process.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd <project-directory>
    ```

3.  **Serve the files:**
    You can use any simple static file server. A common choice is `serve`, which can be run with `npx`.

    ```bash
    npx serve
    ```
    
    Alternatively, if you have Python 3 installed:
    ```bash
    python -m http.server
    ```

4.  **Open in your browser:**
    The server will provide a local URL (e.g., `http://localhost:3000` or `http://localhost:8000`). Open it in your web browser to view the application.
