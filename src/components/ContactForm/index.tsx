import React, { useState } from "react";
import { sendMessageEmail } from "../../services/contactService";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useField,
  useFormikContext,
} from "formik";
import {FiSend} from 'react-icons/fi'
const styles = {
  label: "block text-gray-700 text-sm font-bold pt-2 pb-1",
  field:
    "bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none focus:bg-gray-200",
  button:
    " bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600",
  errorMsg: "text-red-500 text-sm",
  textarea:
    "bg-gray-100 w-[300px] sm:w-[600px] lg:w-[800px] focus:shadow-outline rounded block w-full appearance-none focus:bg-gray-200 p-5",
};

import ReCAPTCHA from "react-recaptcha";
// import grecaptcha from 'grecaptcha';
const MyTextArea = ({ label, ...props }:any) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className={styles.label} htmlFor={props.id || props.name}>
        {label}
        <span className={styles.errorMsg}>*</span>
      </label>
      <textarea
        className="w-[400px] sm:w-[600px] lg:w-[800px]"
        {...field}
        {...props}
      ></textarea>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const Contact = () => {
  const [isVerified, setVerified] = useState(false);
  function onChange(response: any) {
    if (response) {
      setVerified(true);
    }
  }

  const formInitialValues = {
    fName: "",
    lName: "",
    email: "",
    mobile: "",
    message: "",
  };
  return (
    <div className="w-full flex border-t-2 pt-10 flex-col  lg:justify-center lg:items-center justify-center ">
      <div className="">
        <h3 className="font-bold text-center text-4xl md:text-6xl">
          {" "}
          WRITE TO US
        </h3>
        <p className=" text-gray-600 my-2 text-center text-2xl">
          {" "}
          Feel Free to Connect
        </p>
      </div>

      <Formik
        initialValues={formInitialValues}
        validate={(values) => {
          const errors: any = {};
          if (!values.fName) {
            errors.fName = "First Name is Required";
          } else if (!/^[A-Za-z]{5,30}$/.test(values.fName)) {
            errors.fName =
              "First Name should not contain special characters or numbers.";
          }

          if (!values.lName) {
            errors.lName = "Last Name is Required";
          } else if (!/^[A-Za-z]{5,30}$/.test(values.lName)) {
            errors.lName =
              "Last Name should not contain special characters or numbers.";
          }

          if (!values.email) {
            errors.email = "Email is Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          if (!values.mobile) {
            errors.mobile = "Mobile is Required";
          } else if (!/^[1-9][0-9]{9}$/i.test(values.mobile)) {
            errors.mobile = "Invalid mobile number provided";
          }

          if (!values.message) {
            errors.message = "Message is Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setSubmitting(false);
          if (isVerified) {
            // alert('Successfully Verified')
            // alert(JSON.stringify(values, null, 2));
            try {
              sendMessageEmail(JSON.stringify(values));
              alert("Message Successfully Sent");
              // grecaptcha.reset();
            } catch (err) {
              alert("Form submit unsuccessful" + (err as Error).message);
            }
            resetForm();
          } else {
            alert("Invalid Captcha");
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
          <div className="w-full flex justify-center my-10">
            <Form className=" form-training w-[300px] sm:w-[600px] lg:w-[800px]">
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

              <MyTextArea
                label="Message"
                name="message"
                rows="6"
                placeholder="Enter your message here"
                className={`${styles.textarea}`}
              />

              <ReCAPTCHA
                className="my-10"
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI "
                verifyCallback={onChange}
                // theme  = "dark"
              />
              
              {/* 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI is for testing only , create one for your own site  */}

              <div className=" flex justify-center flex-wrap items-center p-4 border-t border-gray-200 rounded-b-md">
                <button
                  type="submit"
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
                  ease-in-out
                  ml-1"
                  disabled={isSubmitting}
                  style={{
                    color: "white",
                  }}
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  <div className="flex flex-row gap-1">
                    {" "}
                    SEND <FiSend />
                  </div>
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Contact;
