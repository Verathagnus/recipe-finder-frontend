import { RootState } from "./../index";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  deleteResume,
  getAllResumeList,
  getResumeById,
  uploadResume,
} from "../../../routes/Career/server";

interface CareerTypeGet {
  fName: string;
  lName: string;
  email: string;
  mobile: string;
  position: string;
  city: string;
  resume: string;
  uploadedResumeFileName: string;
}
interface CareerTypePost {
  fName: string;
  lName: string;
  email: string;
  mobile: string;
  position: string;
  city: string;
  resume: string;
  uploadedResume: File;
}

interface IState {
  resumes: CareerTypeGet[];
  loading: string;
  resumeFound: CareerTypeGet | {};
  resumesCount: number;
}

export const fetchResumes = createAsyncThunk(
  "career/fetchResumes",
  async () => {
    const res = await getAllResumeList();
    return res.data;
  }
);

//   export const fetchResumesWithPagination = createAsyncThunk(
//     "career/fetchResumesPagination",
//     async (pageDetails: PageDetails) => {
//       const { page, limit } = pageDetails;
//       const res = await getResumesPagination(page, limit);
//       return res.data;
//     }
//   );

export const fetchResume = createAsyncThunk(
  "career/fetchResume",
  async (id: string) => {
    const res = await getResumeById(id);
    return res.data;
  }
);

export const deleteResumeThunk = createAsyncThunk(
  "career/deleteResumeThunk",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteResume(id);
      return res.data;
    } catch (err) {
      return rejectWithValue("");
    }
  }
);
import FormData from "form-data";
export const submitResumeThunk = createAsyncThunk(
  "career/submitResumeThunk",
  async (resume: FormData, { rejectWithValue }) => {
    try {
      const res = await uploadResume(resume);
      return res.data;
    } catch (err: any) {
      return rejectWithValue("");
    }
  }
);

const initialState = {
  resumes: [],
  loading: "idle",
  resumeFound: {},
  resumesCount: 0,
} as IState;

const resumeSlice = createSlice({
  name: "career",
  initialState,
  reducers: {
    clearResumeFound: (state, action) => {
      state.resumeFound = {};
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IState>) => {
    builder
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.resumes = action.payload.resumes;
        state.resumesCount = action.payload.resumes.length;
        state.loading = "succeeded";
      })
      .addCase(fetchResumes.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(fetchResume.fulfilled, (state, action) => {
        console.log(action.payload);
        state.resumeFound = action.payload;
        // alert(JSON.stringify(state.resumeFound));
      })
      .addCase(fetchResume.pending, (state, action) => {
        state.loading = "pending";
        // console.log(state.resumeFound);
      })
      .addCase(fetchResume.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(deleteResumeThunk.fulfilled, (state, action) => {
        state.resumes = action.payload.resumes;
      })
      .addCase(deleteResumeThunk.rejected, (state, action) => {
        alert("deletion unsuccessful");
      })

      .addCase(submitResumeThunk.fulfilled, (state, action) => {
        // state.resumes = action.payload.resumes;
        // state.resumesCount = action.payload.resumes.length;
      })
      .addCase(submitResumeThunk.rejected, (state, action) => {
        throw new Error("add unsuccessful");
      });
  },
});

export const { clearResumeFound } = resumeSlice.actions;

export const selectResumes = (state: RootState) => state.career.resumes;
export const selectLoading = (state: RootState) => state.career.loading;
export const selectResume = (state: RootState) => state.career.resumeFound;
export const selectResumeCount = (state: RootState) =>
  state.career.resumesCount;

//default export

export default resumeSlice.reducer;
