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
  async () => {
    const res = await getRecipesListPopular();
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
  async () => {
    const res = await getRecipesListAlphabetical();
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
  async (newData: FormData, { rejectWithValue }) => {
    try {
      var res;
      res = await filterForRecipe(newData);
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

const initialState = {
  recipes: [],
  loading: "idle",
  recipeFound: {},
  recipesCount: 0,
} as IRecipeState;

const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    clearRecipeFound: (state, action) => {
      state.recipeFound = {};
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
        state.recipesCount = action.payload.recipes.length;
        state.loading = "succeeded";
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
        // alert(JSON.stringify(state.recipeFound));
      })
      .addCase(fetchRecipe.pending, (state, action) => {
        state.loading = "pending";
        // console.log(state.recipeFound);
      })
      .addCase(fetchRecipe.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(deleteRecipeThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.recipes = action.payload.recipes;
      })
      .addCase(deleteRecipeThunk.rejected, (state, action) => {
        alert("deletion unsuccessful");
      })
      .addCase(submitRecipeThunk.fulfilled, (state, action) => {
        state.recipes = action.payload.recipes;
        state.recipesCount = action.payload.recipes.length;
      })
      .addCase(submitRecipeThunk.rejected, (state, action) => {
        throw new Error("add unsuccessful");
      })
      .addCase(updateRecipeThunk.fulfilled, (state, action) => {
        state.recipes = action.payload.recipes;
        state.recipesCount = action.payload.recipes.length;
      })
      .addCase(updateRecipeThunk.rejected, (state, action) => {
        throw new Error("add unsuccessful");
      });
  },
});

export const { clearRecipeFound } = recipeSlice.actions;

export const selectRecipes = (state: RootState) => state.recipe.recipes;
export const selectLoading = (state: RootState) => state.recipe.loading;
export const selectRecipe = (state: RootState) => state.recipe.recipeFound;
export const selectRecipeCount = (state: RootState) =>
  state.recipe.recipesCount;

//default export

export default recipeSlice.reducer;
