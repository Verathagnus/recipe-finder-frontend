import React from "react";
import IngredientsPopularView from "../../components/IngredientsPopularView";
import RecipesPopularView from "../../components/RecipesPopularViews";
import About from "../About";
import Gallery from "../Gallery";
const Home = () => {
  return (
    <div className="px-10  mx-auto drop-shadow-lg pb-20">
      <h3 className="font-medium text-left leading-tight text-3xl mt-0 mb-2 text-red-600 pt-10 ">
        Most Viewed Recipes
      </h3>
      <RecipesPopularView/>
      <h3 className="font-medium text-left leading-tight text-3xl mt-0 mb-2 text-red-600 pt-10 ">
      Most Popular Ingredients
      </h3>
      <IngredientsPopularView/>
    </div>
  );
};

export default Home;
