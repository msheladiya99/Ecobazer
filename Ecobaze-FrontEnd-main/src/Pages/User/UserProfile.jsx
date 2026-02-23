import React, { useEffect, useState } from "react";
import { userlogo } from "./assests";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  updateBillingAddress,
  updatePassword,
  updateProfile,
} from "../../Redux/Slices/userAuthSlice";

const Contries = [
  {
    name: "Bangladesh",
    code: "BD",
  },
  {
    name: "India",
    code: "IN",
  },
  {
    name: "USA",
    code: "US",
  },
];

const UserProfile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const { user, isUpdated } = useSelector((state) => state.users);

  // console.log(user?.user);

  // User Profile Data
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    userimage: "",
  });
  const handleonchangeprofile = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  // User Address Data
  const [userAddress, setUserAddress] = useState({
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phone: "",
  });

  const handleonchangeaddress = (e) => {
    setUserAddress({
      ...userAddress,
      [e.target.name]: e.target.value,
    });
  };
  // Set User Data
  useEffect(() => {
    if (user) {
      setUserDetails({
        firstName: user?.user?.firstName,
        lastName: user?.user?.lastName,
        email: user?.user?.email,
        phone: user?.user?.phone ? user?.user?.phone : 11111111111,
        userimage: user?.user?.userimage,
      });
      setUserAddress({
        firstname: user?.user?.billingAddress?.firstname,
        lastname: user?.user?.billingAddress?.lastname,
        email: user?.user?.billingAddress?.email,
        address: user?.user?.billingAddress?.address,
        city: user?.user?.billingAddress?.city,
        state: user?.user?.billingAddress?.state,
        country: user?.user?.billingAddress?.country
          ? user?.user?.billingAddress?.country
          : "India",
        pincode: user?.user?.billingAddress?.pincode,
        phone: user?.user?.billingAddress?.phone
          ? user?.user?.billingAddress?.phone
          : 11111111111,
      });
    }
  }, [user]);

  // Update User Data
  useEffect(() => {
    if (isUpdated) {
      setUserDetails({
        firstName: user?.user?.firstName,
        lastName: user?.user?.lastName,
        email: user?.user?.email,
        phone: user?.user?.phone ? user?.user?.phone : 11111111111,
        userimage: user?.user?.userimage,
      });
      setUserAddress({
        firstname: user?.user?.billingAddress?.firstname,
        lastname: user?.user?.billingAddress?.lastname,
        email: user?.user?.billingAddress?.email,
        address: user?.user?.billingAddress?.address,
        city: user?.user?.billingAddress?.city,
        state: user?.user?.billingAddress?.state,
        country: user?.user?.billingAddress?.country,
        pincode: user?.user?.billingAddress?.pincode,
        phone: user?.user?.billingAddress?.phone
          ? user?.user?.billingAddress?.phone
          : 11111111111,
      });
    }
  }, [isUpdated]);

  // Change Address
  const handlesubmitaddressdata = () => {
    if (confirm("Are You Sure?")) {
      dispatch(updateBillingAddress(userAddress));
    }
  };

  // Change Password
  const [password, setPassword] = useState({
    currentpassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const handleonchangepassword = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  };

  const handlesubmitpassworddata = () => {
    if (password?.confirmPassword === password?.newPassword) {
      // console.log(password);
      dispatch(updatePassword(password));
      setPassword({
        currentpassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      alert("Password Not Match");
    }
  };

  //  Image Review
  const [isFile, setFile] = useState(false);
  const [poster, setPoster] = useState("");

  // Handle Image
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setPoster(URL.createObjectURL(file));
    setFile(true);
    setUserDetails({ ...userDetails, userimage: file });
  };

  const handleUpdateProfile = () => {
    if (confirm("Are You Sure?")) {
      setFile(false)
      dispatch(updateProfile(userDetails));
      setPoster("")
    }
  };

  return (
    <div className=" w-full flex flex-col justify-between items-start gap-3 font-Poppins">
      {/* Account Setting */}
      <div className="w-full flex flex-col items-start border py-4 rounded-lg">
        <div className="w-full flex items-center justify-center px-7  border-b-2">
          <h1 className="text-center text-xl font-semibold">
            Account Settings
          </h1>
        </div>
        <div className="px-7 w-full mt-4 grid grid-cols-2 place-content-center sm:grid-cols-1 md:grid-cols-1">
          <div className="w-full flex flex-col justify-between items-start gap-3">
            <div className="w-full flex flex-col gap-5 items-center justify-center lg:hidden  ">
              <img
                src={userDetails?.userimage ? userDetails?.userimage : userlogo}
                alt="user Profile"
                className={`${
                  isFile ? "hidden" : "block"
                } w-[300px] h-[300px] rounded-full`}
              />
              <img
                src={poster}
                alt="user Profile"
                className={`${
                  isFile ? "block" : "hidden"
                } w-[300px] h-[300px] rounded-full`}
              />
              <button className="border relative border-green-500 px-7 py-3 rounded-lg text-green-500 font-semibold">
                <input
                  type="file"
                  name="userimage"
                  onChange={handleChangeImage}
                  className=" absolute  opacity-0 w-full cursor-pointer"
                />
                Change Image
              </button>
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-1">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstname"
                onChange={handleonchangeprofile}
                value={userDetails?.firstName}
                className="w-full border rounded-lg px-3 py-2 focus:outline-green-500 text-sm"
                placeholder="Enter First Name"
              />
            </div>

            <div className="w-full flex flex-col items-start justify-center gap-1">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                onChange={handleonchangeprofile}
                value={userDetails?.lastName}
                className="w-full border rounded-lg px-3 py-2 focus:outline-green-500 text-sm"
                placeholder="Enter Last Name"
              />
            </div>

            <div className="w-full flex flex-col items-start justify-center gap-1">
              <label htmlFor="email">Eamil</label>
              <input
                type="email"
                name="email"
                onChange={handleonchangeprofile}
                value={userDetails?.email}
                className="w-full border rounded-lg px-3 py-2 focus:outline-green-500 text-sm"
                placeholder="Enter Email"
              />
            </div>

            <div className="w-full flex flex-col items-start justify-center gap-1">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="number"
                name="phone"
                onChange={handleonchangeprofile}
                value={userDetails?.phone}
                className="w-full border rounded-lg px-3 py-2 focus:outline-green-500 text-sm"
                placeholder="Phone Number"
              />
            </div>

            <div className="w-full flexitems-center justify-start">
              <button
                onClick={handleUpdateProfile}
                className="border border-white hover:border-green-500 text-white hover:text-green-500 bg-green-500 hover:bg-white px-5 py-3 rounded-lg "
              >
                Save Changes
              </button>
            </div>
          </div>
          <div className="w-full flex flex-col gap-5 items-center justify-center sm:hidden md:hidden">
            <img
              src={userDetails?.userimage ? userDetails?.userimage : userlogo}
              alt="user Profile"
              className={`${
                isFile ? "hidden" : "block"
              } w-[300px] h-[300px] rounded-full`}
            />
            <img
              src={poster}
              alt="user Profile"
              className={`${
                isFile ? "block" : "hidden"
              } w-[300px] h-[300px] rounded-full`}
            />
            <button className="border relative border-green-500 px-4 py-3 rounded-lg text-green-500 font-semibold cursor-pointer">
              <input
                type="file"
                name="userimage"
                onChange={handleChangeImage}
                className=" absolute  opacity-0 w-full cursor-pointer"
              />
              Change Image
            </button>
          </div>
        </div>
      </div>
      {/* Billing Address */}
      <div className="w-full flex flex-col items-start rounded-lg border py-4 ">
        <div className="w-full flex items-center justify-center px-7  border-b-2">
          <h1 className="text-center text-xl font-semibold">Billing Address</h1>
        </div>
        <div className="px-7 w-full mt-4 flex flex-col items-start justify-between gap-3 py-3">
          {/* Name And City */}
          <div className="w-full grid grid-cols-3 place-content-center place-items-center gap-7 sm:grid-cols-1 sm:gap-2 md:grid-cols-1 md:gap-2">
            <div className="w-full flex flex-col items-start justify-center gap-1">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                name="firstname"
                onChange={handleonchangeaddress}
                value={userAddress?.firstname}
                placeholder="Enter First name"
                className="w-full border rounded-lg px-3 py-2 focus:outline-green-500 text-sm"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-1">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                name="lastname"
                onChange={handleonchangeaddress}
                value={userAddress?.lastname}
                placeholder="Enter Last Name"
                className="w-full border rounded-lg px-3 py-2 focus:outline-green-500 text-sm"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-1">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                onChange={handleonchangeaddress}
                value={userAddress?.city}
                placeholder="Enter City"
                className="w-full border rounded-lg px-3 py-2 focus:outline-green-500 text-sm"
              />
            </div>
          </div>
          {/* Address */}
          <div className="w-full flex flex-col items-start justify-center gap-1 ">
            <label htmlFor="address">Street Address</label>
            <input
              type="text"
              name="address"
              onChange={handleonchangeaddress}
              value={userAddress?.address}
              placeholder="Enter Address"
              className="w-full border rounded-lg px-3 py-2 focus:outline-green-500 text-sm"
            />
          </div>
          {/* Country State And Zipcode */}
          <div className="w-full grid grid-cols-3 place-content-center place-items-start gap-7 sm:grid-cols-1 sm:gap-2">
            <div className="w-full flex flex-col items-start justify-between gap-1">
              <label htmlFor="country">Country / Region</label>
              <select
                name="country"
                value={userAddress?.country}
                onChange={handleonchangeaddress}
                className="w-full rounded-lg py-1 px-2 border outline-none"
              >
                <option> Select Country</option>
                {Contries.map((country) => {
                  return (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="w-full flex flex-col items-start justify-between gap-1">
              <label htmlFor="state">State</label>
              <input
                type="text"
                name="state"
                onChange={handleonchangeaddress}
                value={userAddress?.state}
                placeholder="Enter State"
                className="w-full border rounded-lg px-3 py-2 focus:outline-green-500 text-sm"
              />
            </div>
            <div className="w-full flex flex-col items-start justify-between gap-1">
              <label htmlFor="pincode">Zip Code</label>
              <input
                type="number"
                name="pincode"
                onChange={handleonchangeaddress}
                value={userAddress?.pincode}
                placeholder="Enter Zip Code"
                className="w-full border rounded-lg px-3 py-2 focus:outline-green-500 text-sm"
              />
            </div>
          </div>
          {/* Email and Phone no */}
          <div className="w-full flex items-center justify-between gap-9">
            <div className="w-full flex  flex-col items-start justify-between gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                onChange={handleonchangeaddress}
                value={userAddress?.email}
                placeholder="Enter Email"
                className="w-full border rounded-lg px-3 py-2 focus:outline-green-500 text-sm"
              />
            </div>
            <div className="w-full flex  flex-col items-start justify-between gap-1">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="number"
                name="phone"
                onChange={handleonchangeaddress}
                value={userAddress?.phone}
                placeholder="Phone Number"
                className="w-full border rounded-lg px-3 py-2 focus:outline-green-500 text-sm"
              />
            </div>
          </div>
          {/* Save Change */}
          <div className="w-full flex items-center justify-start">
            <button
              onClick={handlesubmitaddressdata}
              className="border border-white hover:border-green-500 text-white hover:text-green-500 bg-green-500 hover:bg-white px-5 py-3 rounded-lg "
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      {/* Change Password */}
      <div className="w-full flex flex-col items-start justify-between gap-3 rounded-lg border py-4 ">
        <div className="w-full flex items-center justify-center px-7  border-b-2">
          <h1 className="text-center text-xl font-semibold">Change Password</h1>
        </div>
        {/* Current Password */}
        <div className="w-full flex flex-col items-start justify-center gap-1 px-7 py-3 ">
          <label htmlFor="currentpassword">Current Password</label>
          <input
            type="text"
            name="currentpassword"
            value={password.currentpassword}
            onChange={handleonchangepassword}
            placeholder="Entrt Current Password"
            className="w-full border rounded-lg px-3 py-2 focus:outline-green-500 text-sm"
          />
        </div>
        {/* New Password */}
        <div className="w-full flex items-center justify-between gap-9 px-7 sm:flex-col sm:gap-3">
          <div className="w-full flex flex-col items-start justify-center gap-1">
            <label htmlFor="newpassword">New Password</label>
            <input
              type="text"
              name="newPassword"
              value={password.newPassword}
              placeholder="Enter New Password"
              onChange={handleonchangepassword}
              className="w-full border rounded-lg px-3 py-2 focus:outline-green-500 text-sm"
            />
          </div>
          <div className="w-full flex flex-col items-start justify-center gap-1">
            <label htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="text"
              name="confirmPassword"
              value={password.confirmPassword}
              onChange={handleonchangepassword}
              placeholder="Enter Confirm Password"
              className="w-full border rounded-lg px-3 py-2 focus:outline-green-500 text-sm"
            />
          </div>
        </div>
        {/* Save Change */}
        <div className="w-full flexitems-center justify-start px-7">
          <button
            onClick={handlesubmitpassworddata}
            className="border border-white hover:border-green-500 text-white hover:text-green-500 bg-green-500 hover:bg-white px-5 py-3 rounded-lg "
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
