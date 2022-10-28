import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRecipesListAlphabetical } from "../../services/recipeService";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchRecipesPopular,
  selectRecipes,
} from "../../store/recipe/recipeSlice";
import { IngredientGetBasicType } from "../../types/types";
const RecipesView = () => {
  const dispatch = useAppDispatch();
  const recipesList = useAppSelector(selectRecipes);
  useEffect(() => {
    dispatch(fetchRecipesPopular()).then(() => console.log(recipesList));
  }, []);
  const recipeModalHandler = (id: string) => {
    // TODO: ingredient modal
    console.log("Modal Open: Recipe: ", id);
  };

  const ingredientModalHandler = (id: string) => {
    // TODO: ingredient modal
    console.log("Modal Open: Ingredient: ", id);
  };
  return (
    <>
      <div className="px-10 w-[90%]  mx-auto drop-shadow-lg pb-20">
        <h3 className="font-medium text-left leading-tight text-3xl mt-0 mb-2 text-red-600 pt-10">
          Recipes
        </h3>
        <div className="grid lg:grid-cols-2 lg:gap-4">
          {recipesList &&
            recipesList.map((recipe) => {
              return (
                <div className="" key={recipe._id}>
                  {/* <p className="break-words">{JSON.stringify(recipe)}</p> */}
                  <div className="max-w-full sm:max-w-full md:max-w-full w-full lg:max-w-full lg:flex mt-5 bg-white border rounded-md hover:bg-red-200 border-r border-b border-l border-red-400 lg:border-l-0 lg:border-t lg:border-red-400">
                    <div
                      className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden cursor-pointer"
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
                        <div className="text-gray-900 font-bold text-xl">
                          {recipe.name}
                        </div>
                        <p className="text-gray-700 text-base">
                          {recipe.recipeText}
                        </p>
                      </div>
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
                                <p className="text-gray-600">
                                  {ingredient.category}
                                </p>
                              </div>
                            </div>
                          </a>
                        );
                      })}
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
