import React, { useState } from "react";
import { BsCartCheck, BsFillPersonFill, BsSearch } from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { logo } from "../assets";
import { Menu, Cross } from "../assets/index";

const navbarLinks = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/shop",
    name: "Shop",
  },
  {
    path: "/about",
    name: "About us",
  },
  {
    path: "/contact",
    name: "Contact us",
  },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isManuOpen, setIsManuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?name=${searchTerm}`);
    }
  };

  const Logoutbtn = () => {
    try {
      localStorage.removeItem("userInfo");
      navigate("/");
      window.location.reload(true);
    } catch (error) {
      throw new Error(error);
    }
  };

  const isLoggedIn = useSelector((state) => state.users.isLoggedIn);
  const location = useLocation();

  return (
    <>
      <nav className="w-full flex justify-between items-center rounded overflow-hidden shadow-md px-20 py-4 sm:px-2 sm:py-3 sticky top-0 bg-white z-[100]">
        <div className="flex flex-row justify-between items-center cursor-pointer select-none ">
          <Link to="/" className="flex flex-row justify-between items-center">
            <img src={logo} alt="LOGO" className="h-[40px] sm:h-[30px]" />
            <h1 className=" font-serif font-medium text-[28px] text-green-600 sm:text-lg ml-2">
              Ecobazar
            </h1>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-6 sm:hidden md:hidden lg:block">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-green-500 transition-colors"
            />
            <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </form>
        </div>

        <div
          className={`${
            location.pathname.includes("/api/v1/admin") ? "hidden" : "block"
          } flex items-center justify-between gap-4 sm:hidden md:hidden`}
        >
          {navbarLinks.map((item, id) => {
            return (
              <Link to={item.path} key={id}>
                <li className=" block text-black p-2 hover:text-green-600 transition-colors list-none font-medium">{item.name}</li>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center justify-end gap-4 sm:hidden md:hidden ">
          {!isLoggedIn && (
            <>
              <button
                type="button"
                className="rounded-md bg-green-600 px-4 py-2 text-sm hover:bg-green-700 font-semibold text-white shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                <Link to="/api/v1/user/signin">Login</Link>
              </button>
              <button
                type="button"
                className="rounded-md border border-green-600 px-4 py-2 text-sm text-green-600 hover:bg-green-600 hover:text-white font-semibold shadow-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                <Link to="/api/v1/user/signup">Signup</Link>
              </button>
            </>
          )}
          {isLoggedIn && (
            <>
              <button
                type="button"
                className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                title="Cart"
              >
                <Link to="/api/v1/user/cart">
                  <BsCartCheck className="text-2xl" />
                </Link>
              </button>
              <button
                type="button"
                className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                title="Profile"
              >
                <Link to="/api/v1/user/profile">
                  <BsFillPersonFill className="text-2xl" />
                </Link>
              </button>
              <button
                type="button"
                onClick={Logoutbtn}
                className="ml-2 rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 transition-all border-none cursor-pointer"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <div className="lg:hidden sm:block md:block z-0 ml-4">
          <img
            src={Menu}
            alt="Menu"
            className="w-8 cursor-pointer"
            onClick={() => setIsManuOpen(true)}
          />
        </div>

        {/* Sidebar */}
        <div
          className={`${
            isManuOpen
              ? " visible md:w-full md:fixed md:h-full md:top-0  md:backdrop-blur-sm  md:right-0 z-[900]"
              : "-right-full hidden"
          }`}
        >
          <nav className="w-[80%] sm:w-[80%] h-full absolute top-0 right-0 p-8 flex flex-col justify-between bg-white gap-6 lg:hidden shadow-2xl transition-all duration-300">
            <div className="self-end">
              <img
                src={Cross}
                alt="Close-menu"
                className="w-8 cursor-pointer"
                onClick={() => setIsManuOpen(false)}
              />
            </div>

            <div className="flex flex-col gap-8 md:gap-6 mt-10">
              {navbarLinks.map((item, id) => {
                return (
                  <Link
                    to={item.path}
                    key={id}
                    onClick={() => setIsManuOpen(false)}
                    className="text-xl text-gray-800 hover:text-green-600 transition-all cursor-pointer font-medium"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Search */}
            <div className="mt-4">
               <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
                />
                <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </form>
            </div>

            <div className="flex flex-col gap-4 mt-auto mb-10">
              {!isLoggedIn && (
                <>
                  <button
                    type="button"
                    className="w-full rounded-md bg-green-600 py-3 font-semibold text-white shadow-sm transition-all"
                  >
                    <Link
                      to="/api/v1/user/signin"
                      onClick={() => setIsManuOpen(false)}
                      className="block w-full"
                    >
                      Login
                    </Link>
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-md border border-green-600 py-3 text-green-600 font-semibold shadow-sm transition-all"
                  >
                    <Link
                      to="/api/v1/user/signup"
                      onClick={() => setIsManuOpen(false)}
                      className="block w-full"
                    >
                      Signup
                    </Link>
                  </button>
                </>
              )}
              {isLoggedIn && (
                <>
                  <Link to="/api/v1/user/cart" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg" onClick={() => setIsManuOpen(false)}>
                      <BsCartCheck className="text-2xl text-green-600" />
                      <span className="font-medium">My Cart</span>
                  </Link>
                  <Link to="/api/v1/user/profile" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg" onClick={() => setIsManuOpen(false)}>
                      <BsFillPersonFill className="text-2xl text-green-600" />
                      <span className="font-medium">My Profile</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      Logoutbtn();
                      setIsManuOpen(false);
                    }}
                    className="w-full rounded-md bg-red-500 py-3 font-semibold text-white shadow-sm mt-4 border-none cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
