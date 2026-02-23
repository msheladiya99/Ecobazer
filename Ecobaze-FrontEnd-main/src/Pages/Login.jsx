import React, { useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../Redux/Slices/userAuthSlice";
import { Footer } from "../Components";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [authdata, setauthdata] = useState({ email: "", password: "" });
  const loginstate = useSelector((state) => state.users);

  const onchange = (e) => {
    setauthdata({ ...authdata, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(userLogin(authdata));
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
    <section className="font-Poppins">
      <div
        className="grid place-items-center relative place-content-center h-screen p-2 bg-auto bg-no-repeat bg-center bg-[url('assets/login.jpg')] "
        // style="background-image: url('../assets/login.jpg')"
        // style={{ backgroundImage: URL("../assets/login.jpg") }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 opacity-45 "></div>
        <div className="flex items-center justify-center px-4  sm:px-6 p-4 rounded-lg lg:px-8 text-white/75 backdrop-blur-sm z-30 border">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md ">
            <h2 className="text-3xl font-bold leading-tight t sm:text-4xl">
              Sign in
            </h2>
            <p className="mt-2 text-sm ">
              Don&apos;t have an account?
              <Link
                to="/api/v1/user/signup"
                title=""
                className="font-semibold transition-all duration-200 hover:underline"
              >
                Create a free account
              </Link>
            </p>
            <form onSubmit={onSubmit} method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="text-base font-medium ">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border outline-none bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={authdata.email}
                      onChange={onchange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium ">
                      Password
                    </label>
                    <a
                      href="#"
                      title=""
                      className="text-sm font-semibold  hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border  bg-transparent px-3 py-2 text-sm placeholder:text-white focus:outline-none focus:ring-1  focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={authdata.password}
                      onChange={onchange}
                      required
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    onClick={onSubmit}
                    className="inline-flex w-full items-center justify-center rounded-md bg-green-600/80 px-3.5 py-2.5 font-semibold leading-7 text-white "
                  >
                    Sign In
                    <GoArrowRight className="ml-2" size={16} />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Login;
