import { RootState } from "./index";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { VerifyJWT, AdminLogin } from "../services/userService";

interface IAdminState {
  jwtToken: string;
  user: Object;
  response: Boolean;
}

import FormData from "form-data";
export const loginAdminThunk = createAsyncThunk(
  "admin/loginAdminThunk",
  async (newData: any, { rejectWithValue }) => {
    try {
      var res;
      res = await AdminLogin(newData);
      return res.data;
    } catch (err: any) {
      return rejectWithValue("");
    }
  }
);

// export const verifyAdminJWTThunk = createAsyncThunk(
//   "admin/verifyAdminJWTThunk",
//   async (jwtToken: string, { rejectWithValue }) => {
//     try {
//       var res;
//       res = await VerifyJWT(jwtToken);
//       return res.data;
//     } catch (err: any) {
//       return rejectWithValue("");
//     }
//   }
// );

const initialState = {
  jwtToken: "",
  user: {},
  response: false,
} as IAdminState;

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearJWTToken: (state, action) => {
      state.jwtToken = "";
      sessionStorage.removeItem("jwtToken");
    },
    clearUser: (state, action) => {
      state.user = {};
      sessionStorage.removeItem("user");
    },
    signOut: (state, action) => {
        state.user = {};
        state.jwtToken = "";
        sessionStorage.removeItem("jwtToken");
        sessionStorage.removeItem("user");
      },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IAdminState>) => {
    builder
      .addCase(loginAdminThunk.fulfilled, (state, action) => {
        console.log(action.payload);
        state.jwtToken = action.payload.token;
        state.user = action.payload.user;
        state.response = action.payload.response;
        console.log(action.payload.user)
        sessionStorage.setItem("jwtToken", action.payload.token);
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
        // alert(JSON.stringify(state.eventFound));
      })
    //   .addCase(loginAdminThunk.pending, (state, action) => {
    //     state.loading = "pending";
    //     // console.log(state.eventFound);
    //   })
    //   .addCase(fetchEvent.rejected, (state, action) => {
    //     state.loading = "rejected";
    //   })

    //   .addCase(verifyAdminJWTThunk.fulfilled, (state, action) => {
    //     state.events = action.payload.events;
    //     state.eventsCount = action.payload.events.length;
    //   })
    //   .addCase(submitEventThunk.rejected, (state, action) => {
    //     throw new Error("add unsuccessful");
    //   });
  },
});

export const { clearJWTToken, clearUser, signOut } = adminSlice.actions;

export const selectJWTToken = (state: RootState) => state.admin.jwtToken;
export const selectUser = (state: RootState) => state.admin.user;
export const selectResponse = (state: RootState) => state.admin.response;

//default export

export default adminSlice.reducer;
