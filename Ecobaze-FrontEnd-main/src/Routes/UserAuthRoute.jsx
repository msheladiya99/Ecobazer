import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const UsrAuthRoute = ({ ...next }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userInfo"));
  const isAuth = user?.token ? true : false;

  useEffect(() => {
    if (!isAuth) {
      return navigate("/api/v1/user/signin");
    }
  }, [isAuth]);

  return <>{isAuth && <Outlet {...next} />} </>;
};

export default UsrAuthRoute;
