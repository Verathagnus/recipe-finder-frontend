import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useField,
  useFormikContext,
} from "formik";
import axios from "axios";
import { getCareerUploadSign, uploadResume } from "./server";
import FormData from "form-data";
import { useAppDispatch } from "../../store";
// import { submitResumeThunk } from "../../store/career/careerSlice";
import { useNavigate } from "react-router-dom";

const styles = {
  label: "block text-gray-700 text-sm font-bold pt-2 pb-1",
  field:
    "bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none",
  button:
    " bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600",
  errorMsg: "text-red-500 text-sm",
};
const CareerRedirect = ({ setClassNameHidden }: any) => {
  const [careerUploadedFilename, setCareerUploadedFilename] = useState("");
  const [careerUploadedFilenamePublic, setCareerUploadedFilenamePublic] =
    useState("");
  const cloudName = `${import.meta.env.VITE_CLOUD_NAME}`; // replace with your own cloud name
  const uploadPreset = "career"; // replace with your own upload preset
  const api_key = import.meta.env.VITE_CLOUDINARY_API_KEY;
  // Remove the comments from the code below to add
  // additional functionality.
  // Note that these are only a few examples, to see
  // the full list of possible parameters that you
  // can add see:
  //   https://cloudinary.com/documentation/upload_widget_reference
  const CareerUpload = async () => {
    const res = await getCareerUploadSign();
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
        // folder: "career_attachments", //upload files to the specified folder
        tags: ["career"], //add the given tags to the uploaded files
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
          setCareerUploadedFilename(result.info.secure_url);
          setCareerUploadedFilenamePublic(result.info.public_id);
        }
      }
    );
    //myWidget.open();
  };
  const dispatch = useAppDispatch();
  let careersArr = [
    "Civil Engineer (Planning)",
    "Civil Engineer (Structural)",
    "Civil Engineer (Foundation)",
    "Civil Engineer (Building)",
    "Civil Engineer",
    "Architect",
    "Manager(Marketing)",
    "HR",
    "Manager (Administration)",
    "Contractor",
    "Driver",
    "Accountant",
    "Plumber",
    "Electrician",
    "Electrical Engineer(Wiring Communication)",
    "Computer Science Engineer (Software Developer)",
    "Manager (Banking & Accounts)",
    "Supervisor",
    "Typist",
    "Sales Pitch",
    "Graphic Designer",
    "Heavy Equip Operator",
    "Mason",
    "Labour",
    "Office Boy",
    "Security",
  ];
  // const onClickHandler = ()=>{
  //   alert('clicked');
  // }
  // function renameFile(originalFile: File | any, newName: string) {
  //   const file: File = new File([originalFile], newName, {
  //     type: originalFile.type,
  //     lastModified: originalFile.lastModified,
  //   });
  //   return file;
  // }
  const submitResume = async (resumeData: any) => {
    // console.log(resumeData.uploadedResume);
    // let data = resumeData;
    // const parts = data.uploadedResume.name.split(".");
    // const ext = data.uploadedResume.name.slice(
    //   data.uploadedResume.name.length - parts[parts.length - 1].length
    // );
    // const name = data.uploadedResume.name.slice(
    //   0,
    //   data.uploadedResume.name.length - ext.length - 1
    // );
    // const newName = name + "-" + Date.now() + "." + ext;
    // data.uploadedResume = renameFile(data.uploadedResume, newName);
    // // console.log(newName);
    var newData = new FormData();
    newData.append("fName", resumeData.fName);
    newData.append("lName", resumeData.lName);
    newData.append("email", resumeData.email);
    newData.append("mobile", resumeData.mobile);
    newData.append("position", resumeData.position);
    newData.append("city", resumeData.city);
    newData.append("resume", resumeData.resume);
    newData.append("uploadedResumefileName", resumeData.uploadedResumefileName);
    newData.append(
      "uploadedResumefileNamePublicId",
      resumeData.uploadedResumefileNamePublicId
    );
    console.log(resumeData);
    // dispatch(submitResumeThunk(newData));
    setClassNameHidden(true);
  };
  const formInitialValues = {
    fName: "",
    lName: "",
    email: "",
    mobile: "",
    position: "",
    city: "",
    resume: "",
    uploadedResume: File,
  };
  return (
    <>
      {/* //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 relative gap-x-8 gap-y-8 px-4 pt-5 sm:pt-5 text-black ">
  //   {careersArr.map((element) => (
  //     <div data-mdb-ripple="true" className="bg-white rounded-xl shadow-2xl hover:bg-gray-400 ease-out duration-200  hover:cursor-pointer">
  //       <div className="pl-4 pt-2 pr-4 pb-2" onClick ={onClickHandler}>
  //         <h3 className="font-bold text-xl mb-1">{element} </h3>
          
  //       </div>
  //     </div>
  //   ))}
  // </div> */}
      <div className="modal-body relative p-4 pt-0">
        <Formik
          initialValues={formInitialValues}
          validate={(values) => {
            const errors: any = {};
            if (!values.fName) {
              errors.fName = "First Name is Required";
            }
            if (!values.lName) {
              errors.lName = "Last Name is Required";
            }
            if (!values.email) {
              errors.email = "Email is Required";
            }
            if (!values.mobile) {
              errors.mobile = "Mobile is Required";
            }
            if (!values.position) {
              errors.position = "Position is Required";
            }
            if (!values.city) {
              errors.city = "City is Required";
            }
            if (!values.resume) {
              errors.resume = "Resume is Required";
            }
            if (careerUploadedFilename === "") {
              errors.uploadedResume = "Resume attachment is Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);

            // const parts = values.uploadedResume.name.split(".");
            // const ext = values.uploadedResume.name.slice(
            //   values.uploadedResume.name.length - parts[parts.length - 1].length
            // );
            // const name = values.uploadedResume.name.slice(
            //   0,
            //   values.uploadedResume.name.length - ext.length - 1
            // );
            // const newName = Date.now() + "-" + name + "." + ext;
            submitResume({
              ...values,
              uploadedResumefileName: careerUploadedFilename,
              uploadedResumefileNamePublicId: careerUploadedFilenamePublic,
            }).then(() => {
              console.log("done");
            });
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
                <label className={styles.label} htmlFor="fName">
                  First Name<span className={styles.errorMsg}>*</span>
                </label>
                <Field
                  className={`${styles.field} ${
                    touched.fName && errors.fName ? "is-invalid" : ""
                  }`}
                  type="text"
                  name="fName"
                  placeholder="First Name"
                />
                <ErrorMessage
                  name="fName"
                  component="span"
                  className={styles.errorMsg}
                />
              </div>
              <div className="form-group row py-sm-1 px-sm-3">
                <label className={styles.label} htmlFor="lName">
                  Last Name<span className={styles.errorMsg}>*</span>
                </label>
                <Field
                  className={`${styles.field} ${
                    touched.lName && errors.lName ? "is-invalid" : ""
                  }`}
                  type="text"
                  name="lName"
                  placeholder="Last Name"
                />
                <ErrorMessage
                  name="lName"
                  component="span"
                  className={styles.errorMsg}
                />
              </div>
              <div className="form-group row py-sm-2 px-sm-3">
                <label className={styles.label} htmlFor="email">
                  Email<span className={styles.errorMsg}>*</span>
                </label>
                <Field
                  className={`${styles.field} ${
                    touched.email && errors.email ? "is-invalid" : ""
                  }`}
                  type="text"
                  name="email"
                  placeholder="Email"
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.errorMsg}
                />
              </div>
              <div className="form-group row py-sm-2 px-sm-3">
                <label className={styles.label} htmlFor="mobile">
                  Mobile<span className={styles.errorMsg}>*</span>
                </label>
                <Field
                  className={`${styles.field} ${
                    touched.mobile && errors.mobile ? "is-invalid" : ""
                  } `}
                  type="text"
                  rows="4"
                  name="mobile"
                  placeholder="Mobile"
                />

                <ErrorMessage
                  name="mobile"
                  component="div"
                  className={styles.errorMsg}
                />
              </div>
              <div className="form-group row py-sm-2 px-sm-3">
                <label className={styles.label} htmlFor="position">
                  Position<span className={styles.errorMsg}>*</span>
                </label>
                <Field
                  className={`${styles.field} ${
                    touched.position && errors.position ? "is-invalid" : ""
                  } `}
                  component="select"
                  rows="4"
                  name="position"
                  placeholder="Position"
                >
                  <option value="">Select a position</option>
                  {careersArr.map((career) => {
                    return (
                      <option key={career} value={career}>
                        {career}
                      </option>
                    );
                  })}
                </Field>

                <ErrorMessage
                  name="position"
                  component="div"
                  className={styles.errorMsg}
                />
              </div>
              <div className="form-group row py-sm-2 px-sm-3">
                <label className={styles.label} htmlFor="city">
                  City<span className={styles.errorMsg}>*</span>
                </label>
                <Field
                  className={`${styles.field} ${
                    touched.city && errors.city ? "is-invalid" : ""
                  } `}
                  type="text"
                  rows="4"
                  name="city"
                  placeholder="City"
                />

                <ErrorMessage
                  name="city"
                  component="div"
                  className={styles.errorMsg}
                />
              </div>
              <div className="form-group row py-sm-2 px-sm-3">
                <label className={styles.label} htmlFor="resume">
                  Resume<span className={styles.errorMsg}>*</span>
                </label>
                <Field
                  className={`${styles.field} ${
                    touched.resume && errors.resume ? "is-invalid" : ""
                  } `}
                  component="textarea"
                  rows="4"
                  name="resume"
                  placeholder="Resume"
                />

                <ErrorMessage
                  name="resume"
                  component="div"
                  className={styles.errorMsg}
                />
              </div>
              <div className="form-group row py-sm-2 px-sm-3">
                <label className={styles.label} htmlFor="uploadedResume">
                  Upload Resume<span className={styles.errorMsg}>*</span>
                </label>
                <button
                  id="event_upload_widget"
                  className={`${styles.field}`}
                  onClick={(e) => {
                    e.preventDefault();
                    CareerUpload();
                  }}
                >
                  Upload
                </button>
                <label className={`${styles.label} font-normal`}>
                  {careerUploadedFilename !== "" && (
                    <p>
                      File uploaded at{" "}
                      <a
                        className="font-bold text-blue-500"
                        href={careerUploadedFilename}
                      >
                        {careerUploadedFilename}
                      </a>
                    </p>
                  )}
                </label>
                <ErrorMessage
                  name="uploadedResume"
                  component="div"
                  className={styles.errorMsg}
                />
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

export default CareerRedirect;
