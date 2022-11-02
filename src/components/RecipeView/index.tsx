import React, { Fragment, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchRecipe,
  selectLoading,
  selectRecipe,
  selectRecipes,
} from "../../store/recipe/recipeSlice";
import { IngredientGetBasicType } from "../../types/types";
const RecipeView = () => {
  const dispatch = useAppDispatch();
  const recipe = useAppSelector(selectRecipe);
  const loadingState = useAppSelector(selectLoading);
  const param = useParams();
  console.log(param);
  useEffect(() => {
    dispatch(fetchRecipe(param.id || "")).then(() => console.log(recipe));
  }, []);
  const recipeModalHandler = (id: string) => {
    // TODO: ingredient modal
    console.log("Modal Open: Recipe: ", id);
  };
  const navigate = useNavigate();
  const ingredientModalHandler = (id: string) => {
    // TODO: ingredient modal
    console.log("Modal Open: Ingredient: ", id);
    navigate('/ingredients/'+id);
  };
  return (
    <>
      <div className="px-10 w-[90%]  mx-auto drop-shadow-lg pb-20">
        <h3 className="font-medium text-left leading-tight text-3xl mt-0 mb-2 text-red-600 pt-10 ">
          Recipe
        </h3>
        <div className="max-w-full w-full  max-h-full">
          {
            // loadingState === "pending" &&

            [{}].map((ingredient, idx) => {
              return (
                <Fragment key={idx}>
                  {/* <p className="break-words">{JSON.stringify(ingredient)}</p> */}
                  <div
                    className="bg-white dark:bg-gray-100 shadow-lg  select-none border max-w-full w-full 
                    flex-none bg-cover text-center overflow-hidden min-h-[400px]  grid grid-cols-1 lg:grid-cols-2 p-5 rounded-md border-r border-b border-l border-red-400  "
                  >
                    <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-400 animate-pulse  h-[300px] text-center overflow-hidden bg-cover rounded-md border-yellow-600">
                      <svg
                        className="w-12 h-12 text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 640 512"
                      >
                        <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                      </svg>
                    </div>
                    <div
                      className="flex flex-col flex-1 gap-5   
                      rounded-b lg pt-10 lg:p-4 leading-normal "
                    >
                      <div className="flex flex-1 flex-col gap-4 pl-5">
                        <div className="bg-green-200 w-20 animate-pulse h-5 rounded-xl"></div>
                        <div className="bg-gray-200 w-28 animate-pulse h-8 rounded-xl"></div>
                        <div className="flex gap-2 pb-10">
                          <span className="bg-gray-300 w-28 animate-pulse h-5 rounded-xl"></span>
                          <span className="bg-teal-200 w-14 animate-pulse h-5 rounded-xl"></span>
                        </div>

                        <div className="flex flex-1 flex-col gap-4 ">
                          <div className="flex flex-2 justify-start items-center">
                            <span className="flex justify-center items-center bg-gray-200  dark:bg-gray-400 border border-gray-300 animate-pulse w-10 h-10 rounded-full p-2 mr-5"></span>
                            <div className="flex flex-col gap-2">
                              <span className="bg-blue-200 w-40 animate-pulse h-3 rounded-xl"></span>
                              <span className="bg-green-200 w-10 animate-pulse h-3 rounded-xl"></span>
                            </div>
                          </div>

                          <div className="flex flex-2 justify-start items-center">
                            <span className="flex justify-center items-center bg-gray-200  dark:bg-gray-400 border border-gray-300 animate-pulse w-10 h-10 rounded-full p-2 mr-5"></span>
                            <div className="flex flex-col gap-2">
                              <span className="bg-yellow-200 w-40 animate-pulse h-3 rounded-xl"></span>
                              <span className="bg-red-200 w-20 animate-pulse h-3 rounded-xl"></span>
                            </div>
                          </div>
                          <div className="bg-gray-300 lg:w-96 animate-pulse h-4 rounded-xl mt-10"></div>
                          <div className="bg-gray-300 lg:w-96 animate-pulse h-4 rounded-xl"></div>
                          <div className="bg-gray-300 lg:w-96 animate-pulse h-4 rounded-xl"></div>
                          <div className="bg-gray-300 lg:w-96 animate-pulse h-4 rounded-xl"></div>
                          <div className="bg-gray-300 lg:w-96 animate-pulse h-4 rounded-xl"></div>
                        </div>
                      </div>
                      {/* <div className="mt-auto flex gap-3">
                        <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full"></div>
                        <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full"></div>
                        <div className="bg-gray-200 w-20 h-8 animate-pulse rounded-full ml-auto"></div>
                      </div> */}
                    </div>
                  </div>
                </Fragment>
              );
            })
          }
        </div>
        {loadingState === "succeeded" && recipe._id === "" && (
          <p>Ingredient not present</p>
        )}
        {loadingState === "rejected" && <p>Ingredient fetch error</p>}
        {loadingState === "succeeded" && (
          <div className="">
            <div className="">
              {/* <p className="break-words">{JSON.stringify(recipe)}</p> */}
              <div className="max-w-full w-full   bg-white border rounded-md border-r border-b border-l border-red-400  max-h-full grid grid-cols-1 lg:grid-cols-2">
                {recipe && loadingState === "succeeded" && recipe._id && (
                  <>
                    <div className="lg:h-[500px]  flex-none bg-cover rounded-t  text-center overflow-hidden p-5">
                      <img
                        className="rounded-md"
                        src={recipe.uploadedRecipeImageFileName}
                      />
                    </div>
                    <div className="  rounded-b p-4 flex flex-col justify-between leading-normal ">
                      <div className="mb-5">
                        <div className="text-sm text-gray-600 ">
                          {recipe.ingredientsRequired.reduce(
                            (categoryPrev: string, ingredient) => {
                              if (ingredient.category === "Non-Veg") {
                                return "Non-Veg";
                              }
                              return categoryPrev;
                            },
                            "Veg"
                          ) === "Veg" ? (
                            <p className="text-green-500">Veg</p>
                          ) : (
                            <p className="text-red-600">Non-Veg</p>
                          )}
                        </div>
                        <div className="text-gray-900 font-bold text-xl">
                          {recipe.name}
                        </div>
                        <div className="text-gray-700 text-base">
                          Time to Cook:
                          <span className="font-bold text-teal-600">
                            {" "}
                            {recipe.timeToCook}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col my-10">
                        {recipe.ingredientsRequired.map((ingredient) => {
                          return (
                            <a
                              className="hover:bg-yellow-200 rounded-md pl-5 cursor-pointer"
                              onClick={() => {
                                ingredientModalHandler(ingredient._id);
                              }}
                            >
                              <div
                                className="flex items-center py-2"
                                key={ingredient._id}
                              >
                                <img
                                  className="w-10 h-10 rounded-full mr-4"
                                  src={
                                    ingredient.attachmentFlag
                                      ? ingredient.uploadedIngredientImage
                                      : "https://res.cloudinary.com/dxgfvidct/image/upload/v1666940089/empty-ingredients_myiljy.jpg"
                                  }
                                  alt={ingredient.name}
                                />
                                <div className="text-sm">
                                  <p className="text-gray-900 leading-none">
                                    {ingredient.name}
                                  </p>
                                  <div className="">
                                    {ingredient.category === "Veg" ? (
                                      <p className="text-green-500 font-bold bg-green-100 rounded-full px-3 mt-2">
                                        Veg
                                      </p>
                                    ) : (
                                      <p className="text-red-500 font-bold bg-red-100 rounded-full px-3 mt-2">
                                        Non-Veg
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </a>
                          );
                        })}
                      </div>
                      <div className="pr-5 pb-5">
                        <p className="text-gray-700 text-base whitespace-pre-line">
                          {recipe.recipeText}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RecipeView;
