import React, { useState, useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAppDispatch } from "../../store";
import { signOut } from "../../store/admin/adminSlice";
import { VerifyJWT } from "../../services/userService";

const AdminProfile = () => {

  const [hiddenValCN, setHiddenValCN] = useState("hidden");
  const [hiddenValCNUD, setHiddenValCNUD] = useState("hidden");
  const [navRdtLogin, setNavRdtLogin] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <>
      <p>Admin Profile</p>
    </>
  );
};
export default AdminProfile;