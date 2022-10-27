import React, { useEffect } from "react";
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
  return (
    <>
      <div className="px-10 w-[90%]  mx-auto drop-shadow-lg pb-20">
        <h3 className="font-medium text-left leading-tight text-3xl mt-0 mb-2 text-red-600 pt-10">
          Recipes
        </h3>
        {recipesList &&
          recipesList.map((recipe) => {
            return (
              <>
                {/* <p className="break-words">{JSON.stringify(recipe)}</p> */}
                <div className="max-w-sm w-full lg:max-w-full lg:flex pt-5">
                  <div
                    className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                    // style="background-image: url('/img/card-left.jpg')"
                    style={{"backgroundImage": (`url(${recipe.uploadedRecipeImageFileName})`)}}
                    title={recipe.name}
                  >
                    {/* <img src={recipe.uploadedRecipeImageFileName}></img> */}
                  </div>
                  <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
                    <div className="mb-8">
                      <p className="text-sm text-gray-600 flex items-center">
                        {recipe.ingredientsRequired.reduce(
                          (categoryPrev: string, ingredient) => {
                            if (ingredient.category === "Non-Veg") {
                              return "Non-Veg";
                            }
                            return categoryPrev;
                          },
                          "Veg"
                        ) === "Veg" ? <p className="text-green-500">Veg</p> : <p className="text-red-600">Non-Veg</p> }
                      </p>
                      <div className="text-gray-900 font-bold text-xl">
                        {recipe.name}
                      </div>
                      <p className="text-gray-700 text-base">
                        {recipe.recipeText}
                      </p>
                    </div>
                    {recipe.ingredientsRequired.map((ingredient) => {
                      return (
                        <div className="flex items-center pb-2">
                          <img
                            className="w-10 h-10 rounded-full mr-4"
                            src={ingredient.uploadedIngredientImage}
                            alt={ingredient.name}
                          />
                          <div className="text-sm">
                            <p className="text-gray-900 leading-none">
                              {ingredient.name}
                            </p>
                            <p className="text-gray-600">{ingredient.category}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default RecipesView;
