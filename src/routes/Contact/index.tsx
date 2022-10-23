import React from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useField,
  useFormikContext,
} from "formik";

const styles = {
  label: "block text-gray-700 text-sm font-bold pt-2 pb-1",
  field:
    "bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none",
  button:
    " bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600",
  errorMsg: "text-red-500 text-sm",
};

const Contact = () => {
  function renameFile(originalFile: File | any, newName: string) {
    const file: File = new File([originalFile], newName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified,
    });
    return file;
  }
  const submitResume = (resumeData: any) => {
   
    var newData = new FormData(resumeData.target);
    const data = Object.fromEntries(newData);
    alert(JSON.stringify(data))
    newData.append("fName", resumeData.fName);
    newData.append("lName", resumeData.lName);
    newData.append("email", resumeData.email);
    newData.append("mobile", resumeData.mobile);
    newData.append("position", resumeData.position);
    newData.append("city", resumeData.city);


   
  };
  const formInitialValues = {
    fName: "",
    lName: "",
    email: "",
    mobile: "",
    position: "",
    city: "",
    
  };
  return (
    <div></div>
  )
}

export default Contact