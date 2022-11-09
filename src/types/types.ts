export interface IngredientGetBasicType {
  _id: string;
  name: string;
  category: string;
  ingredientText: string;
  attachmentFlag: boolean;
  uploadedIngredientImage: string;
  uploadedIngredientImagePublicId: string;
}

export interface IngredientNewPostType {
  name: string;
  category: string;
  ingredientText: string;
  attachmentFlag: boolean;
  uploadedIngredientImage: string;
  uploadedIngredientImagePublicId: string;
}

export interface IngredientModifyPostType {
  _id: string;
  name: string;
  category: string;
  ingredientText: string;
  attachmentFlag: boolean;
  uploadedIngredientImage: string;
  uploadedIngredientImagePublicId: string;
}

export interface IngredientGetType {
  _id: string;
  name: string;
  category: string;
  ingredientText: string;
  attachmentFlag: boolean;
  uploadedIngredientImage: string;
  uploadedIngredientImagePublicId: string;
  filter_plus: number;
  filter_minus: number;
  popularity: number;
}

export interface IIngredientState {
  ingredients: IngredientGetType[];
  loading: string;
  ingredientFound: IngredientGetType;
  ingredientsCount: number;
  editIngredientId: string;
}

export interface IRecipeState {
  recipes: RecipeGetType[];
  loading: string;
  recipeFound: RecipeGetType;
  recipesCount: number;
  editRecipeId: string;
  recipeTextView: string;
  page: number;
  limit: number;
  count: { totalPages: number; currentPage: number; count: number };
}
export interface RecipeGetType {
  _id: string;
  name: string;
  timeToCook: string;
  ingredientsRequired: IngredientGetBasicType[];
  recipeText: string;
  uploadedRecipeImageFlag: boolean;
  uploadedRecipeImageFileName: string;
  uploadedRecipeImageFileNamePublicId: string;
  dateUploaded: Date | string;
  views: number;
}

export interface RecipeNewPostType {
  name: string;
  timeToCook: string;
  ingredientsRequired: string[];
  recipeText: string;
  uploadedRecipeImageFlag: boolean;
  uploadedRecipeImageFileName: string;
  uploadedRecipeImageFileNamePublicId: string;
}

export interface RecipeModifyPostType {
  _id: string;
  name: string;
  timeToCook: string;
  ingredientsRequired: string[];
  recipeText: string;
  uploadedRecipeImageFlag: boolean;
  uploadedRecipeImageFileName: string;
  uploadedRecipeImageFileNamePublicId: string;
}
