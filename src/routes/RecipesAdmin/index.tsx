import React, { useState } from "react";
import GalleryDeleteImages from "../../components/GalleryDeleteImages";
// import GalleryViewImages from "../../components/GalleryViewImages";
import ImageUploadForm from "../../components/ImageUploadForm";

const GalleryAdmin = () => {
  return (
    <>
    <div className="flex flex-col items-center w-screen justify-center">
        <ImageUploadForm />
        {/* <GalleryViewImages /> */}
        <GalleryDeleteImages />
      </div>
    </>
  );
};

export default GalleryAdmin;
