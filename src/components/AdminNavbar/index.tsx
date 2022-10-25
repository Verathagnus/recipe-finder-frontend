import React, { useState, useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useAppDispatch } from "../store";
import { signOut } from "../store/admin/adminSlice";
import { VerifyJWT } from "../../services/userService";

const AdminNavbar = () => {
  const returnInitialsName = () => {
    if (
      sessionStorage.getItem("user") ||
      sessionStorage.getItem("user") !== ""
    ) {
      const name = JSON.parse(
        sessionStorage.getItem("user") || JSON.stringify({"name": "404"})
      ).name.split(" ");
      return name.reduce((acc: string, current: string) => {
        return acc + current[0];
      }, "");
    }
    return "404";
  };
  const [hiddenValCN, setHiddenValCN] = useState("hidden");
  const [hiddenValCNUD, setHiddenValCNUD] = useState("hidden");
  const [navRdtLogin, setNavRdtLogin] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      sessionStorage.getItem("jwtToken") &&
      sessionStorage.getItem("jwtToken") !== ""
    ) {
      VerifyJWT(sessionStorage.getItem("jwtToken")).then((res) => {
        // console.log(res.data)
        if (!res.data.response) {
          setNavRdtLogin(true);
        }
      });
    }
    else{
      setNavRdtLogin(true);
    }
  }, []);
  return (
    <>
      {navRdtLogin && <Navigate to="/adminlogin" />}
      <nav className="px-2 sm:px-4 py-2.5 sticky w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 sm:max-h-[105px] md:max-h-[80px]">
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="/admin" className="flex justify-center items-center ">
            <img
              src="/recipe-finder-icon.png"
              className="mr-3 sm:h-9 w-full max-h-[60px]"
              alt="Recipe Finder Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Admin Panel
            </span>
          </Link>
          <div className="flex md:order-2 items-center justify-center w-full md:w-auto">
            <Link to="/">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Main Site
              </button>
            </Link>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
              onClick={() => {
                if (hiddenValCN === "md:pb-3 sm:pb-1") setHiddenValCN("hidden");
                else setHiddenValCN("md:pb-3 sm:pb-1");
              }}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                data-darkreader-inline-fill=""
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            {!navRdtLogin && (
              <div className="flex flex-row">
                <button
                  className="ml-3 font-bold text-gray-200 rounded-full bg-teal-600 flex items-center justify-center font-mono focus:ring-4 focus:ring-teal-200 dark:focus:ring-teal-300 w-10 h-10"
                  id="user-menu-button"
                  aria-expanded="false"
                  data-dropdown-toggle="user-dropdown"
                  data-dropdown-placement="bottom"
                  onClick={() => {
                    if (hiddenValCNUD === "") setHiddenValCNUD("hidden");
                    else setHiddenValCNUD("");
                  }}
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="font-bold text-gray-200 rounded-full bg-teal-600 flex items-center justify-center font-mono focus:ring-4 focus:ring-teal-200 dark:focus:ring-teal-300">
                    {returnInitialsName()}
                  </div>
                </button>
              </div>
            )}
          </div>

          <div
            className={`${hiddenValCN} justify-between items-center w-full md:flex md:w-auto md:order-1`}
            id="navbar-sticky"
          >
            <ul className="flex flex-col mt-4 md:p-4 md:mt-0 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8  md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/admin"
                  className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 hover:text-teal-600 md:p-0 dark:text-white"
                  aria-current="page"
                >
                  Admin Home
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/ingredientsadmin"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:text-teal-600 md:hover:bg-transparent md:hover:text-teal-600 md:p-0 md:dark:hover:text-teal-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 "
                >
                  Ingredients
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/recipesadmin"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-600 md:p-0 md:dark:hover:text-teal-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Recipes
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/galleryadmin"
                  className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-600 md:p-0 md:dark:hover:text-teal-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          className={`${hiddenValCNUD} justify-between items-center sm:max-w-[250px] md:w-auto z-50 my-4 text-base bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 md:order-1 right-2 left-auto sm:absolute`}
        >
          <div className="py-3 px-4">
            <Link to="/adminprofile">
            <span className="block text-sm text-gray-900 dark:text-white">
              {JSON.parse(sessionStorage.getItem("user") || "404").name}
            </span>
            <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">
              {JSON.parse(sessionStorage.getItem("user") || "404").email}
            </span>
            </Link>
          </div>
          <ul className="py-1" aria-labelledby="user-menu-button">
            <li>
              <Link
                to="/admin"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                onClick={() => {
                  if (hiddenValCNUD === "") setHiddenValCNUD("hidden");
                  else setHiddenValCNUD("");
                }}
              >
                Admin Home
              </Link>
            </li>

            <li>
              <a
                href="#"
                className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                onClick={() => {dispatch(signOut({}));setNavRdtLogin(true)}}
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />
    </>
  );
};
export default AdminNavbar;
