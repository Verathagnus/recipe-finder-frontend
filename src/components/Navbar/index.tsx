import React, { Fragment, useState } from "react";
// import '../../styles/main.css'
import { Bars4Icon } from "@heroicons/react/24/solid";
import logo from "/recipe_finder_logo.png";
import { Link, Outlet } from "react-router-dom";
import x_mark from "/cross.svg";
const index = () => {
  return (
    <Fragment>
      
      <Outlet />
    </Fragment>
  );
};

export default index;
