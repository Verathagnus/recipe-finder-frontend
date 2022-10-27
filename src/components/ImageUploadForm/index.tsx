import React, { useState } from "react";
import { getImageUploadSign } from "../../routes/Gallery/server";
import { useAppDispatch } from "../../store";

const ImageUploadForm = () => {
  const [imageUpload, setImageUpload] = useState("");
  const styles = {
    label: "block text-gray-700 text-sm font-bold pt-2 pb-1",
    field:
      "bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none",
    button:
      " bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600",
    errorMsg: "text-red-500 text-sm",
  };
  const onFileChange = (e: any) => {
    setImageUpload(e.target.files![0]);
  };
  const dispatch = useAppDispatch();
  const cloudName = `${import.meta.env.VITE_CLOUD_NAME}`; // replace with your own cloud name
  const uploadPreset = "gallery"; // replace with your own upload preset
  const api_key = import.meta.env.VITE_CLOUDINARY_API_KEY;
  // Remove the comments from the code below to add
  // additional functionality.
  // Note that these are only a few examples, to see
  // the full list of possible parameters that you
  // can add see:
  //   https://cloudinary.com/documentation/upload_widget_reference
  const GalleryUpload = async (e: any) => {
    e.preventDefault();
    const res = await getImageUploadSign();
    console.log(res);
    var myWidget = window.cloudinary.openUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        uploadSignatureTimestamp: res.data.timestamp,
        uploadSignature: res.data.signature,
        cropping: false,
        // cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        multiple: false, //restrict upload to a single file
        // folder: "event_attachments", //upload files to the specified folder
        tags: ["galleryUpload"], //add the given tags to the uploaded files
        apiKey: api_key,

        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images"], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
        styles: {
          palette: {
            window: "#F5F5F5",
            sourceBg: "#FFFFFF",
            windowBorder: "#90a0b3",
            tabIcon: "#0094c7",
            inactiveTabIcon: "#69778A",
            menuIcons: "#0094C7",
            link: "#53ad9d",
            action: "#8F5DA5",
            inProgress: "#0194c7",
            complete: "#53ad9d",
            error: "#c43737",
            textDark: "#000000",
            textLight: "#FFFFFF",
          },
          fonts: {
            default: null,
            "'Poppins', sans-serif": {
              url: "https://fonts.googleapis.com/css?family=Poppins",
              active: true,
            },
          },
        },
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the file info: ", result.info);
        }
      }
    );
    //myWidget.open();
  };
  return (
    <div className="px-10  mx-auto drop-shadow-lg pb-20 flex flex-col justify-center">
     
      <h3 className="font-medium leading-tight text-3xl mt-0 mb-2 text-blue-600 py-10">Gallery Upload</h3>
      <div className="row border">
        <form
          onSubmit={GalleryUpload}
          className="shadow-md p-2 flex flex-col w-[400px] sm:w-[500px] md:w-[900px] border"
        >
          {/* <div className="form-group row py-sm-2 px-sm-3 mb-2">
            <label className={styles.label} htmlFor="uploadedResume">
              Upload Image<span className={styles.errorMsg}>*</span>
            </label>
            <input
              className={styles.field}
              type="file"
              onChange={onFileChange}
            />
          </div> */}
          <div className="form-group">
            <button
              className="px-6
                        py-2.5
                        bg-blue-600
                        text-white
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-blue-700 hover:shadow-lg
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-blue-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out
                        ml-1"
              type="submit"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageUploadForm;
