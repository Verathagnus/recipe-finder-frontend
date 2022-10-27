import React, { useEffect, useState } from "react";
import { getImagesList } from "../../routes/Gallery/server";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchImagesList,
  selectImagesList,
  selectLoading
} from "../../store/gallery/gallerySlice";

const GalleryViewImages = () => {
  const imagesList = useAppSelector(selectImagesList);
  const loading = useAppSelector(selectLoading)
  const dispatch = useAppDispatch();
  const [currentImg, setImg] = useState({secure_url: "", public_id: ""});
  const onClickHandler = (idx: number) => {
    setImg(imagesList[idx]);
    console.log(currentImg);
  };
  useEffect(() => {
    dispatch(fetchImagesList());
  }, []);
  return (
    <>
      <div
        id="gallery"
        className=" px-10 w-[90%]  text-center mx-auto drop-shadow-lg pb-20 "
      >
        <h3 className="font-medium text-left leading-tight text-3xl mt-0 mb-2 text-red-600 pb-5 pt-10">
        Gallery
        </h3>
        <div className="flex flex-row justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 relative gap-x-4 gap-y-4 px-4 pt-5 sm:pt-5 text-black ">
          
            {/* {
            
            (loading =='idle' || loading =='pending')? "" : imagesList && imagesList.map((imageName, idx) => (
              <div
                key={imageName.secure_url}
                className="ease-out duration-200  hover:cursor-pointer flex  justify-center items-center"
              >
                <div className="align-middle">
                  <img
                    onClick={() => onClickHandler(idx)}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModalCenter"
                    className="hover:opacity-80 block object-cover  w-[340px] h-[340px]  md:h-[500px] md:w-[500px] rounded-lg shadow-2xl"
                    key={imageName.secure_url}
                    src={imageName.secure_url}
                    alt={imageName.secure_url}
                  />
                </div>
              </div>
            ))} */}
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
              <img
                className="w-full h-full"
                src={currentImg.secure_url}
              />
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryViewImages;
