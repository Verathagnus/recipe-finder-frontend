import React, { Fragment, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { IngredientGetBasicType } from "../../types/types";
import {
  fetchIngredient,
  fetchIngredientsPopular,
  selectIngredient,
  selectIngredients,
  selectLoading,
} from "../../store/ingredient/ingredientSlice";
import { useParams } from "react-router-dom";

const IngredientView = () => {
  const dispatch = useAppDispatch();
  const ingredient = useAppSelector(selectIngredient);
  const loadingState = useAppSelector(selectLoading);
  const params = useParams();
  useEffect(() => {
    dispatch(fetchIngredient(params.id || "")).then(() =>
      console.log(ingredient)
    );
  }, []);
  const ingredientModalHandler = (id: string) => {
    // TODO: ingredient modal
    console.log("Modal Open: Ingredient: ", id);
  };
  //  className="
  // dark:bg-gray-800"
  return (
    <div>
      <div className="px-10 w-[90%]  mx-auto drop-shadow-lg pb-20 ">
        <h3 className="font-medium text-left leading-tight text-3xl mt-0 mb-2 text-red-600 pt-10">
          Ingredients
        </h3>
        <div className="max-w-full w-full   bg-white border rounded-md  max-h-full ">
          {
            loadingState === "pendingOne" &&
            Array(1)
              .fill({})
              .map((ingredient, idx) => {
                return (
                  <Fragment key={idx}>
                    {/* <p className="break-words">{JSON.stringify(ingredient)}</p> */}
                    <div
                      className="bg-white dark:bg-gray-100 shadow-lg  select-none border max-w-full w-full 
                      flex-none bg-cover text-center overflow-hidden grid grid-cols-1 lg:grid-cols-2 rounded-md border-red-400"
                    >
                      <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-400 animate-pulse h-[300px] w-full text-center overflow-hidden bg-cover rounded-l-md ">
                        <svg
                          className="w-12 h-12 text-gray-300"
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
                        rounded-b lg py-10 lg:p-4 leading-normal"
                      >
                        <div className="flex flex-1 flex-col gap-4 pl-5 lg:pt-10">
                          <div className="bg-green-200 w-10 animate-pulse h-5 rounded-xl"></div>
                          <div className="bg-gray-200 w-20 animate-pulse h-8 rounded-xl"></div>
                          <span className="flex flex-1 flex-col gap-4">
                            <div className="bg-blue-200 w-40 animate-pulse h-3 rounded-xl"></div>
                            <div className="bg-red-200 w-40 animate-pulse h-3 rounded-xl"></div>
                            <div className="bg-yellow-200 w-40 animate-pulse h-3 rounded-xl"></div>
                          </span>
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
        {loadingState === "succeededOne" && ingredient.name === "" && (
          <p>No ingredients present</p>
        )}
        <div className="max-w-full w-full   bg-white border rounded-md   max-h-full ">
          {ingredient && (
            <>
              {/* <p className="break-words">{JSON.stringify(ingredient)}</p> */}
              <div className="bg-white dark:bg-gray-100 shadow-lg  select-none border max-w-full w-full 
                      flex-none bg-cover  overflow-hidden grid grid-cols-1 lg:grid-cols-2 rounded-md border-red-400">
                <img
                  className="rounded-l-md"
                  onClick={() => {
                    ingredientModalHandler(ingredient._id);
                  }}
                  // style="background-image: url('/img/card-left.jpg')"
                  src={
                    ingredient.attachmentFlag  && ingredient.uploadedIngredientImage.length>0
                      ? ingredient.uploadedIngredientImage
                      : 'https://res.cloudinary.com/dxgfvidct/image/upload/v1666940089/empty-ingredients_myiljy.jpg'
                  }
                />
                <div
                  className="flex flex-col flex-1 gap-5   
                  rounded-b p-10 leading-normal"
                >
                  <div
                    onClick={() => {
                      ingredientModalHandler(ingredient._id);
                    }}
                  >
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
                  <div
                  className=""
                  >
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
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientView;
