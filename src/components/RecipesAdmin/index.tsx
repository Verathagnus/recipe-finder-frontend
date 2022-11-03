import { PlusIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState, Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchRecipesAlphabetical, selectEditRecipeId, selectRecipes, selectRecipeTextView } from "../../store/recipe/recipeSlice";
import { IngredientGetBasicType } from "../../types/types";
import RecipeEditForm from "./RecipeEditForm";
import RecipeForm from "./RecipeUploadForm";
import Table, {
  AvatarCell,
  CategoryCell,
  DateCell,
  DeleteRecipe,
  DownloadPDFIngredient,
  EditRecipe,
  RecipeText,
  SelectColumnFilter,
  SelectDateFilter,
  StatusPill,
  TimeCell,
} from "./table";

const RecipesAdmin = () => {
  // const [recipesList, setIngredientsList] = useState([]);
  const recipesList = useAppSelector(selectRecipes);
  const editRecipeId = useAppSelector(selectEditRecipeId);
  const recipeTextView = useAppSelector(selectRecipeTextView);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchRecipesAlphabetical()).then(() => console.log(recipesList.map(recipe => {
      return {...recipe, category: recipe.ingredientsRequired.reduce(
        (categoryPrev: string, ingredient: IngredientGetBasicType) => {
          if (ingredient.category === "Non-Veg") {
            return "Non-Veg";
          }
          return categoryPrev;
        },
        "Veg"
      )}
    })));
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
        Header: "Time To Cook",
        accessor: "timeToCook",
        Cell: TimeCell  
      },
      {
        Header: "Image",
        accessor: "uploadedRecipeImageFileName",
        Cell: DownloadPDFIngredient,
        flagAccessor: "uploadedRecipeImageFlag",
      },
      {
        Header: "Edit Recipe",
        editAccessor: "_id",
        Cell: EditRecipe,
      },
      {
        Header: "Delete Recipe",
        accessor: "_id",
        Cell: DeleteRecipe,
      },
      {
        Header: "Recipe Text",
        accessor: "recipeText",
        Cell: RecipeText
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
      <div id="recipe" className="w-full">
        <div className="max-w-[1180px] mx-auto relative">
          <div className="justify-center items-center px-4">
            <h2 className="font-medium text-left leading-tight text-3xl mt-0 mb-2 text-red-600 pt-10">
              Recipes Admin
            </h2>
            <button
              type="button"
              className="px-4 mt-10 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out flex items-center"
              data-mdb-ripple="true"
              data-bs-toggle="modal"
              data-bs-target="#recipeModal"
            >
              <PlusIcon className="h-6 w-6" />
              <p>Add Recipe</p>
            </button>
          </div>
          <div
            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id="recipeModal"
            aria-labelledby="recipeModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog relative w-auto pointer-events-none">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md mb-0 pb-2">
                  <h5
                    className="text-xl font-medium leading-normal text-gray-800"
                    id="recipeModalLabel"
                  >
                    Upload Recipe
                  </h5>
                  <button
                    type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <RecipeForm />
              </div>
            </div>
          </div>
          <div
            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id={`recipeModalEdit`}
            aria-labelledby={`recipeModalEditLabel`}
            aria-hidden="true"
          >
            <div className="modal-dialog relative w-auto pointer-events-none">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md mb-0 pb-2">
                  <h5
                    className="text-xl font-medium leading-normal text-gray-800"
                    id={`recipeModalEditLabel`}
                  >
                    Edit Recipe
                  </h5>
                  <button
                    type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <RecipeEditForm editRecipeId={editRecipeId}/>
              </div>
            </div>
          </div>
          <div
            className="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
            id={`recipeTextModalView`}
            aria-labelledby={`recipeTextModalViewLabel`}
            aria-hidden="true"
          >
            <div className="modal-dialog relative w-auto pointer-events-none">
              <div className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md mb-0 pb-2">
                  <h5
                    className="text-xl font-medium leading-normal text-gray-800"
                    id={`recipeTextModalViewLabel`}
                  >
                    View Recipe
                  </h5>
                  <button
                    type="button"
                    className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
               <p className="p-5 mx-2 whitespace-pre-line overflow-auto"> {recipeTextView}</p>
              </div>
            </div>
          </div>
          <div className="mt-5">
            <Table columns={columns} data={recipesList.map(recipe => {
              return {...recipe, category: recipe.ingredientsRequired.reduce(
                (categoryPrev: string, ingredient: IngredientGetBasicType) => {
                  if (ingredient.category === "Non-Veg") {
                    return "Non-Veg";
                  }
                  return categoryPrev;
                },
                "Veg"
              )}
            })} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipesAdmin;
