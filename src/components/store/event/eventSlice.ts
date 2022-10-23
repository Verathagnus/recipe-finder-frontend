import { RootState } from "./../index";
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import {
  deleteEvent,
  getAllEventList,
  getEventById,
  uploadEventWithAttachment,
  uploadEventWithoutAttachment,
} from "../../../routes/Events/server";
interface EventType {
  title: string;
  date: Date;
  summary: string;
  description: string;
  attachmentFlag: boolean;
  attachmentfileName: string;
}

interface IEventState {
  events: EventType[];
  loading: string;
  eventFound: EventType | {};
  eventsCount: number;
}

export const fetchEvents = createAsyncThunk("event/fetchEvents", async () => {
  const res = await getAllEventList();
  return res.data;
});

//   export const fetchEventsWithPagination = createAsyncThunk(
//     "event/fetchEventsPagination",
//     async (pageDetails: PageDetails) => {
//       const { page, limit } = pageDetails;
//       const res = await getEventsPagination(page, limit);
//       return res.data;
//     }
//   );

export const fetchEvent = createAsyncThunk(
  "event/fetchEvent",
  async (id: string) => {
    const res = await getEventById(id);
    return res.data;
  }
);

export const deleteEventThunk = createAsyncThunk(
  "event/deleteEventThunk",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await deleteEvent(id);
      return res.data;
    } catch (err) {
      return rejectWithValue("");
    }
  }
);
import FormData from "form-data";
export const submitEventThunk = createAsyncThunk(
  "event/submitEventThunk",
  async ({newData, attachmentFlag}: any
  , {rejectWithValue}) => {
    try {
      var res;
      if (attachmentFlag) {
        res = await uploadEventWithAttachment(newData);
      }
      else{
        res = await uploadEventWithoutAttachment(newData);
      }
      return res.data;
    } catch (err: any) {
      return rejectWithValue("");
    }
  }
);

const initialState = {
  events: [],
  loading: "idle",
  eventFound: {},
  eventsCount: 0,
} as IEventState;

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clearEventFound: (state, action) => {
      state.eventFound = {};
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<IEventState>) => {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload.events;
        state.eventsCount = action.payload.events.length;
        state.loading = "succeeded";
      })
      .addCase(fetchEvents.pending, (state, action) => {
        state.loading = "pending";
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(fetchEvent.fulfilled, (state, action) => {
        console.log(action.payload);
        state.eventFound = action.payload;
        // alert(JSON.stringify(state.eventFound));
      })
      .addCase(fetchEvent.pending, (state, action) => {
        state.loading = "pending";
        // console.log(state.eventFound);
      })
      .addCase(fetchEvent.rejected, (state, action) => {
        state.loading = "rejected";
      })
      .addCase(deleteEventThunk.fulfilled, (state, action) => {
        console.log(action.payload)
        state.events = action.payload.events;
      })
      .addCase(deleteEventThunk.rejected, (state, action) => {
        alert("deletion unsuccessful");
      })

      .addCase(submitEventThunk.fulfilled, (state, action) => {
        state.events = action.payload.events;
        state.eventsCount = action.payload.events.length;
      })
      .addCase(submitEventThunk.rejected, (state, action) => {
        throw new Error("add unsuccessful");
      });
  },
});

export const { clearEventFound } = eventSlice.actions;

export const selectEvents = (state: RootState) => state.event.events;
export const selectLoading = (state: RootState) => state.event.loading;
export const selectEvent = (state: RootState) => state.event.eventFound;
export const selectEventCount = (state: RootState) => state.event.eventsCount;

//default export

export default eventSlice.reducer;
