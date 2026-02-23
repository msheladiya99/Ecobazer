import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  Cart,
  Home,
  Login,
  SignUp,
  AdminDashboard,
  Admin,
  Category,
  Products,
  Reviews,
  Shop,
  Contect,
  About,
  ShowProductDetail,
  NotFonundPage,
  Checkout,
  OrderDetail,
} from "./Pages";
import { UserDashboard, UserProfile, UserOrders } from "./Pages/User";
import { Navbar } from "./Components";
import AdminAuthRoute from "./Routes/AdminAuthRoute";
import UsrAuthRoute from "./Routes/UserAuthRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFonundPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/api/v1/user/signin" element={<Login />} />
        <Route path="/api/v1/user/signup" element={<SignUp />} />
        <Route element={<UsrAuthRoute />}>
          <Route path="/api/v1/user/" element={<UserDashboard />}>
            <Route path="profile" element={<UserProfile />} />
            <Route path="orders" element={<UserOrders />} />
          </Route>
          <Route path="/api/v1/user/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<OrderDetail />} />
        </Route>
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contect />} />
        <Route path="/showproductdetail/:id" element={<ShowProductDetail />} />

        <Route element={<AdminAuthRoute />}>
          <Route path="/api/v1/admin" element={<Admin />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="category" element={<Category />} />
            <Route path="product" element={<Products />} />
            <Route path="review" element={<Reviews />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
