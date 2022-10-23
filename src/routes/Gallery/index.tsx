import React, { useState } from "react";
import GalleryDeleteImages from "../../components/GalleryDeleteImages";
import GalleryViewImages from "../../components/GalleryViewImages";
import ImageUploadForm from "../../components/ImageUploadForm";

const Gallery = () => {
  const [modalstate, setmodal] = useState(false);
  const [currentImg, setImg] = useState("");
  let imgLinks = [
    "https://mdbcdn.b-cdn.net/img/new/slides/041.webp",
    "https://mdbcdn.b-cdn.net/img/new/slides/042.webp",
    "https://mdbcdn.b-cdn.net/img/new/slides/043.webp",
  ];
  const onClickHandler = (idx: number) => {
    setImg(imgLinks[idx]);
    console.log(currentImg);
  };
  return (
    <>
    <div className="flex flex-col items-center w-full justify-center">
        {/* <ImageUploadForm /> */}
        <GalleryViewImages />
        {/* <GalleryDeleteImages /> */}
      </div>
      {/* <div
        id="gallery"
        className=" px-10 w-[90%]  text-center mx-auto drop-shadow-lg pb-20 "
      >
        <h2 className="text-black font-bold text-6xl pt-10 pb-4 text-center">
          Gallery
        </h2>
        <div className="flex flex-row justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 relative gap-x-4 gap-y-4 px-4 pt-5 sm:pt-5 text-black ">
            {imgLinks.map((element, idx) => (
              <div
                data-mdb-ripple="true"
                className="bg-white rounded-xl shadow-2xl hover:bg-gray-400 ease-out duration-200  hover:cursor-pointer"
              >
                <div className="">
                  <img
                    onClick={() => onClickHandler(idx)}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalCenter"
                    alt="gallery"
                    className="block object-cover object-center w-full h-full rounded-lg"
                    src={element}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      
      <div className=""></div>

      <div
        className="modal fade fixed top-0 right-0 md:right-10  hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
        id="exampleModalCenter"
        aria-labelledby="exampleModalCenterTitle"
        aria-modal="true"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered relative pointer-events-none">
          <div className="modal-content border-none shadow-lg relative flex flex-col w-screen pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <button
                type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body md:h-[400px] md:w-[600px] relative p-4">
              <img className="w-full h-full" src={currentImg} />
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"></div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default Gallery;
