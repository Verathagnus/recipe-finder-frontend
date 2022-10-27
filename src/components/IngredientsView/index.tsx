import React, { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { IngredientGetBasicType } from "../../types/types";
import {
  fetchIngredientsPopular,
  selectIngredients,
} from "../../store/ingredient/ingredientSlice";

const IngredientsView = () => {
  const dispatch = useAppDispatch();
  const ingredientsList = useAppSelector(selectIngredients);
  useEffect(() => {
    dispatch(fetchIngredientsPopular()).then(() =>
      console.log(ingredientsList)
    );
  });
  return (
    <>
      <div className="px-10 w-[90%]  mx-auto drop-shadow-lg pb-20">
        <h3 className="font-medium text-left leading-tight text-3xl mt-0 mb-2 text-red-600 pt-10">
          Ingredients
        </h3>
        <div className="grid lg:grid-cols-2 lg:gap-4">
          {ingredientsList &&
            ingredientsList.map((ingredient) => {
              return (
                <Fragment key={ingredient._id}>
                  {/* <p className="break-words">{JSON.stringify(ingredient)}</p> */}
                  <div className="max-w-full sm:max-w-full md:max-w-full w-full lg:max-w-full lg:flex pt-5">
                    <div
                      className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
                      // style="background-image: url('/img/card-left.jpg')"
                      style={{
                        backgroundImage: `url(${ingredient.uploadedIngredientImage})`,
                      }}
                      title={ingredient.name}
                    >
                      {/* <img src={ingredient.uploadedRecipeImageFileName}></img> */}
                    </div>
                    <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex md:flex-col justify-between leading-normal lg:w-[300px] flex-row">
                      <div className="mb-2">
                        <div className="text-sm text-gray-600 flex items-center">
                          {ingredient.category === "Veg" ? (
                            <p className="text-green-500">Veg</p>
                          ) : (
                            <p className="text-red-600">Non-Veg</p>
                          )}
                        </div>
                        <div className="text-gray-900 font-bold text-xl">
                          {ingredient.name}
                        </div>
                        <p className="text-gray-700 text-base">
                          {ingredient.ingredientText}
                        </p>
                      </div>
                      <div>
                        <span className="text-blue-500">Filtered + </span>
                        <span>{ingredient.filter_plus}</span>
                      </div>
                      <div>
                        <span className="text-red-500">Filtered - </span>
                        <span>{ingredient.filter_minus}</span>
                      </div>
                      <div>
                        <span className="text-yellow-500">PI </span>
                        <span>{ingredient.popularity}</span>
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default IngredientsView;
