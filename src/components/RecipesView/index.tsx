import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRecipesListAlphabetical } from "../../services/recipeService";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchRecipesPopular,
  selectLoading,
  selectRecipes,
} from "../../store/recipe/recipeSlice";
import { IngredientGetBasicType } from "../../types/types";
const RecipesView = () => {
  const dispatch = useAppDispatch();
  const recipesList = useAppSelector(selectRecipes);
  const loadingState = useAppSelector(selectLoading);
  useEffect(() => {
    dispatch(fetchRecipesPopular()).then(() => console.log(recipesList));
  }, []);
  const navigate = useNavigate();
  const recipeModalHandler = (id: string) => {
    // TODO: ingredient modal
    console.log("Modal Open: Recipe: ", id);
    navigate('/recipes/'+id);
  };

  const ingredientModalHandler = (id: string) => {
    // TODO: ingredient modal
    console.log("Modal Open: Ingredient: ", id);
    navigate('/ingredients/'+id);
  };
  return (
    <>
      <div className="px-10 w-[90%]  mx-auto drop-shadow-lg pb-20">
        <h3 className="font-medium text-left leading-tight text-3xl mt-0 mb-2 text-red-600 pt-10 ">
          Recipes
        </h3>
        <div className="grid lg:grid-cols-2 gap-4">
          {loadingState === "pending" &&
            Array(4)
              .fill({})
              .map((ingredient, idx) => {
                return (
                  <Fragment key={idx}>
                    {/* <p className="break-words">{JSON.stringify(ingredient)}</p> */}
                    <div
                      className="bg-white lg:h-52 rounded shadow-lg flex flex-col lg:flex-row  select-none border max-w-full lg:max-w-full w-full lg:flex border-red-500 
                  h-48  flex-none bg-cover rounded-t lg:rounded-l text-center overflow-hidden min-h-[400px] lg:min-h-full"
                    >
                      <div className="flex justify-center items-center w-full h-full bg-gray-200 lg:rounded-l max-h-[192px] lg:max-h-full lg:w-[192px] lg:min-h-[192px] dark:bg-gray-400 lg:border-r lg:border-r-yellow-300 animate-pulse ">
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
                        className="flex flex-col flex-1 gap-5 lg:p-2 my-auto  
                      rounded-b lg:rounded-b-none lg:rounded-r p-4 leading-normal lg:w-[300px]   border-t border-t-yellow-400 lg:border-t-0"
                      >
                        <div className="flex flex-1 flex-col gap-4 pl-5">
                          <div className="bg-green-200 w-20 animate-pulse h-5 rounded-xl"></div>
                          <div className="bg-gray-200 w-28 animate-pulse h-8 rounded-xl"></div>

                          <div className="flex flex-1 flex-col gap-4">
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
              })}
        </div>
        {loadingState === "succeeded" && recipesList.length === 0 && (
          <p>No ingredients present</p>
        )}
        <div className="grid lg:grid-cols-2 lg:gap-4 ">
          {recipesList &&
            recipesList.map((recipe) => {
              return (
                <div className="rounded-md border border-red-400" key={recipe._id}>
                  {/* <p className="break-words">{JSON.stringify(recipe)}</p> */}
                  <div className="max-w-full sm:max-w-full md:max-w-full w-full lg:max-w-full lg:flex bg-white  rounded-md hover:bg-red-200  lg:min-h-[280px]">
                    <div
                      className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-r-none lg:rounded-l text-center overflow-hidden cursor-pointer"
                      onClick={() => {
                        recipeModalHandler(recipe._id);
                      }}
                      // style="background-image: url('/img/card-left.jpg')"
                      style={
                        recipe.uploadedRecipeImageFlag
                          ? {
                              backgroundImage: `url(${recipe.uploadedRecipeImageFileName})`,
                            }
                          : {
                              backgroundImage: `url(https://res.cloudinary.com/dxgfvidct/image/upload/v1666940089/empty-recipe_o3l7qn.jpg)`,
                            }
                      }
                      title={recipe.name}
                    >
                      {/* <img src={recipe.uploadedRecipeImageFileName}></img> */}
                    </div>
                    <div className="  rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal lg:w-[300px] lg:border-l  border-t border-t-yellow-400 lg:border-t-0">
                      <div
                        className="mb-5 cursor-pointer"
                        onClick={() => {
                          recipeModalHandler(recipe._id);
                        }}
                      >
                        <div className="text-sm text-gray-600 flex items-center">
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
                        <div className="text-gray-900 font-bold text-xl whitespace-pre-line overflow-auto">
                          {recipe.name}
                        </div>
                        <p className="text-gray-700 text-base whitespace-pre-line overflow-clip">
                          {recipe.recipeText.length > 50 ? <>{recipe.recipeText.slice(0, 50)} <span className="text-teal-400 hover:text-blue-400">... Read More</span></> : recipe.recipeText}
                        </p>
                      </div>
                      <div className="grid grid-cols-1">
                      {recipe.ingredientsRequired.map((ingredient) => {
                        return (
                          <a
                            className="hover:bg-yellow-200 rounded-md pl-5 cursor-pointer"
                            onClick={() => {
                              ingredientModalHandler(ingredient._id);
                            }}
                            key={ingredient._id}
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
                                <p className="text-gray-900 leading-none whitespace-pre-line overflow-auto">
                                  {ingredient.name}
                                </p>
                                <div className="">
                                {ingredient.category === "Veg" ? (
                                  <p className="text-green-500 font-bold bg-green-100 rounded-full px-3 mt-2">Veg</p>
                                ) : (
                                  <p className="text-red-500 font-bold bg-red-100 rounded-full px-3 mt-2">Non-Veg</p>
                                )}
                              </div>
                              </div>
                            </div>
                          </a>
                        );
                      })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default RecipesView;
