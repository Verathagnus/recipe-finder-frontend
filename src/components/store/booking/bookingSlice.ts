import { RootState } from "./../index";

import { IDeleteType,IDeleteTypeValue,IGetBookingDimension,INewType,IPostBookignDimension,IUpdateTypeName,IUpdateTypeValue }  from '../../../types/types'

import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
 getAllBookingType,
 addNewCategory,
 addNewTypeValue,
 deleteType,
 deleteTypeValue,
 updateTypeName,
 updateTypeValue,
 postbookingDimension,
 getBookingDimension
} from "../../../routes/Booking/service";

interface BookingTypeGet {
  category : string ,
  types : {
    [key: string]: Array<string>;
  },
}

interface IState {
  bookingTypes: BookingTypeGet[];
  loading: string;
  currentDimensionsURL: string;
}

export const fetchBookingTypes = createAsyncThunk(
  "booking/fetchBookingTypes",
  async () => {
    const res = await getAllBookingType();
    // console.log(res.data);/
    return res.data;
  }
);

export const addNewCategory_ = createAsyncThunk(
  "booking/addNewCategory",
  async (data)=>{
    const res = await addNewCategory(data);
    return res.data;
  }
)


export const addNewTypeValue_ = createAsyncThunk(
  "booking/addNewTypeValue",
  async (data : INewType)=>{
    const res = await addNewTypeValue(data);
    return res.data;
  }
)


export const updateTypeName_ = createAsyncThunk(
  "booking/updateTypeName",
  async (data : IUpdateTypeName)=>{
    const res = await updateTypeName(data);
    return res.data;
  }
)

export const updateTypeValue_ = createAsyncThunk(
  "booking/updateTypeValue",
  async (data : IUpdateTypeValue)=>{
    const res = await updateTypeValue(data);
    return res.data;
  }
)

export const deleteType_  = createAsyncThunk(
  "booking/deleteType",
  async (data : IDeleteType)=>{
    const res = await deleteType(data);
    return res.data;   
});

export const deleteTypeValue_ = createAsyncThunk(
  "booking/deleteTypeValue",
  async (data : IDeleteTypeValue)=>{
    const res = await deleteTypeValue(data);
    return res.data; 
});

export const fetchBookingDimension_ = createAsyncThunk(
  "booking/fetchBookingDimension",
  async (data:IGetBookingDimension,{rejectWithValue})=>{
    try{
      const res = await getBookingDimension(data);
      // console.log(res.data)
      return res.data; 
    }
    catch(err){
      return rejectWithValue((err as Error).message)
    }

});



const initialState = {
  bookingTypes: [],
  loading: "idle",
  currentDimensionsURL: ''
} as IState;

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
  },
  extraReducers: (builder: ActionReducerMapBuilder<IState>) => {
    builder
      .addCase(fetchBookingTypes.fulfilled, (state, action) => {
        state.bookingTypes = action.payload;
        // console.log('action payload');
        // console.log(action.payload);
        state.loading = "succeeded";
      })
      .addCase(fetchBookingTypes.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(fetchBookingTypes.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(addNewCategory_.fulfilled, (state, action) => {
        state.bookingTypes = action.payload;
        state.loading = "succeeded";
      })
      .addCase(addNewCategory_.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(addNewCategory_.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(addNewTypeValue_.fulfilled, (state, action) => {
        state.bookingTypes = action.payload;
        state.loading = "succeeded";
      })
      .addCase(addNewTypeValue_.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(addNewTypeValue_.rejected, (state, action) => {
        state.loading = "rejected";
      })

      .addCase(updateTypeName_.fulfilled, (state, action) => {
        state.bookingTypes = action.payload;
        state.loading = "succeeded";
      })
      .addCase(updateTypeName_.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(updateTypeName_.rejected, (state, action) => {
        state.loading = "rejected";
      })
      
      .addCase(deleteType_.fulfilled, (state, action) => {
        state.bookingTypes = action.payload;
        state.loading = "succeeded";
      })
      .addCase(deleteType_.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(deleteType_.rejected, (state, action) => {
        state.loading = "rejected";
      })

      .addCase(deleteTypeValue_.fulfilled, (state, action) => {
        state.bookingTypes = action.payload;
        state.loading = "succeeded";
      })
      .addCase(deleteTypeValue_.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(deleteTypeValue_.rejected, (state, action) => {
        state.loading = "rejected";
      }) 
      .addCase(fetchBookingDimension_.fulfilled, (state, action) => {
        state.currentDimensionsURL = action.payload.public_url;
        state.loading = "succeeded";
      })
      .addCase(fetchBookingDimension_.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(fetchBookingDimension_.rejected, (state, action) => {
        state.loading = "rejected";
      }) 
  },
});



export const selectBookingTypes = (state: RootState) => state.booking.bookingTypes;
export const selectLoading = (state: RootState) => state.booking.loading;
export const selectCurrentDimensionURL = (state: RootState) => state.booking.currentDimensionsURL;
//default export

export default bookingSlice.reducer;
