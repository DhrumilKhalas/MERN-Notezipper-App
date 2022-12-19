import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"

export const STATUSES = Object.freeze({
    IDLE:"idle",
    LOADING:"loading",
    ERROR:"error"
})

const updateNoteSlice = createSlice({
    name:"update note",
    initialState:{
        status: STATUSES.IDLE,
        isError: null,
        success: false,
    },
    reducers:{
        updateNote(state) {
            return{
                ...state,
                success:true
            }
        },
        updateNoteError(state, action) {
            return{
                ...state,
                isError:action.payload
            }
        },
        setStatus(state, action) {
            return {
              ...state,
              status: action.payload, 
            };
          },
    }
})

export const {updateNote, updateNoteError, setStatus} = updateNoteSlice.actions
export default updateNoteSlice.reducer

export function fetchUpdateNote(id, title, content, category) {
    return async function fetchUpdateNoteThunk(dispatch, getState) {
      dispatch(setStatus(STATUSES.LOADING));
      try {
          const userToken = getState()?.user?.userInfo?.token;
          const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
            };
          const res = await axios.put(`/api/notes/${id}`, {
              title, content, category
          }, config)
          const data = await res.data
          dispatch(setStatus(STATUSES.IDLE));
          dispatch(updateNote(data));
          window.location.reload(false)
      } catch (err) { 
          console.log("UPDATE A NOTE ERROR: " + err.message);
          dispatch(setStatus(STATUSES.ERROR));
          dispatch(updateNoteError(err?.message));
      }
    };
  }
  