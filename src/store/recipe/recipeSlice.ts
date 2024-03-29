import { RootState } from "./../index";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  getRecipesListAlphabetical,
  getRecipesListPopular,
  getRecipesListLatest,
  getRecipe,
  filterForRecipe,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../../services/recipeService";
import FormData from "form-data";
import { IRecipeState, RecipeGetType } from "../../types/types";

export const fetchRecipesPopular = createAsyncThunk(
  "recipe/fetchRecipesPopular",
  async ({page, limit}: {page: number, limit: number}) => {
    const res = await getRecipesListPopular(page, limit);
    return res.data;
  }
);

export const fetchRecipesLatest = createAsyncThunk(
  "recipe/fetchRecipesLatest",
  async () => {
    const res = await getRecipesListLatest();
    return res.data;
  }
);

export const fetchRecipesAlphabetical = createAsyncThunk(
  "recipe/fetchRecipesAlphabetical",
  async ({page, limit}: {page: number, limit: number}) => {
    const res = await getRecipesListAlphabetical(page, limit);
    return res.data;
  }
);

export const fetchRecipe = createAsyncThunk(
  "recipe/fetchRecipe",
  async (id: string) => {
    const res = await getRecipe(id);
    return res.data;
  }
);

export const deleteRecipeThunk = createAsyncThunk(
  "recipe/deleteRecipeThunk",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteRecipe(id);
      return res.data;
    } catch (err) {
      return rejectWithValue("");
    }
  }
);

export const submitRecipeThunk = createAsyncThunk(
  "recipe/submitRecipeThunk",
  async (newData: FormData, { rejectWithValue }) => {
    try {
      var res;
      res = await createRecipe(newData);
      return res.data;
    } catch (err) {
      return rejectWithValue("");
    }
  }
);

export const filterForRecipeThunk = createAsyncThunk(
  "recipe/filterForRecipeThunk",
  async ({formData, page, limit}: {formData: FormData, page: number, limit: number}, { rejectWithValue }) => {
    try {
      var res;
      res = await filterForRecipe(formData, page, limit);
      return res.data;
    } catch (err) {
      return rejectWithValue("");
    }
  }
);

export const updateRecipeThunk = createAsyncThunk(
  "recipe/updateRecipeThunk",
  async (newData: FormData, { rejectWithValue }) => {
    try {
      var res;
      res = await updateRecipe(newData);
      return res.data;
    } catch (err) {
      return rejectWithValue("");
    }
  }
);
const emptyRecipe: RecipeGetType = {
  _id: "",
  name: "",
  timeToCook: "",
  ingredientsRequired: [],
  recipeText: "",
  uploadedRecipeImageFlag: false,
  uploadedRecipeImageFileName: "",
  uploadedRecipeImageFileNamePublicId: "",
  dateUploaded: "",
  views: 0,
};
const initialState = {
  recipes: [],
  loading: "idle",
  recipeFound: emptyRecipe,
  recipesCount: 0,
  editRecipeId: "",
  recipeTextView: "",
  page: 1,
  limit: 10,
  count: {totalPages: 1,
  currentPage: 1, count: 0}
} as IRecipeState;

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    clearRecipeFound: (state, action) => {
      state.recipeFound = emptyRecipe;
    },
    setEditRecipeId: (state, action) => {
      state.editRecipeId = action.payload;
    },
    setRecipeTextView: (state, action) => {
      state.recipeTextView = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IRecipeState>) => {
    builder
      .addCase(fetchRecipesPopular.fulfilled, (state, action) => {
        state.recipes = action.payload.recipes;
        state.recipesCount = action.payload.recipes.length;
        state.loading = "succeeded";
      })
      .addCase(fetchRecipesPopular.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(fetchRecipesPopular.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(fetchRecipesAlphabetical.fulfilled, (state, action) => {
        state.recipes = action.payload.recipes;
        state.recipesCount = action.payload.count;
        state.loading = "succeeded";
        state.count = {totalPages: action.payload.totalPages, currentPage: action.payload.currentPage, count: action.payload.count}
      })
      .addCase(fetchRecipesAlphabetical.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(fetchRecipesAlphabetical.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(fetchRecipesLatest.fulfilled, (state, action) => {
        state.recipes = action.payload.recipes;
        state.recipesCount = action.payload.recipes.length;
        state.loading = "succeeded";
        state.count = {totalPages: action.payload.totalPages, currentPage: action.payload.currentPage, count: action.payload.count};
      })
      .addCase(fetchRecipesLatest.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(fetchRecipesLatest.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(filterForRecipeThunk.fulfilled, (state, action) => {
        state.recipes = action.payload.recipes;
        state.recipesCount = action.payload.recipes.length;
        state.loading = "succeeded";
        state.count = {totalPages: action.payload.totalPages, currentPage: action.payload.currentPage, count: action.payload.count};
      })
      .addCase(filterForRecipeThunk.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(filterForRecipeThunk.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(fetchRecipe.fulfilled, (state, action) => {
        console.log(action.payload);
        state.recipeFound = action.payload.recipe;
        state.loading = "succeededOne";
        // alert(JSON.stringify(state.recipeFound));
      })
      .addCase(fetchRecipe.pending, (state, action) => {
        state.loading = "pendingOne";
        // console.log(state.recipeFound);
      })
      .addCase(fetchRecipe.rejected, (state, action) => {
        state.loading = "rejectedOne";
      })
      .addCase(deleteRecipeThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.recipes = action.payload.recipes;
        state.count = {totalPages: action.payload.totalPages, currentPage: action.payload.currentPage, count: action.payload.count};
      })
      .addCase(deleteRecipeThunk.rejected, (state, action) => {
        alert("deletion unsuccessful");
      })
      .addCase(submitRecipeThunk.fulfilled, (state, action) => {
        state.recipes = action.payload.recipes;
        state.count = {totalPages: action.payload.totalPages, currentPage: action.payload.currentPage, count: action.payload.count}
      })
      .addCase(submitRecipeThunk.rejected, (state, action) => {
        throw new Error("add unsuccessful");
      })
      .addCase(updateRecipeThunk.fulfilled, (state, action) => {
        state.recipes = action.payload.recipes;
        state.recipesCount = action.payload.recipes.length;
        state.count = {totalPages: action.payload.totalPages, currentPage: action.payload.currentPage, count: action.payload.count}
      })
      .addCase(updateRecipeThunk.rejected, (state, action) => {
        throw new Error("add unsuccessful");
      });
  },
});

export const {
  clearRecipeFound,
  setEditRecipeId,
  setRecipeTextView,
  setPage,
  setLimit,
} = recipeSlice.actions;

export const selectRecipes = (state: RootState) => state.recipe.recipes;
export const selectLoading = (state: RootState) => state.recipe.loading;
export const selectRecipe = (state: RootState) => state.recipe.recipeFound;
export const selectCount = (state: RootState) =>
  state.recipe.count;
export const selectEditRecipeId = (state: RootState) =>
  state.recipe.editRecipeId;

export const selectRecipeTextView = (state: RootState) =>
  state.recipe.recipeTextView;

export const selectPage = (state: RootState) => state.recipe.page;

export const selectLimit = (state: RootState) => state.recipe.limit;

//default export
export default recipeSlice.reducer;
