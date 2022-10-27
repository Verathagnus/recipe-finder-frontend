import React, { useEffect, useState } from "react";
import { deleteImage, getImagesList } from "../../routes/Gallery/server";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  deleteImageThunk,
  fetchImagesList,
  selectImagesList,
} from "../../store/gallery/gallerySlice";

const GalleryDeleteImages = () => {
  const imagesList = useAppSelector(selectImagesList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchImagesList()).then(() => console.log(imagesList));
  }, []);

  const deleteHandler = (imagePublicId: string) => {
    dispatch(deleteImageThunk(imagePublicId));
  };
  const [currentImgAdmin, setImgAdmin] = useState({secure_url: "", public_id: ""});
  const onClickHandlerAdmin = (idx: number) => {
    setImgAdmin(imagesList[idx]);
    console.log(currentImgAdmin);
  };

  return (
    <>
      <div
        id="gallery"
        className="px-10  mx-auto drop-shadow-lg pb-20 flex flex-col  justify-center"
      >
        <h3 className="font-medium leading-tight text-3xl mt-0 mb-2 text-blue-600 pb-5">Gallery Delete</h3>
        
        <div className="flex">
          <button
            className="max-h-10 px-6
        py-2.5
        bg-teal-600
        text-white
        font-medium
        text-xs
        leading-tight
        uppercase
        rounded
        shadow-md
        hover:bg-teal-700 hover:shadow-lg
        focus:bg-teal-700 focus:shadow-lg focus:outline-none focus:ring-0
        active:bg-teal-800 active:shadow-lg
        transition
        duration-150
        ease-in-out
        ml-10 top-0"
            type="button"
            onClick={() => dispatch(fetchImagesList()).then(() => console.log(imagesList))}
          >
            Refresh
          </button>
        </div>

        <div className="flex flex-row justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 relative gap-x-4 gap-y-4 px-4 pt-5 sm:pt-5 text-black w-[400px] sm:w-[500px] md:w-[900px]">
            {imagesList.map((imageName, idx) => (
              <div key={imageName.secure_url}>
                <div className="ease-out duration-200  hover:cursor-pointer flex  justify-center items-center">
                  <div className="align-middle">
                    <img
                      onClick={() => onClickHandlerAdmin(idx)}
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModalCenter"
                      className="hover:opacity-80 block object-cover object-center w-full h-full rounded-lg shadow-2xl"
                      key={imageName.secure_url}
                      src={imageName.secure_url}
                      alt={imageName.secure_url}
                    />
                    <button
                      className="px-6
      py-2.5
      bg-purple-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      hover:bg-purple-700 hover:shadow-lg
      focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-purple-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      shadow-2xl mt-5"
                      data-bs-dismiss="modal"
                      type="button"
                      onClick={() => deleteHandler(imageName.public_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
            <div className="modal-body md:w-[600px] relative p-4">
              <img className="w-full h-full" src={currentImgAdmin.secure_url} />
            </div>

            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              <button
                type="button"
                className="px-6
          py-2.5
          bg-purple-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-purple-700 hover:shadow-lg
          focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-purple-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
                data-bs-dismiss="modal"
                onClick={() => deleteHandler(currentImgAdmin.public_id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryDeleteImages;
