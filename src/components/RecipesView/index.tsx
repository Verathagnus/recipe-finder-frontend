import Multiselect from "multiselect-react-dropdown";
import React, { Fragment, useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getRecipesListAlphabetical } from "../../services/recipeService";
import { useAppDispatch, useAppSelector } from "../../store";
import "./recipeView.styles.css";
import {
  fetchIngredientsAlphabetical,
  selectIngredients,
} from "../../store/ingredient/ingredientSlice";
import {
  fetchRecipesAlphabetical,
  fetchRecipesPopular,
  filterForRecipeThunk,
  selectCount,
  selectLimit,
  selectLoading,
  selectPage,
  selectRecipes,
  setLimit,
  setPage,
} from "../../store/recipe/recipeSlice";
import { selectLoading as selectLoadingIngredient } from "../../store/ingredient/ingredientSlice";
import FormData from "form-data";

import { IngredientGetBasicType, RecipeGetType } from "../../types/types";
import InfiniteScroll from "react-infinite-scroll-component";
const RecipesView = () => {
  interface IngredientFilter {
    id: string;
    name: string;
    include: number;
    exclude: number;
  }
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectPage);
  const limit = useAppSelector(selectLimit);
  const count = useAppSelector(selectCount);

  function onlyUnique(value: any, index: number, self: any) {
    return self.map((i: any) => JSON.stringify(i)).indexOf(JSON.stringify(value)) === index;
  }

  useEffect(() => {
    dispatch(setLimit(Number.MAX_SAFE_INTEGER ));
    dispatch(setPage(1));
  }, []);
  const recipesList = useAppSelector(selectRecipes);
  const loadingState = useAppSelector(selectLoading);
  const ingredientsList = useAppSelector(selectIngredients);
  const loadingStateIngredient = useAppSelector(selectLoadingIngredient);
  const [includeIngredients, setIncludeIngredients] = useState<string[]>([]);
  const [excludeIngredients, setExcludeIngredients] = useState<string[]>([]);
  const [searchNameFilter, setSearchNameFilter] = useState("");
  const [searchCategoryFilter, setSearchCategoryFilter] = useState("");
  const [recipesListFull, setRecipesListFull] = useState<RecipeGetType[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState(recipesList);
  const navigate = useNavigate();
  const [loadedList, setLoadedList] = useState(true);
  const [ingredientFilters, setIngredientFilters] = useState<
    IngredientFilter[]
  >([{ id: "", name: "", include: 0, exclude: 0 }]);
  useEffect(() => {
    // dispatch(fetchRecipesAlphabetical({ page, limit })).then(() =>
    //   console.log(recipesList)
    // );
    // setRecipesListFull([]);
    // // filterForRecipeThunk()
    // navigate("/recipes")
  }, [limit]);
  useEffect(() => {
    let formData = new FormData();
    formData.append("inclusionFilters", includeIngredients);
    formData.append("exclusionFilters", excludeIngredients);
    dispatch(filterForRecipeThunk({ formData, page, limit: Number.MAX_SAFE_INTEGER }));

    dispatch(fetchIngredientsAlphabetical());
  }, []);

  useEffect(() => {
    // if(JSON.stringify(recipesListFull.map(recipe => recipe._id)) !== JSON.stringify(recipesListFull.map(recipe => recipe._id)))
    new Promise((res) => {
      setRecipesListFull([...recipesListFull, ...recipesList]);
      if (page === 1) {
        setRecipesListFull(recipesList);
      } else setRecipesListFull([...recipesListFull, ...recipesList]);
      res(true);
    }).then(() => {
      console.log("78 => ", recipesListFull, recipesList);
    });
  }, [recipesList]);
  // useEffect(() => {
  //   let formData = new FormData();
  //   formData.append("inclusionFilters", includeIngredients);
  //   formData.append("exclusionFilters", excludeIngredients);
  //   dispatch(filterForRecipeThunk({formData, page, limit}));
  // }, []);
  useEffect(() => {
    setIngredientFilters(
      ingredientsList.map((ingredient) => {
        return {
          id: ingredient._id,
          name: ingredient.name,
          include: 0,
          exclude: 0,
        };
      })
    );
  }, [ingredientsList]);

  // useEffect(() => {
  //   console.log(includeIngredients, excludeIngredients);
  //   //TODO: create exclusive options between include and exclude
  //   let formData = new FormData();
  //   formData.append("inclusionFilters", includeIngredients);
  //   formData.append("exclusionFilters", excludeIngredients);
  //   dispatch(setPage)
  //   dispatch(filterForRecipeThunk({formData, page, limit}));

  // }, [includeIngredients, excludeIngredients]);

  useEffect(() => {
    // console.log("searchNameFilter", searchNameFilter);
    // console.log("searchCategoryFilter", searchCategoryFilter);
    // setLoadedList(false);
    console.log(
      "113 =>",
      recipesListFull,
      recipesListFull
        .map((recipe) => {
          return {
            ...recipe,
            category: recipe.ingredientsRequired.reduce(
              (categoryPrev: string, ingredient: IngredientGetBasicType) => {
                if (ingredient.category === "Non-Veg") {
                  return "Non-Veg";
                }
                return categoryPrev;
              },
              "Veg"
            ),
          };
        })
        .filter((recipe) => {
          return (
            recipe.category === searchCategoryFilter &&
            (recipe.name
              .toLocaleLowerCase()
              .includes(searchNameFilter.toLocaleLowerCase()) ||
              recipe.recipeText
                .toLocaleLowerCase()
                .includes(searchNameFilter.toLocaleLowerCase()))
          );
        }).filter(onlyUnique)
    );
    setFilteredRecipes(
      recipesListFull
        .map((recipe) => {
          return {
            ...recipe,
            category: recipe.ingredientsRequired.reduce(
              (categoryPrev: string, ingredient: IngredientGetBasicType) => {
                if (ingredient.category === "Non-Veg") {
                  return "Non-Veg";
                }
                return categoryPrev;
              },
              "Veg"
            ),
          };
        })
        .filter((recipe) => {
          return (
            (searchCategoryFilter === "" ||
              recipe.category === searchCategoryFilter) &&
            recipe.name
              .toLocaleLowerCase()
              .includes(searchNameFilter.toLocaleLowerCase())
          );
        })
        .filter(onlyUnique)
    );
    // setTimeout(() => {
    //   setLoadedList(true);
    // }, 100);
  }, [recipesListFull, searchNameFilter, searchCategoryFilter]);
  // 0 0 => 1 0
  // 0 1 => 0 1
  // 1 0 => 0 1
  // 1 1 => 0 1
  const bitNOR = (a: number, b: number) => {
    return !(a > 0 || b > 0);
  };
  // console.log(
  //   "L175 => NOR",
  //   ingredientFilters.filter((ingredient) =>
  //     bitNOR(ingredient.exclude, ingredient.include)
  //   )
  // );
  const nextPage = () => {
    if (count.currentPage < count.totalPages) {
      let formData = new FormData();
      formData.append("inclusionFilters", includeIngredients);
      formData.append("exclusionFilters", excludeIngredients);
      new Promise((res) => {
        dispatch(setPage(page + 1));
        res(true);
      }).then(() =>
        dispatch(filterForRecipeThunk({ formData, page: page + 1, limit }))
      );
    }
  };

  const changeIngredientFilter = async (
    includeIngredientsList: string[] = includeIngredients,
    excludeIngredientsList: string[] = excludeIngredients
  ) => {
    console.log(includeIngredientsList, excludeIngredientsList);
    let formData = new FormData();
    formData.append("inclusionFilters", includeIngredientsList);
    formData.append("exclusionFilters", excludeIngredientsList);
    new Promise((res) => {
      setPage(1);
      res(true);
    }).then(() => {
      dispatch(filterForRecipeThunk({ formData, page: 1, limit }));
    })
  };

  const changeLimitPerPage = (val: number) => {
    dispatch(setLimit(val));
  };
  const recipeModalHandler = (id: string) => {
    // TODO: ingredient modal
    console.log("Modal Open: Recipe: ", id);
    navigate("/recipes/" + id);
  };

  const ingredientModalHandler = (id: string) => {
    // TODO: ingredient modal
    console.log("Modal Open: Ingredient: ", id);
    navigate("/ingredients/" + id);
  };
  const onIngredientSelectInclude = async (
    selectedList: Array<IngredientFilter>,
    selectedItem: IngredientFilter
  ) => {
    new Promise((resolve) => {
      setIncludeIngredients(selectedList.map((item) => item.id));

      resolve(1);
    })
      .then(() => {
        console.log(includeIngredients);
      })
      .then(() =>
        changeIngredientFilter(
          selectedList.map((item) => item.id),
          excludeIngredients
        )
      );
    setIngredientFilters(
      ingredientFilters.map((ingredient) => {
        if (ingredient.id === selectedItem.id)
          return {
            ...ingredient,
            include: 1,
          };
        return ingredient;
      })
    );
  };
  const onIngredientRemoveInclude = async (
    selectedList: Array<IngredientFilter>,
    selectedItem: IngredientFilter
  ) => {
    new Promise((resolve) => {
      setIncludeIngredients(selectedList.map((item) => item.id));
      resolve(1);
    })
      .then(() =>
        changeIngredientFilter(
          selectedList.map((item) => item.id),
          excludeIngredients
        )
      )
      .then(() => console.log("233"));
    setIngredientFilters(
      ingredientFilters.map((ingredient) => {
        if (ingredient.id === selectedItem.id)
          return {
            ...ingredient,
            include: 0,
          };
        return ingredient;
      })
    );
    console.log(includeIngredients, excludeIngredients);
  };

  const onIngredientSelectExclude = async (
    selectedList: Array<IngredientFilter>,
    selectedItem: IngredientFilter
  ) => {
    new Promise((resolve) => {
      setExcludeIngredients(selectedList.map((item) => item.id));
      resolve(1);
    }).then(() =>
      changeIngredientFilter(
        includeIngredients,
        selectedList.map((item) => item.id)
      )
    );

    setIngredientFilters(
      ingredientFilters.map((ingredient) => {
        if (ingredient.id === selectedItem.id)
          return {
            ...ingredient,
            exclude: 1,
          };
        return ingredient;
      })
    );
  };
  const onIngredientRemoveExclude = async (
    selectedList: Array<IngredientFilter>,
    selectedItem: IngredientFilter
  ) => {
    new Promise((resolve) => {
      setExcludeIngredients(selectedList.map((item) => item.id));
      resolve(1);
    }).then(() =>
      changeIngredientFilter(
        includeIngredients,
        selectedList.map((item) => item.id)
      )
    );
    console.log(selectedItem);
    setIngredientFilters(
      ingredientFilters.map((ingredient) => {
        if (ingredient.id === selectedItem.id)
          return {
            ...ingredient,
            exclude: 0,
          };
        return ingredient;
      })
    );
  };
  console.log(" 317 => ", count, recipesListFull.length, recipesList.length);
  return (
    <>
      <div className="px-10 w-[90%]  mx-auto drop-shadow-lg pb-20">
        <h3 className="font-medium text-left leading-tight text-3xl mt-0 mb-2 text-red-600 pt-10 ">
          Recipes
        </h3>
        <div className="bg-white lg:bg-transparent rounded-md border lg:border-none drop-shadow  lg:drop-shadow-none mb-5">
          <div className="p-4 lg:grid grid-cols-2 gap-4">
            <div className="sm:max-w-sm p-4 grid sm:grid-flow-col grid-flow-row gap-2 ">
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute top-3.5 w-6 h-6 my-auto text-gray-400 left-3"
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
                  className="w-full py-3 pl-12 pr-4 text-gray-500  rounded-md outline-none bg-gray-50 focus:bg-white border border-gray-300 focus:border-indigo-600 focus:text-gray-700 "
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
         border  border-gray-300
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
                    <option
                      value="Non-Veg"
                      className="text-red-400  bg-red-100"
                    >
                      Non-Veg
                    </option>
                    <option value="Veg" className="text-teal-400 bg-teal-100">
                      Veg
                    </option>
                  </select>
                </label>
              </div>
            </div>
            <div className="sm:max-w-sm p-4 grid sm:grid-flow-col grid-flow-row">
              {/* <div className="rounded-md text-red-600 w-[160px] flex align-middle justify-center items-center">
                <p className="">Filter by Ingredients</p>
              </div> */}
              <Multiselect
                className="px-2 py-1"
                id="includeSelect"
                options={ingredientFilters.filter((ingredient) =>
                  bitNOR(ingredient.include, ingredient.exclude)
                )}
                onSelect={(selectedList, selectedItem) => {
                  onIngredientSelectInclude(selectedList, selectedItem);
                }} // Function will trigger on select event
                onRemove={(selectedList, selectedItem) => {
                  onIngredientRemoveInclude(selectedList, selectedItem);
                }} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                style={{
                  chips: {
                    background: "teal",
                  },
                  multiselectContainer: {
                    color: "teal",
                  },
                  searchBox: {
                    border: "none",
                    borderBottom: "1px solid teal",
                    borderRadius: "0px",
                  },
                  optionContainer: {
                    // To change css for option container
                    border: "2px solid",
                    background: "white",
                    hover: "teal",
                  },
                }}
                placeholder="Include Ingredients"
              />
              <Multiselect
                className="px-2 py-1"
                id="excludeSelect"
                options={ingredientFilters.filter((ingredient) =>
                  bitNOR(ingredient.exclude, ingredient.include)
                )}
                style={{
                  chips: {
                    background: "red",
                    color: "white",
                  },
                  multiselectContainer: {
                    color: "red",
                  },
                  searchBox: {
                    border: "none",
                    borderBottom: "1px solid red",
                    borderRadius: "0px",
                  },
                  optionContainer: {
                    // To change css for option container
                    border: "2px solid",
                    background: "white",
                    hover: "red",
                  },
                }}
                placeholder="Exclude Ingredients"
                onSelect={(selectedList, selectedItem) =>
                  onIngredientSelectExclude(selectedList, selectedItem)
                } // Function will trigger on select event
                onRemove={(selectedList, selectedItem) =>
                  onIngredientRemoveExclude(selectedList, selectedItem)
                } // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
              />
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
        {loadingState === "succeeded" && filteredRecipes.length === 0 && (
          <p>No recipes present</p>
        )}
        {loadedList && (
          
            <div className="grid lg:grid-cols-2 gap-4 ">
              {filteredRecipes &&
                filteredRecipes.map((recipe) => {
                  return (
                    <div
                      className="rounded-md border border-red-400"
                      key={recipe._id}
                    >
                      {/* <p className="break-words">{JSON.stringify(recipe)}</p> */}
                      <div
                        className="max-w-full sm:max-w-full md:max-w-full w-full lg:max-w-full lg:flex bg-white  rounded-md hover:bg-red-200  
                  lg:min-h-full"
                      >
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
                            <p className="text-gray-700 text-base whitespace-pre-line break-all">
                              {recipe.recipeText.length > 50 ? (
                                <>
                                  {recipe.recipeText.slice(0, 50)}{" "}
                                  <span className="text-teal-400 hover:text-blue-400">
                                    ... Read More
                                  </span>
                                </>
                              ) : (
                                recipe.recipeText
                              )}
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
                                        ingredient.attachmentFlag &&
                                        ingredient.uploadedIngredientImage
                                          .length > 0
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
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          
        )}
      </div>
    </>
  );
};

export default RecipesView;
{/* <InfiniteScroll
            dataLength={filteredRecipes.length} //This is important field to render the next data
            next={nextPage}
            hasMore={
              count.totalPages === 1 || count.currentPage < count.totalPages
            }
            loader={loadingState !== "succeeded" && <h4>Loading...</h4>}
            endMessage={
              <div className="flex flex-col">
                <p
                  className="align-middle mt-10 flex justify-center gap-2"
                  style={{ textAlign: "center" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 my-auto text-slate-800 left-3"
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
                  <b>No more recipes</b>
                </p>
                <>
                  <button
                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      })
                    }
                    className="mt-3 px-6
                        py-2.5
                        bg-red-600
                        text-white
                        font-medium
                        text-xs
                        leading-tight
                        uppercase
                        rounded
                        shadow-md
                        hover:bg-red-800 hover:shadow-lg
                        focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-red-800 active:shadow-lg
                        transition
                        duration-150
                        ease-in-out
                        ml-auto mr-auto"
                  >
                    Search Again
                  </button>
                </>
              </div>
            }
            // below props only if you need pull down functionality
            refreshFunction={() => {
              navigate("/recipes");
            }}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                &#8595; Pull down to refresh
              </h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: "center" }}>
                &#8593; Release to refresh
              </h3>
            }
          >
          </InfiniteScroll> */}