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
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchRecipe,
  selectLoading,
  selectRecipe,
  submitRecipeThunk,
  updateRecipeThunk,
} from "../../store/recipe/recipeSlice";
import DateView from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen/instance/Cloudinary";
import { getRecipeImageUploadSign } from "../../services/recipeService";
import Multiselect from "multiselect-react-dropdown";
import {
  fetchIngredientsAlphabetical,
  selectIngredients,
} from "../../store/ingredient/ingredientSlice";

const styles = {
  label: "block text-gray-700 text-sm font-bold pt-2 pb-1",
  field:
    "bg-gray-100 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none",
  button:
    " bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600",
  errorMsg: "text-red-500 text-sm",
  checkboxLabel: "text-gray-700 text-sm font-bold pt-2 pb-1 pl-2",
};
const RecipeEditForm = ({ editRecipeId }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const ingredientsList = useAppSelector(selectIngredients);
  const editRecipe = useAppSelector(selectRecipe);
  const loadingState = useAppSelector(selectLoading);
  const [loadingFiles, setLoadingFiles] = useState("loading");
  console.log(editRecipeId);
  useEffect(() => {
    setLoadingFiles("loading");
    dispatch(fetchIngredientsAlphabetical());
    // .then(() =>
    //   )
    // );
    if (editRecipeId !== "") dispatch(fetchRecipe(editRecipeId));
  }, [editRecipeId]);
  useEffect(() => {
    setLoadingFiles("loading");
    console.log(editRecipe);
    console.log(
      ingredientsList.map((ingredient) => {
        return { id: ingredient._id, name: ingredient.name };
      })
    );

    setRecipeUploadedFilename(editRecipe.uploadedRecipeImageFileName);
    setRecipeUploadedFilenamePublic(
      editRecipe.uploadedRecipeImageFileNamePublicId
    );
    setLoadingFiles("success");
  }, [editRecipe]);
  // const onClickHandler = ()=>{
  //   alert('clicked');
  // }
  const [recipeUploadedFilename, setRecipeUploadedFilename] = useState("");
  const [recipeUploadedFilenamePublic, setRecipeUploadedFilenamePublic] =
    useState("");
  const cloudName = `${import.meta.env.VITE_CLOUD_NAME}`; // replace with your own cloud name
  const uploadPreset = "recipe"; // replace with your own upload preset
  const api_key = import.meta.env.VITE_CLOUDINARY_API_KEY;
  // Remove the comments from the code below to add
  // additional functionality.
  // Note that these are only a few examples, to see
  // the full list of possible parameters that you
  // can add see:
  //   https://cloudinary.com/documentation/upload_widget_reference
  const RecipeUpload = async () => {
    const res = await getRecipeImageUploadSign();
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
        // folder: "recipe_attachments", //upload files to the specified folder
        tags: ["recipe"], //add the given tags to the uploaded files
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
          setRecipeUploadedFilename(result.info.secure_url);
          setRecipeUploadedFilenamePublic(result.info.public_id);
        }
      }
    );
  };
  interface FormValuesSubmit {
    name: string;
    ingredientsRequired: Array<Object> | string;
    timeToCook: string;
    recipeText: string;
    attachmentFlag: Boolean;
    uploadedRecipe: string;
    uploadedRecipePublic: string;
  }
  const submitRecipe = (resumeData: FormValuesSubmit) => {
    var newData = new FormData();
    newData.append("_id", editRecipe._id);
    newData.append("name", resumeData.name);
    newData.append("ingredientsRequired", resumeData.ingredientsRequired);
    newData.append("timeToCook", resumeData.timeToCook);
    newData.append("recipeText", resumeData.recipeText);
    newData.append("attachmentFlag", resumeData.attachmentFlag);
    newData.append("uploadedRecipe", resumeData.uploadedRecipe);
    newData.append("uploadedRecipePublic", resumeData.uploadedRecipePublic);
    dispatch(updateRecipeThunk(newData));
  };
  const formInitialValues = {
    name: editRecipe.name,
    ingredientsRequired: editRecipe.ingredientsRequired.map((ingredient) => {
      return { id: ingredient._id, name: ingredient.name };
    }),
    timeToCook: editRecipe.timeToCook,
    recipeText: editRecipe.recipeText,
    attachmentFlag: editRecipe.uploadedRecipeImageFlag,
    uploadedRecipe: File,
  };
  const onIngredientSelect = (
    selectedList: Array<{ id: string; name: string }>,
    selectedItem: Object,
    name: string = "ingredientsRequired",
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    console.log(
      selectedList.map((item) => {
        return item.id;
      }),
      selectedItem
    );
    setFieldValue(name, selectedList);
  };

  const onIngredientRemove = (
    selectedList: Array<{ id: string; name: string }>,
    selectedItem: Object,
    name: string = "ingredientsRequired",
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    console.log(
      selectedList.map((item) => {
        return item.id;
      }),
      selectedItem
    );
    setFieldValue(name, selectedList);
  };
  return (
    <>
    {loadingFiles !== "success" && (
        <div className="modal-body relative p-20 text-center" role="status">
          <svg
            className="inline-block mr-2 w-12 h-12 text-gray-200 animate-spin dark:text-gray-400 fill-teal-500 mx-auto"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {loadingState === "succeededOne" && (
        <>
          <div className="modal-body relative p-4 pt-0">
            <Formik
              initialValues={formInitialValues}
              validate={(values) => {
                const errors: any = {};
                if (!values.name) {
                  errors.name = "Recipe Name is Required";
                }
                if (values.ingredientsRequired.length === 0) {
                  errors.date = "At least one ingredient is Required";
                }
                if (!values.timeToCook) {
                  errors.timeToCook = "Time to cook is Required";
                }
                // if (!values.recipeText) {
                //   errors.recipeText = "Mobile is Required";
                // }
                if (
                  values.attachmentFlag &&
                  (!values.uploadedRecipe ||
                    values.uploadedRecipe === null ||
                    document.getElementById("uploadedRecipe") !== null)
                ) {
                  {
                    console.log(values.uploadedRecipe);
                    errors.uploadedRecipe = "Uploaded Image is Required";
                  }
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(false);
                console.log(values);

                if (!values.attachmentFlag) {
                  console.log("Test1");
                  submitRecipe({
                    ...values,
                    attachmentFlag: false,
                    uploadedRecipe: "",
                    uploadedRecipePublic: "",
                    ingredientsRequired: values.ingredientsRequired.map(
                      (ingredient: any) => {
                        return ingredient.id;
                      }
                    ),
                  });
                } else if (recipeUploadedFilename === "") {
                  console.log("recipeUploadedFilename", recipeUploadedFilename);
                  setSubmitting(false);
                } else {
                  console.log("Test3");

                  // const parts = values.uploadedRecipe.name.split(".");
                  // const ext = values.uploadedRecipe.name.slice(
                  //   values.uploadedRecipe.name.length -
                  //     parts[parts.length - 1].length
                  // );
                  // const name = values.uploadedRecipe.name.slice(
                  //   0,
                  //   values.uploadedRecipe.name.length - ext.length - 1
                  // );
                  // const newName = Date.now() + "-" + name + "." + ext;
                  submitRecipe({
                    ...values,
                    attachmentFlag: true,
                    uploadedRecipe: recipeUploadedFilename,
                    uploadedRecipePublic: recipeUploadedFilenamePublic,
                    ingredientsRequired: values.ingredientsRequired.map(
                      (ingredient: any) => {
                        return ingredient.id;
                      }
                    ),
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
                      placeholder="Recipe Name"
                    />
                    <ErrorMessage
                      name="name"
                      component="span"
                      className={styles.errorMsg}
                    />
                  </div>
                  <div className="form-group row py-sm-1 px-sm-3">
                    <label className={styles.label} htmlFor="timeToCook">
                      Time To Cook<span className={styles.errorMsg}>*</span>
                    </label>
                    <Field
                      className={`${styles.field} ${
                        touched.timeToCook && errors.timeToCook
                          ? "is-invalid"
                          : ""
                      }`}
                      type="text"
                      name="timeToCook"
                      placeholder="Time To Cook"
                    />
                    <ErrorMessage
                      name="timeToCook"
                      component="span"
                      className={styles.errorMsg}
                    />
                  </div>
                  <div className="form-group row py-sm-2 px-sm-3">
                    <label className={styles.label} htmlFor="recipeText">
                      Recipe Text
                      {/* <span className={styles.errorMsg}>*</span> */}
                    </label>
                    <Field
                      className={`${styles.field} ${
                        touched.recipeText && errors.recipeText
                          ? "is-invalid"
                          : ""
                      }`}
                      component="textarea"
                      rows="4"
                      name="recipeText"
                      placeholder="Recipe Text"
                    />

                    <ErrorMessage
                      name="recipeText"
                      component="div"
                      className={styles.errorMsg}
                    />
                  </div>
                  <div className="form-group row py-sm-2 px-sm-3">
                    <label
                      className={styles.label}
                      htmlFor="ingredientsRequired"
                    >
                      Ingredients Required
                      <span className={styles.errorMsg}>*</span>
                    </label>
                    <Multiselect
                      id="ingredientsRequired"
                      className="py-2"
                      options={ingredientsList.map((ingredient) => {
                        return { id: ingredient._id, name: ingredient.name };
                      })}
                      selectedValues={editRecipe.ingredientsRequired.map(
                        (ingredient) => {
                          return { id: ingredient._id, name: ingredient.name };
                        }
                      )}
                      onSelect={(selectedList, selectedItem) =>
                        onIngredientSelect(
                          selectedList,
                          selectedItem,
                          "ingredientsRequired",
                          setFieldValue
                        )
                      } // Function will trigger on select event
                      onRemove={(selectedList, selectedItem) =>
                        onIngredientRemove(
                          selectedList,
                          selectedItem,
                          "ingredientsRequired",
                          setFieldValue
                        )
                      } // Function will trigger on remove event
                      displayValue="name" // Property name to display in the dropdown options
                    />

                    <ErrorMessage
                      name="ingredientsRequired"
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
                        Upload Recipe
                      </span>
                    </label>
                    <ErrorMessage
                      name="timeToCook"
                      component="span"
                      className={styles.errorMsg}
                    />
                  </div>
                  {values.attachmentFlag && (
                    <div className="form-group row py-sm-2 px-sm-3">
                      <button
                        id="recipe_upload_widget"
                        className={`${styles.field}`}
                        onClick={(e) => {
                          e.preventDefault();
                          RecipeUpload();
                        }}
                      >
                        Upload
                      </button>
                      <ErrorMessage
                        name="uploadedRecipe"
                        component="div"
                        className={styles.errorMsg}
                      />
                      <label className={`${styles.label} font-normal`}>
                        {recipeUploadedFilename !== "" && (
                          <p>
                            File uploaded at{" "}
                            <a
                              className="font-bold text-blue-500"
                              href={recipeUploadedFilename}
                            >
                              {recipeUploadedFilename}
                            </a>
                          </p>
                        )}
                      </label>
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
      )}
    </>
  );
};

export default RecipeEditForm;
