import React, { useState, useEffect } from "react";
import { GoArrowRight } from "react-icons/go";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../Redux/Slices/userAuthSlice";
import { useNavigate } from "react-router-dom";
import { Footer } from "../Components";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, serUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const loginstate = useSelector((state) => state.users);

  const onchange = (e) => {
    serUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(userRegister(userData));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loginstate.isLoggedIn) {
      navigate("/");
    }
  }, [loginstate.isLoggedIn]);
  return (
    <div className="w-full font-Poppins">
      <div className="w-full grid place-items-center relative place-content-center h-screen bg-auto bg-no-repeat bg-center bg-[url('assets\signin.jpg')]">
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 opacity-45 "></div>
        <div className=" w-[500px] sm:w-full sm:py-5 md:w-[400px] md:px-11 md:py-4 flex items-center justify-center sm:px-6 rounded-lg lg:px-14 lg:py-5 text-white/75 backdrop-blur-sm z-30 border ">
          <div className="w-full">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">
              Sign Up
            </h2>
            <p className="mt-2 text-sm ">
              Already have an account?{" "}
              <Link
                to="/api/v1/user/signin"
                title=""
                className="font-semibold  transition-all duration-200 hover:underline"
              >
                Sign In
              </Link>
            </p>
            <form onSubmit={onSubmit} method="POST" className="mt-3">
              <div className="space-y-5">
                <div>
                  <label htmlFor="firstName" className="text-base font-medium ">
                    FirstName
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      name="firstName"
                      placeholder="Enter First name"
                      value={userData.firstName}
                      onChange={onchange}
                      required
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="lastName" className="text-base font-medium ">
                    lastName
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="text"
                      name="lastName"
                      placeholder="Email"
                      value={userData.lastName}
                      onChange={onchange}
                      required
                    ></input>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-base font-medium ">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={userData.email}
                      onChange={onchange}
                      required
                    ></input>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium "
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={userData.password}
                      onChange={onchange}
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={onSubmit}
                    className="inline-flex w-full items-center justify-center rounded-md bg-green-600/80 px-3.5 py-2.5 font-semibold leading-7 text-white "
                  >
                    Get started <GoArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default SignUp;
