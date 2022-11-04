import React, { Fragment, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { IngredientGetBasicType } from "../../types/types";
import {
  fetchIngredientsPopular,
  selectIngredients,
  selectLoading,
} from "../../store/ingredient/ingredientSlice";
import { useNavigate } from "react-router-dom";

const IngredientsView = () => {
  const dispatch = useAppDispatch();
  const ingredientsList = useAppSelector(selectIngredients);
  const loadingState = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchIngredientsPopular()).then(() =>
      console.log(ingredientsList)
    );
  }, []);
  const navigate = useNavigate();
  const ingredientModalHandler = (id: string) => {
    // TODO: ingredient modal
    console.log("Modal Open: Ingredient: ", id);
    navigate("/ingredients/" + id);
  };
  //  className="
  // dark:bg-gray-800"
  const [searchNameFilter, setSearchNameFilter] = useState("");
  const [searchCategoryFilter, setSearchCategoryFilter] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState(ingredientsList);
  
  useEffect(() => {
    console.log("searchNameFilter", searchNameFilter);
    console.log("searchCategoryFilter", searchCategoryFilter);
    console.log(ingredientsList.filter((ingredient) => {
      return ingredient.category === searchCategoryFilter && ingredient.name.toLocaleLowerCase().includes(searchNameFilter.toLocaleLowerCase());
    }))
    setFilteredIngredients(ingredientsList.filter((ingredient) => {
      return (searchCategoryFilter === "" || ingredient.category === searchCategoryFilter) && ingredient.name.toLocaleLowerCase().includes(searchNameFilter.toLocaleLowerCase());
    }));

  }, [ingredientsList, searchNameFilter, searchCategoryFilter]);
  return (
    <div>
      <div className="px-10 w-[90%]  mx-auto drop-shadow-lg pb-20 ">
        <h3 className="font-medium text-left leading-tight text-3xl mt-0 mb-2 text-red-600 pt-10">
          Ingredients
        </h3>
        <div className="bg-white lg:bg-transparent rounded-md border lg:border-none drop-shadow">
          <div className="sm:max-w-sm p-4 grid sm:grid-flow-col grid-flow-row gap-2">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search"
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600 focus:text-gray-700"
                onChange={(e) => {
                  setSearchNameFilter(e.target.value);
                }}
              />
            </div>
            <div>
              <label className="flex gap-x-2 items-baseline w-auto">
                <select
                  className="form-select appearance-none
        block
        w-full
        px-2
        py-3
        text-base
        text-left
        font-normal
        text-gray-400
         bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
       bg-gray-50 focus:outline-none   pr-10 outline-none   focus:border-indigo-600 focus:text-gray-700"
                  onChange={(e) => {
                    setSearchCategoryFilter(e.target.value);
                  }}
                >
                  <option value="" className="text-blue-400  bg-blue-100">
                    All
                  </option>
                  <option value="Non-Veg" className="text-red-400  bg-red-100">
                    Non-Veg
                  </option>
                  <option value="Veg" className="text-teal-400 bg-teal-100">
                    Veg
                  </option>
                </select>
              </label>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          {loadingState === "pending" &&
            Array(4)
              .fill({})
              .map((ingredient, idx) => {
                return (
                  <Fragment key={idx}>
                    {/* <p className="break-words">{JSON.stringify(ingredient)}</p> */}
                    <div className="bg-white h-full lg:h-52 rounded shadow-lg flex flex-col lg:flex-row gap-5 select-none border max-w-full w-full lg:max-w-[492px] lg:flex border-red-500">
                      <div className="flex justify-center items-center w-full min-h-[200px] bg-gray-200 lg:rounded-l lg:w-[200px] dark:bg-gray-400 border-r border-r-yellow-300 animate-pulse">
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
                      <div className="flex lg:flex-col lg:flex-1 gap-5 pl-5 pb-5 lg:p-2 my-auto justify-center ">
                        <div className="flex flex-1 flex-col gap-4">
                          <div className="bg-green-200 w-10 animate-pulse h-5 rounded-xl"></div>
                          <div className="bg-gray-200 w-20 animate-pulse h-8 rounded-xl"></div>
                          <span className="hidden md:flex flex-1 flex-col gap-4">
                            <div className="bg-blue-200 w-40 animate-pulse h-3 rounded-xl"></div>
                            <div className="bg-red-200 w-40 animate-pulse h-3 rounded-xl"></div>
                            <div className="bg-yellow-200 w-40 animate-pulse h-3 rounded-xl"></div>
                          </span>
                        </div>
                        <span className="flex md:hidden flex-1 flex-col gap-4">
                          <div className="bg-blue-200 w-20 animate-pulse h-3 rounded-xl"></div>
                          <div className="bg-red-200 w-20 animate-pulse h-3 rounded-xl"></div>
                          <div className="bg-yellow-200 w-20 animate-pulse h-3 rounded-xl"></div>
                        </span>
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
        {loadingState === "succeeded" && filteredIngredients.length === 0 && (
          <p>No ingredients present</p>
        )}
        <div className="grid lg:grid-cols-2 lg:gap-4">
          {filteredIngredients &&
            filteredIngredients.map((ingredient) => {
              return (
                <Fragment key={ingredient._id}>
                  {/* <p className="break-words">{JSON.stringify(ingredient)}</p> */}
                  <div className="max-w-full sm:max-w-full md:max-w-full w-full lg:max-w-full lg:flex pt-5 ">
                    <div
                      className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none text-center overflow-hidden cursor-pointer border-t border-l border-r  border-red-400 lg:border-r-0 lg:border-l  lg:border-t lg:border-red-400 hover:bg-red-200  lg:border-b lg:rounded-r-0 lg:rounded-tl lg:rounded-bl"
                      onClick={() => {
                        ingredientModalHandler(ingredient._id);
                      }}
                      // style="background-image: url('/img/card-left.jpg')"
                      style={
                        ingredient.attachmentFlag
                          ? {
                              backgroundImage: `url(${ingredient.uploadedIngredientImage})`,
                            }
                          : {
                              backgroundImage: `url(https://res.cloudinary.com/dxgfvidct/image/upload/v1666940089/empty-ingredients_myiljy.jpg)`,
                            }
                      }
                      title={ingredient.name}
                    >
                      {/* <img src={ingredient.uploadedRecipeImageFileName}></img> */}
                    </div>
                    <div
                      className=" bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex md:flex-col justify-between leading-normal lg:w-[300px] flex-row border-r border-b border-t border-l border-red-400 border-t-yellow-400 lg:border-t lg:border-red-400 
                   
                    hover:bg-red-200 lg:border-l-yellow-400"
                    >
                      <div
                        className="mb-2 cursor-pointer"
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
                      // className="hidden md:block"
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
                </Fragment>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default IngredientsView;
