import { PlusIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState, Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchIngredientsAlphabetical, selectIngredients } from "../../store/ingredient/ingredientSlice";
import IngredientForm from "./IngredientUploadForm";
import Table, {
  AvatarCell,
  CategoryCell,
  DateCell,
  DeleteIngredient,
  DownloadPDFIngredient,
  EditIngredient,
  SelectColumnFilter,
  SelectDateFilter,
  StatusPill,
} from "./table";

const IngredientsAdmin = () => {
  // const [ingredientsList, setIngredientsList] = useState([]);
  const ingredientsList = useAppSelector(selectIngredients);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchIngredientsAlphabetical()).then(() => console.log(ingredientsList));
  }, []);
  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: CategoryCell,
        Filter: SelectDateFilter,
        filter: 'includes',
      },
      {
        Header: "Image",
        accessor: "uploadedIngredientImage",
        Cell: DownloadPDFIngredient,
        flagAccessor: "attachmentFlag",
      },
      {
        Header: "Filter+",
        accessor: "filter_plus",
      },
      {
        Header: "Filter-",
        accessor: "filter_minus",
      },
      {
        Header: "Edit Ingredient",
        editAccessor: "_id",
        Cell: EditIngredient,
      },
      {
        Header: "Delete Ingredient",
        accessor: "_id",
        Cell: DeleteIngredient,
      },
    ],
    []
  );
  {
    /* 



      


          
      */
  }
  return (
    <>
      <div id="ingredient" className="w-full">
        <div className="max-w-[1180px] mx-auto relative">
          <div className="justify-center items-center px-4">
            <h2 className="font-medium text-left leading-tight text-3xl mt-0 mb-2 text-red-600 pt-10">
              Ingredient Admin
            </h2>
            <button
              type="button"
              className="px-4 mt-10 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              data-mdb-ripple="true"
              data-bs-toggle="modal"
              data-bs-target="#ingredientModal"
            >
              <PlusIcon className="h-6 w-6" />
              <p>Add Ingredient</p>
            </button>
          </div>
          <div
            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id="ingredientModal"
            aria-labelledby="ingredientModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog relative w-auto pointer-ingredients-none">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-ingredients-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md mb-0 pb-2">
                  <h5
                    className="text-xl font-medium leading-normal text-gray-800"
                    id="ingredientModalLabel"
                  >
                    Upload Ingredient
                  </h5>
                  <button
                    type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <IngredientForm />
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Table columns={columns} data={ingredientsList} />
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredientsAdmin;
