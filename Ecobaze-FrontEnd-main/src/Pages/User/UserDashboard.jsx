import React, { useEffect, useState } from "react";
import { Footer } from "../../Components";
import { dashboard, orders, activeOrder, activedashboard } from "./assests";
import { Outlet, Link, useLocation } from "react-router-dom";

const Navlinks = [
  {
    name: "DashBoard",
    path: "profile",
    icon: dashboard,
    activeIcon: activedashboard,
  }
];

const UserDashboard = () => {
  const [activeLink, setActiveLink] = useState(null);
  const location = useLocation();

  useEffect(() => {
    for (let index = 0; index < Navlinks.length; index++) {
      if (location.pathname.includes(Navlinks[index].path)) {
        setActiveLink(index);
      }
    }
  });
  return (
    <div className="w-full mt-7">
      <div className="grid grid-cols-userDashboard  place-content-center gap-3 px-20 mb-7 sm:px-3 sm:grid-cols-1 md:grid-cols-1">
        <div className="w-full h-[200px] flex flex-col items-start justify-around border rounded-lg">
          <h1 className="text-xl font-semibold text-center w-full">
            Navigation
          </h1>
          <div className="w-full flex flex-col items-start justify-between gap-3">
            {Navlinks.map((item, index) => {
              return (
                <Link
                  to={item.path}
                  key={index}
                  onClick={() => setActiveLink(index)}
                  className={`${
                    index == activeLink
                      ? "w-full flex items-center justify-start gap-2 px-4 py-2 text-lg font-bold  transition-all  bg-green-100 border-l-4 border-green-500"
                      : "flex items-center justify-center gap-2 px-4 py-2 text-lg hover:font-bold transition-all border-l-4 border-white"
                  }`}
                >
                  {activeLink === index ? (
                    <img src={item.activeIcon} alt="icon" className="w-6 " />
                  ) : (
                    <img src={item.icon} alt="icon" className="w-6 " />
                  )}
                  <h1>{item.name}</h1>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="w-full">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
