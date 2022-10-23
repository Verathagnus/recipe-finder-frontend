import React, { useState, useEffect } from "react";
import CareerImg from "/career.png";
import CareerAdmin from "../../components/CareerAdmin";
import CareerRedirect from "./careerRedirect";

const Career = () => {
  const [classNameHidden, setClassNameHidden] = useState(false);
  useEffect(() => {
    if(classNameHidden){
      document!.getElementById("careerModal")!.style.display="none";
      document.body.className="";
      document.body.style.overflow="";

      document.getElementsByClassName("modal-backdrop")[0].className="";
    }
  }, [classNameHidden])
  return (
    <>
      <div id="career" className="w-full ">
        <div className="w-full h-[600px] sm:h-[600px] bg-gray-900/90 absolute">
          <img
            src={CareerImg}
            alt="not found"
            className="w-full h-[600px] sm:object-none mix-blend-overlay"
          />
        </div>
        <div className="max-w-[1240px] mx-auto text-white relative">
          <div className="flex flex-col h-[600px] justify-center items-center px-4 py-5">
            <h2 className="text-white font-bold text-5xl pt-10 pb-4 text-center">
              Careers
            </h2>
            <h3 className="text-4xl py-2 text-center">
              Finding Your Right Path
            </h3>
            <button
              type="button"
              className="inline-block w-[100px] px-4 mt-10 py-1.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
              data-mdb-ripple="true"
              data-bs-toggle="modal"
              data-bs-target="#careerModal"
            >
              APPLY NOW
            </button>
          </div>
          <div
            className={`modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto`}
            id="careerModal"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog relative w-auto pointer-events-none">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md mb-0 pb-2">
                  <h5
                    className="text-xl font-medium leading-normal text-gray-800"
                    id="exampleModalLabel"
                  >
                    Submit Your Resume
                  </h5>
                  <button
                    type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <CareerRedirect setClassNameHidden={setClassNameHidden}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Career;
