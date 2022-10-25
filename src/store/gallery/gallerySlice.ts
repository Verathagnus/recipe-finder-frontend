import { RootState } from "../index";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  getImagesList,
  deleteImage,
} from "../../services/galleryService";

// interface GalleryType {
//   images: string;
// }

interface IState {
  imagesList: Array<any>;
  loading: string;
}

export const fetchImagesList = createAsyncThunk(
  "gallery/fetchImagesList",
  async () => {
    const res = await getImagesList();
    return res.data;
  }
);

//   export const fetchImagesListWithPagination = createAsyncThunk(
//     "gallery/fetchImagesListPagination",
//     async (pageDetails: PageDetails) => {
//       const { page, limit } = pageDetails;
//       const res = await getResumesPagination(page, limit);
//       return res.data;
//     }
//   );

export const deleteImageThunk = createAsyncThunk(
  "gallery/deleteImageThunk",
  async (imagePublicId: string, { rejectWithValue }) => {
    try {
      const res = await deleteImage(imagePublicId);
      return res.data;
    } catch (err) {
      return rejectWithValue("");
    }
  }
);

// export const submitImageThunk = createAsyncThunk(
//   "gallery/submitImageThunk",
//   async (imageForm: FormData, { rejectWithValue }) => {
//     try {
//       const res = await uploadImage(imageForm);
//       return res.data;
//     } catch (err: any) {
//       return rejectWithValue("");
//     }
//   }
// );

const initialState = {
  imagesList: [],
  loading: "idle"
} as IState;

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
  },
  extraReducers: (builder: ActionReducerMapBuilder<IState>) => {
    builder
      .addCase(fetchImagesList.fulfilled, (state, action) => {
        console.log(action.payload)
        state.imagesList = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchImagesList.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(fetchImagesList.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(deleteImageThunk.fulfilled, (state, action) => {
        state.imagesList = action.payload;
      })
      .addCase(deleteImageThunk.rejected, (state, action) => {
        alert("deletion unsuccessful");
      })
  },
});

export const selectImagesList = (state: RootState) => state.gallery.imagesList;
export const selectLoading = (state:RootState) => state.gallery.loading;
//default export

export default gallerySlice.reducer;
