import react, { useState, useEffect } from "react";
import { useAppDispatch } from "../store";
import FormData from "form-data";
import { loginAdminThunk } from "../store/admin/adminSlice";
import { VerifyJWT } from "../AdminNavbar/server";
import { Navigate } from "react-router-dom";

const AdminLoginForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useAppDispatch();

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
    dispatch(loginAdminThunk(formData)).then(() => {
      console.log(
        sessionStorage.getItem("jwtToken"),
        sessionStorage.getItem("user")
      );
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
                        <input
                          type="password"
                          name="password"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          id="exampleFormControlInput1"
                          placeholder="Password"
                          onChange={changeHandler}
                        />
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
                    <p className="text-sm">
                      Description of admin page
                    </p>
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
