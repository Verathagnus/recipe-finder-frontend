import React, { useState } from "react";
import GalleryDeleteImages from "../../components/GalleryDeleteImages";
import GalleryViewImages from "../../components/GalleryViewImages";
import ImageUploadForm from "../../components/ImageUploadForm";

const Gallery = () => {
  return (
    <>
    <div className="flex flex-col items-center w-full justify-center">
        <GalleryViewImages />
      </div>
    </>
  );
};

export default Gallery;
