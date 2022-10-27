import { RootState } from "./../index";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  getIngredientsListAlphabetical,
  getIngredientsListPopular,
  getIngredient,
  createIngredient,
  updateIngredient,
  deleteIngredient,
} from "../../services/ingredientService";
import FormData from "form-data";
import { IIngredientState } from "../../types/types";



export const fetchIngredientsPopular = createAsyncThunk(
  "ingredient/fetchIngredientsPopular",
  async () => {
    const res = await getIngredientsListPopular();
    return res.data;
  }
);

export const fetchIngredientsAlphabetical = createAsyncThunk(
  "ingredient/fetchIngredientsAlphabetical",
  async () => {
    const res = await getIngredientsListAlphabetical();
    return res.data;
  }
);

export const fetchIngredient = createAsyncThunk(
  "ingredient/fetchIngredient",
  async (id: string) => {
    const res = await getIngredient(id);
    return res.data;
  }
);

export const deleteIngredientThunk = createAsyncThunk(
  "ingredient/deleteIngredientThunk",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteIngredient(id);
      return res.data;
    } catch (err) {
      return rejectWithValue("");
    }
  }
);

export const submitIngredientThunk = createAsyncThunk(
  "ingredient/submitIngredientThunk",
  async (newData: FormData, { rejectWithValue }) => {
    try {
      var res;
      res = await createIngredient(newData);
      return res.data;
    } catch (err) {
      return rejectWithValue("");
    }
  }
);

export const updateIngredientThunk = createAsyncThunk(
  "ingredient/updateIngredientThunk",
  async (newData: FormData, { rejectWithValue }) => {
    try {
      var res;
      res = await updateIngredient(newData);
      return res.data;
    } catch (err) {
      return rejectWithValue("");
    }
  }
);

const initialState = {
  ingredients: [],
  loading: "idle",
  ingredientFound: {},
  ingredientsCount: 0,
} as IIngredientState;

const ingredientSlice = createSlice({
  name: "ingredient",
  initialState,
  reducers: {
    clearIngredientFound: (state, action) => {
      state.ingredientFound = {};
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IIngredientState>) => {
    builder
      .addCase(fetchIngredientsPopular.fulfilled, (state, action) => {
        state.ingredients = action.payload.ingredients;
        state.ingredientsCount = action.payload.ingredients.length;
        state.loading = "succeeded";
      })
      .addCase(fetchIngredientsPopular.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(fetchIngredientsPopular.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(fetchIngredientsAlphabetical.fulfilled, (state, action) => {
        state.ingredients = action.payload.ingredients;
        state.ingredientsCount = action.payload.ingredients.length;
        state.loading = "succeeded";
      })
      .addCase(fetchIngredientsAlphabetical.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(fetchIngredientsAlphabetical.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(fetchIngredient.fulfilled, (state, action) => {
        console.log(action.payload);
        state.ingredientFound = action.payload.ingredient;
        // alert(JSON.stringify(state.ingredientFound));
      })
      .addCase(fetchIngredient.pending, (state, action) => {
        state.loading = "pending";
        // console.log(state.ingredientFound);
      })
      .addCase(fetchIngredient.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(deleteIngredientThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.ingredients = action.payload.ingredients;
      })
      .addCase(deleteIngredientThunk.rejected, (state, action) => {
        alert("deletion unsuccessful");
      })

      .addCase(submitIngredientThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload.ingredients;
        state.ingredientsCount = action.payload.ingredients.length;
      })
      .addCase(submitIngredientThunk.rejected, (state, action) => {
        throw new Error("add unsuccessful");
      })
      .addCase(updateIngredientThunk.fulfilled, (state, action) => {
        state.ingredients = action.payload.ingredients;
        state.ingredientsCount = action.payload.ingredients.length;
      })
      .addCase(updateIngredientThunk.rejected, (state, action) => {
        throw new Error("add unsuccessful");
      });
  },
});

export const { clearIngredientFound } = ingredientSlice.actions;

export const selectIngredients = (state: RootState) =>
  state.ingredient.ingredients;
export const selectLoading = (state: RootState) => state.ingredient.loading;
export const selectIngredient = (state: RootState) =>
  state.ingredient.ingredientFound;
export const selectIngredientCount = (state: RootState) =>
  state.ingredient.ingredientsCount;

//default export

export default ingredientSlice.reducer;
