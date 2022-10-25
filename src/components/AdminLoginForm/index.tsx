import react, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import FormData from "form-data";
import { loginAdminThunk, selectResponse } from "../store/admin/adminSlice";
import { VerifyJWT } from "../AdminNavbar/server";
import { Navigate } from "react-router-dom";

const AdminLoginForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordShown = () => {
    setPasswordShown(!passwordShown);
  };

  const dispatch = useAppDispatch();
  const responseFromLogin = useAppSelector(selectResponse);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const submitHandler = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formValues);
    let formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("email", formValues.email);
    formData.append("password", formValues.password);
    dispatch(loginAdminThunk(formData)).then((res) => {
      console.log(
        responseFromLogin,
        sessionStorage.getItem("jwtToken"),
        sessionStorage.getItem("user")
      );
      if(responseFromLogin)
      setNavRdt(true);
    });
  };

  const [navRdt, setNavRdt] = useState(false);
  useEffect(() => {
    if (
      sessionStorage.getItem("jwtToken") &&
      sessionStorage.getItem("jwtToken") !== ""
    ) {
      VerifyJWT(sessionStorage.getItem("jwtToken")).then((res) => {
        if (res.data.response) {
          setNavRdt(true);
        }
      });
    }
  }, []);

  return (
    <section className=" 2radient-form md:h-screen">
      {navRdt && <Navigate to="/admin" />}
      <div className="container py-2 px-6 ">
        <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-10/12">
            <div className="block bg-gray-300 shadow-lg rounded-lg">
              <div className="lg:flex lg:flex-wrap g-0">
                <div className="lg:w-6/12 px-4 md:px-0">
                  <div className="md:p-12 md:mx-6">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48 -mb-10"
                        src="recipe_finder_logo.png"
                        alt="logo"
                      />
                      <h4 className="text-xl font-semibold mt-1 mb-6 pb-1">
                        Recipe Finder Admin Login
                      </h4>
                    </div>
                    <form onSubmit={submitHandler}>
                      <p className="mb-4 ">Please enter admin details</p>
                      <div className="mb-4">
                        <input
                          type="text"
                          name="name"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput1"
                          placeholder="Name"
                          onChange={changeHandler}
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="email"
                          name="email"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput1"
                          placeholder="Email"
                          onChange={changeHandler}
                        />
                      </div>
                      <div className="mb-4">
                        <div className="relative">
                          <input
                            type={passwordShown ? "text" : "password"}
                            name="password"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="exampleFormControlInput1"
                            placeholder="Password"
                            onChange={changeHandler}
                          />
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer">
                            {!passwordShown && (
                              <a onClick={togglePasswordShown}>
                                <svg
                                  className="h-6 text-gray-700"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 576 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                                  ></path>
                                </svg>
                              </a>
                            )}

                            {passwordShown && (
                              <a onClick={togglePasswordShown}>
                                <svg
                                  className="h-6 text-gray-700"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 640 512"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"
                                  ></path>
                                </svg>
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-center pt-1 mb-12 pb-1">
                        <button
                          className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
                          type="submit"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          style={{
                            background:
                              "linear-gradient(to right, #006bce, #00716d, #007700)",
                          }}
                        >
                          Log in
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #006bce, #00716d, #007700)",
                  }}
                >
                  <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                    <h4 className="text-xl font-semibold mb-6">
                      Welcome to Recipe Finder Admin Page
                    </h4>
                    <p className="text-sm">Description of admin page</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLoginForm;
