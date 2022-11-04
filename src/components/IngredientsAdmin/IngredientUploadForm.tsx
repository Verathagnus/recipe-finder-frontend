import React, { useState, useEffect } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useField,
  useFormikContext,
} from "formik";
import FormData from "form-data";
import { useAppDispatch } from "../../store";
import { submitIngredientThunk } from "../../store/ingredient/ingredientSlice";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen/instance/Cloudinary";
import { getIngredientImageUploadSign } from "../../services/ingredientService";

const styles = {
  label: "block text-gray-700 text-sm font-bold pt-2 pb-1",
  field:
    "bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none",
  button:
    " bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600",
  errorMsg: "text-red-500 text-sm",
  checkboxLabel: "text-gray-700 text-sm font-bold pt-2 pb-1 pl-2",
};
const IngredientForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const onClickHandler = ()=>{
  //   alert('clicked');
  // }
  const [ingredientUploadedFilename, setIngredientUploadedFilename] =
    useState("");
  const [
    ingredientUploadedFilenamePublic,
    setIngredientUploadedFilenamePublic,
  ] = useState("");
  const cloudName = `${import.meta.env.VITE_CLOUD_NAME}`; // replace with your own cloud name
  const uploadPreset = "ingredient"; // replace with your own upload preset
  const api_key = import.meta.env.VITE_CLOUDINARY_API_KEY;
  // Remove the comments from the code below to add
  // additional functionality.
  // Note that these are only a few examples, to see
  // the full list of possible parameters that you
  // can add see:
  //   https://cloudinary.com/documentation/upload_widget_reference
  const IngredientUpload = async () => {
    const res = await getIngredientImageUploadSign();
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
        // folder: "ingredient_attachments", //upload files to the specified folder
        tags: ["ingredient"], //add the given tags to the uploaded files
        apiKey: api_key,

        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images"], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "office", //change to a purple theme
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
          setIngredientUploadedFilename(result.info.secure_url);
          setIngredientUploadedFilenamePublic(result.info.public_id);
        }
      }
    );
  };

  const submitIngredient = (resumeData: any) => {
    var newData = new FormData();
    newData.append("name", resumeData.name);
    newData.append("category", resumeData.category);
    newData.append("attachmentFlag", resumeData.attachmentFlag);
    newData.append("uploadedIngredientImage", resumeData.uploadedIngredient);
    newData.append(
      "uploadedIngredientImagePublic",
      resumeData.uploadedIngredientPublic
    );

    dispatch(submitIngredientThunk(newData))
    // .then(() =>
    //   setTimeout(() => {
    //     navigate("/admin/ingredientadmin");
    //   }, 1000)
    // );
  };
  const formInitialValues = {
    name: "",
    category: "",
    attachmentFlag: false,
    uploadedIngredient: File,
  };
  return (
    <>
      <div className="modal-body relative p-4 pt-0">
        <Formik
          initialValues={formInitialValues}
          validate={(values) => {
            const errors: any = {};
            if (!values.name) {
              errors.name = "Name is Required";
            }
            if (!values.category) {
              errors.category = "Category is Required";
            }
            if (
              values.attachmentFlag &&
              (!values.uploadedIngredient ||
                values.uploadedIngredient === null ||
                document.getElementById("uploadedIngredient") !== null)
            ) {
              {
                console.log(values.uploadedIngredient);
                errors.uploadedIngredient = "Email is Required";
              }
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            console.log(values);

            if (!values.attachmentFlag) {
              submitIngredient({
                ...values,
                attachmentFlag: false,
                uploadedIngredient: "",
                uploadedIngredientPublic: "",
              });
            } else if (ingredientUploadedFilename === "") {
              setSubmitting(true);
            } else {
              submitIngredient({
                ...values,
                attachmentFlag: true,
                uploadedIngredient: ingredientUploadedFilename,
                uploadedIngredientPublic: ingredientUploadedFilenamePublic,
              });
            }
            setSubmitting(false);
          }}
        >
          {({
            values,
            isSubmitting,
            isValid,
            errors,
            touched,
            setFieldValue,
          }) => (
            <Form className="form-training">
              <div className="form-group row py-sm-1 px-sm-3">
                <label className={styles.label} htmlFor="name">
                  Name<span className={styles.errorMsg}>*</span>
                </label>
                <Field
                  className={`${styles.field} ${
                    touched.name && errors.name ? "is-invalid" : ""
                  }`}
                  type="text"
                  name="name"
                  placeholder="Name"
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={styles.errorMsg}
                />
              </div>
              <div className="form-group row py-sm-2 px-sm-3">
                <label className={styles.label} htmlFor="category">
                  category
                </label>
                <Field
                  className={`${styles.field} ${
                    touched.category && errors.category ? "is-invalid" : ""
                  } form-select appearance-none
                  block
                  w-full
                  px-2
                  py-1
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding bg-no-repeat
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                  component="select"
                  name="category"
                >
                  <option value="">Select </option>
                  <option value="Non-Veg" className="rounded-full shadow-sm text-red-700 bg-red-100">Non-Veg</option>
                  <option value="Veg" className="rounded-full shadow-sm text-teal-700 bg-teal-100">Veg</option>
                </Field>

                <ErrorMessage
                  name="category"
                  component="div"
                  className={styles.errorMsg}
                />
              </div>
              <div className="form-group row py-sm-1 px-sm-3">
                <label className={styles.label}>
                  <Field
                    className={`${
                      touched.attachmentFlag && errors.attachmentFlag
                        ? "is-invalid"
                        : ""
                    }`}
                    type="checkbox"
                    name="attachmentFlag"
                  />
                  <span className={styles.checkboxLabel}>
                    Upload Ingredient
                  </span>
                </label>
                <ErrorMessage
                  name="attachmentFlag"
                  component="span"
                  className={styles.errorMsg}
                />
              </div>
              {values.attachmentFlag && (
                <div className="form-group row py-sm-2 px-sm-3">
                  <button
                    id="ingredient_upload_widget"
                    className={`${styles.field}`}
                    onClick={(e) => {
                      e.preventDefault();
                      IngredientUpload();
                    }}
                  >
                    Upload
                  </button>
                  <label className={`${styles.label} font-normal`}>
                    {ingredientUploadedFilename !== "" && (
                      <p>
                        File uploaded at{" "}
                        <a
                          className="font-bold text-blue-500"
                          href={ingredientUploadedFilename}
                        >
                          {ingredientUploadedFilename}
                        </a>
                      </p>
                    )}
                  </label>
                  <ErrorMessage
                    name="uploadedIngredient"
                    component="div"
                    className={styles.errorMsg}
                  />
                </div>
              )}

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
                >
                  Close
                </button>
                <button
                  type="submit"
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
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: "rgba(37, 117, 252, 1)",
                    color: "white",
                  }}
                  // data-bs-dismiss="modal"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default IngredientForm;
