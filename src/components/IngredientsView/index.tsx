import React, { useEffect } from "react";
import { getRecipesListAlphabetical } from "../../services/recipeService";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchIngredientsPopular,
  selectIngredients,
} from "../../store/ingredient/ingredientSlice";
const IngredientsView = () => {
  const dispatch = useAppDispatch();
  const ingredientsList = useAppSelector(selectIngredients);
  useEffect(() => {
    dispatch(fetchIngredientsPopular()).then(() => console.log(ingredientsList));
  });
  return (
    <>
      <div className="px-10 w-[90%]  text-center mx-auto drop-shadow-lg pb-20">
        <h3 className="font-medium text-left leading-tight text-3xl mt-0 mb-2 text-red-600 pb-5 pt-10">
        IngredientsView
        </h3>
      {ingredientsList && ingredientsList.map((ingredient) => {
        return (
          <>
          <p className="break-words">{JSON.stringify(ingredient)}</p>
          </>
        )
      })}
      </div>
    </>
  );
};

export default IngredientsView;

