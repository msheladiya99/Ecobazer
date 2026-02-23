import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AdminAuthRoute = ({ ...next }) => {
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem("userInfo"));
  const isAdmin = admin?.userFound?.isAdmin ? true : false;

  console.log(isAdmin)
  useEffect(() => {
    if (!isAdmin) {
      navigate("/api/v1/user/signin");
    }
  }, [isAdmin]);

  return <>{isAdmin && <Outlet {...next} />}</>;
};

export default AdminAuthRoute;
