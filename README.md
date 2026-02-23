# Ecobazar - E-Commerce Platform

A professional, full-stack e-commerce application built with React, Node.js, and MongoDB. This project features a modern UI, product filtering, user authentication, and a robust cart system.

## 🚀 Features

- **Storefront**: Browse products by categories and price ranges.
- **Advanced Filtering**: Search by name, category, and sort by price or date.
- **Shopping Cart**: Add products to cart, update quantities, and persistent storage.
- **Authentication**: JWT-based user registration and login.
- **Admin Panel**: Manage products, categories, and view analytics (reviews/orders).
- **Responsive Design**: Premium UI optimized for all devices using Tailwind CSS.
- **Image Handling**: Integrated with Cloudinary for product image storage.

## 🛠️ Tech Stack

- **Frontend**: React.js, Redux Toolkit, Tailwind CSS, Axios, Vite.
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Cloudinary API.
- **State Management**: Redux Toolkit for centralized state.

---

## 💻 Installation & Setup

Follow these steps to get the project running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/msheladiya99/Ecobazer.git
cd Ecobazer
```

### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd Ecobazer-BackEnd-main
npm install
```

Create a `.env` file in the `Ecobazer-BackEnd-main` folder and add your credentials:

```env
MONDODB_URL=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
JWT_TOKEN=your_random_secret_string
```

Start the backend server:

```bash
npm run dev
```

The server will start on `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal, navigate to the frontend directory, and install dependencies:

```bash
cd Ecobaze-FrontEnd-main
npm install
```

Start the frontend application:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 🏗️ Project Structure

```text
├── Ecobazer-BackEnd-main/    # Node.js & Express API
│   ├── Controllers/          # Business logic for routes
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API endpoints
│   ├── middlewares/          # Auth & Error handling
│   └── utils/                # Helper functions
│
└── Ecobaze-FrontEnd-main/    # React Frontend
    ├── src/
    │   ├── Components/       # Reusable UI components
    │   ├── Pages/            # View components (Shop, Home, etc.)
    │   ├── Redux/            # Slices and Store configuration
    │   └── assets/           # Images and static files
```

---

## 🔧 Troubleshooting

- **Port Conflict**: If port 5000 is occupied, kill the process using `taskkill /F /PID <pid>` (Windows) or `lsof -ti:5000 | xargs kill -9` (Mac/Linux).
- **CORS Issues**: Ensure the backend `cors()` middleware is configured to allow requests from `http://localhost:5173`.
- **Database Connection**: Verify that your MongoDB IP whitelist includes your current IP address.

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any features or bug fixes.

## 📄 License

This project is licensed under the ISC License.
 