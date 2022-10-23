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
import { useAppDispatch } from "../store";
import { submitEventThunk } from "../store/event/eventSlice";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen/instance/Cloudinary";
import { getEventUploadSign } from "../../routes/Events/server";
function DatePicker(props: any) {
  const { label, name, ...rest } = props;
  return (
    <div className="form-group row py-sm-2 px-sm-3">
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <Field className={`${styles.field}`} name={name}>
        {({ form, field }: any) => {
          const { setFieldValue } = form;
          const { value } = field;
          return (
            <DateView
              className={`${styles.field}`}
              id={name}
              {...field}
              {...rest}
              selected={value}
              onChange={(val) => setFieldValue(name, val)}
            />
          );
        }}
      </Field>
      <ErrorMessage component="div" name={name} className={styles.errorMsg} />
    </div>
  );
}
const styles = {
  label: "block text-gray-700 text-sm font-bold pt-2 pb-1",
  field:
    "bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none",
  button:
    " bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600",
  errorMsg: "text-red-500 text-sm",
  checkboxLabel: "text-gray-700 text-sm font-bold pt-2 pb-1 pl-2",
};
const EventForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const onClickHandler = ()=>{
  //   alert('clicked');
  // }
  const [eventUploadedFilename, setEventUploadedFilename] = useState("");
  const [eventUploadedFilenamePublic, setEventUploadedFilenamePublic] = useState("");
  const cloudName = `${import.meta.env.VITE_CLOUD_NAME}`; // replace with your own cloud name
  const uploadPreset = "event_attachments"; // replace with your own upload preset
  const api_key = import.meta.env.VITE_CLOUDINARY_API_KEY;
  // Remove the comments from the code below to add
  // additional functionality.
  // Note that these are only a few examples, to see
  // the full list of possible parameters that you
  // can add see:
  //   https://cloudinary.com/documentation/upload_widget_reference
  const EventUpload = async () => {
    const res = await getEventUploadSign();
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
        tags: ["events"], //add the given tags to the uploaded files
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
              textLight: "#FFFFFF"
          },
          fonts: {
              default: null,
              "'Poppins', sans-serif": {
                  url: "https://fonts.googleapis.com/css?family=Poppins",
                  active: true
              }
          }
      }
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the file info: ", result.info);
          setEventUploadedFilename(result.info.secure_url);
          setEventUploadedFilenamePublic(result.info.public_id);
        }
      }
    );
    // //myWidget.open();
  };

  // useEffect(() => {
  //   document.getElementById("event_upload_widget").addEventListener(
  //     "click",
  //     function () {
  //       //myWidget.open();
  //     },
  //     false
  //   );
  // }, []);
  function renameFile(originalFile: File | any, newName: string) {
    const file: File = new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
    return file;
  }
  const submitEvent = (resumeData: any) => {
    var newData = new FormData();
    newData.append("title", resumeData.title);
    newData.append("date", resumeData.date);
    newData.append("summary", resumeData.summary);
    newData.append("description", resumeData.description);
    newData.append("attachmentFlag", resumeData.attachmentFlag);
    newData.append("uploadedEvent", resumeData.uploadedEvent);
    newData.append("uploadedEventPublic", resumeData.uploadedEventPublic);
    
    dispatch(
      submitEventThunk({ newData, attachmentFlag: resumeData.attachmentFlag })
    ).then(() =>
      setTimeout(() => {
        navigate("/admin/eventadmin");
      }, 1000)
    );
  };
  const formInitialValues = {
    title: "",
    date: "",
    summary: "",
    description: "",
    attachmentFlag: false,
    uploadedEvent: File,
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
            if (!values.title) {
              errors.title = "First Name is Required";
            }
            if (!values.date) {
              errors.date = "Last Name is Required";
            }
            if (!values.summary) {
              errors.summary = "Email is Required";
            }
            // if (!values.description) {
            //   errors.description = "Mobile is Required";
            // }
            if (
              values.attachmentFlag &&
              (!values.uploadedEvent ||
                values.uploadedEvent === null ||
                document.getElementById("uploadedEvent") !== null)
            ) {
              {
                console.log(values.uploadedEvent);
                errors.uploadedEvent = "Email is Required";
              }
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            console.log(values);

            if (!values.attachmentFlag) {
              submitEvent({
                ...values,
                attachmentFlag: false,
                uploadedEvent: "",
                uploadedEventPublic: "",
              });
            } 
            else if(eventUploadedFilename === ""){
              setSubmitting(true);
            }
            else {
              
              // const parts = values.uploadedEvent.name.split(".");
              // const ext = values.uploadedEvent.name.slice(
              //   values.uploadedEvent.name.length -
              //     parts[parts.length - 1].length
              // );
              // const name = values.uploadedEvent.name.slice(
              //   0,
              //   values.uploadedEvent.name.length - ext.length - 1
              // );
              // const newName = Date.now() + "-" + name + "." + ext;
              submitEvent({
                ...values,
                attachmentFlag: true,
                uploadedEvent: eventUploadedFilename,
                uploadedEventPublic: eventUploadedFilenamePublic,
              });
            }
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
                <label className={styles.label} htmlFor="title">
                  Title<span className={styles.errorMsg}>*</span>
                </label>
                <Field
                  className={`${styles.field} ${
                    touched.title && errors.title ? "is-invalid" : ""
                  }`}
                  type="text"
                  name="title"
                  placeholder="Title"
                />
                <ErrorMessage
                  name="title"
                  component="span"
                  className={styles.errorMsg}
                />
              </div>
              <div className="form-group row py-sm-1 px-sm-3">
                <label className={styles.label} htmlFor="summary">
                  Summary<span className={styles.errorMsg}>*</span>
                </label>
                <Field
                  className={`${styles.field} ${
                    touched.summary && errors.summary ? "is-invalid" : ""
                  }`}
                  type="text"
                  name="summary"
                  placeholder="Summary"
                />
                <ErrorMessage
                  name="summary"
                  component="span"
                  className={styles.errorMsg}
                />
              </div>
              <div className="form-group row py-sm-2 px-sm-3">
                <label className={styles.label} htmlFor="description">
                  Description
                  {/* <span className={styles.errorMsg}>*</span> */}
                </label>
                <Field
                  className={`${styles.field} ${
                    touched.description && errors.description
                      ? "is-invalid"
                      : ""
                  }`}
                  component="textarea"
                  rows="4"
                  name="description"
                  placeholder="Description"
                />

                <ErrorMessage
                  name="description"
                  component="div"
                  className={styles.errorMsg}
                />
              </div>
              <DatePicker
                name="date"
                label={
                  <>
                    Date<span className={styles.errorMsg}>*</span>
                  </>
                }
              />
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
                  <span className={styles.checkboxLabel}>Upload Event</span>
                </label>
                <ErrorMessage
                  name="summary"
                  component="span"
                  className={styles.errorMsg}
                />
              </div>
              {values.attachmentFlag && (
                <div className="form-group row py-sm-2 px-sm-3">
                  <button
                    id="event_upload_widget"
                    className={`${styles.field}`}
                    onClick={(e) => {e.preventDefault();EventUpload();}}
                  >
                    Upload
                  </button>
                  <label className={`${styles.label} font-normal`}>
                    
                    {eventUploadedFilename !== "" && <p>File uploaded at <a className="font-bold text-blue-500" href={eventUploadedFilename}>{eventUploadedFilename}</a></p>}
                  </label>
                  {/* <EventUploadWidget
                    classNameProp={`${styles.field} ${
                      touched.uploadedEvent && errors.uploadedEvent
                        ? "is-invalid"
                        : ""
                    } `}
                    setEventUploadedFilename={setEventUploadedFilename}
                  /> */}

                  {/* <input
                    id="uploadedEvent"
                    name="uploadedEvent"
                    type="file"
                    onChange={(event) => {
                      setFieldValue(
                        "uploadedEvent",
                        event.currentTarget.files![0]
                      );
                    }}
                    className={`${styles.field} ${
                      touched.uploadedEvent && errors.uploadedEvent
                        ? "is-invalid"
                        : ""
                    } `}
                  /> */}
                  <ErrorMessage
                    name="uploadedEvent"
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

export default EventForm;
