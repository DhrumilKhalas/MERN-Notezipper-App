import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const notesSlice = createSlice({
  name: "notesSlice",
  initialState: {
    status: STATUSES.IDLE,
    notes: [],
    isError: null,
    success: false,
  },
  reducers: {
    setGetAllNotes(state, action) {
      return {
        ...state,
        notes: action.payload,
        success: true,
      };
    },
    setGetAllNotesError(state, action) {
      return {
        ...state,
        isError: action.payload,
        success: false,
      };
    },
    createNote(state, action) {
      return {
        ...state,
        notes: [...state, action.payload],
        isError: null,
        success: true,
      };
    },
    createNoteError(state, action) {
      return {
        ...state,
        isError: action.payload,
        success: false,
      };
    },
    setStatus(state, action) {
      return {
        ...state,
        status: action.payload,
      };
    },
  },
});

export const {
  setGetAllNotes,
  setGetAllNotesError,
  createNote,
  createNoteError,
  updateNote,
  updateNoteError,
  setStatus,
} = notesSlice.actions;
export default notesSlice.reducer;

export function fetchGetAllNotes() {
  return async function fetchGetAllNotesThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const userToken = getState()?.user?.userInfo?.token;
      //  console.log("getState() token value: " + userToken)
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const res = await axios.get("/api/notes/", config);
      const data = await res.data;
      // console.log(data)
      dispatch(setStatus(STATUSES.IDLE));
      dispatch(setGetAllNotes(data));
    } catch (err) {
      console.log("GET ALL NOTES ERROR: " + err.message);
      // console.log(err?.response?.data?.message);
      dispatch(setStatus(STATUSES.ERROR));
      dispatch(setGetAllNotesError(err.message));
    }
  };
}

export function fetchCreateNote(title, content, category) {
  return async function fetchCreateNoteThunk(dispatch, getState) {
    dispatch(setStatus(STATUSES.LOADING)); 
    try {
      const userToken = getState()?.user?.userInfo?.token;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      };
      const res = await axios.post(
        "/api/notes/create",
        {
          title,
          content,
          category,
        },
        config
      );
      const data = await res?.data;
      dispatch(setStatus(STATUSES.IDLE));
      dispatch(createNote(data));
      window.location.reload(false);
    } catch (err) {
      console.log("CREATE A NOTE ERROR: " + err);
      dispatch(setStatus(STATUSES.ERROR));
      dispatch(createNoteError(err?.response?.data?.message));
    }
  };
}



