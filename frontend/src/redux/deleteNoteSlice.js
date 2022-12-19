import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"

export const STATUSES = Object.freeze({
    IDLE:"idle",
    ERROR:"error",
    LOADING:"loading"
})

const deleteNoteSlice = createSlice({
    name:"delete note",
    initialState:{
        status: STATUSES.IDLE,
        isError: null,
        success: false,
    },
    reducers:{
        deleteNote(state){
            return{
                ...state,
                success:true
            }
        },
        deleteNoteError(state, action){
            return{
                ...state,
                isError: action.payload,
                success:false
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

export const {deleteNote, deleteNoteError, setStatus} = deleteNoteSlice.actions
export default deleteNoteSlice.reducer

export function fetchDeleteNote(id){
    return async function fetchDeleteNoteThunk(dispatch, getState){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const userToken = getState()?.user?.userInfo?.token;
            console.log(userToken); 
            const config = {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
            const res = await axios.delete(`/api/notes/${id}`, config)
            const data = await res.data
            dispatch(setStatus(STATUSES.IDLE)); 
            dispatch(deleteNote(data))
            window.location.reload(false)
            
        }catch(err){
            console.log("DELETE A NOTE ERROR: " + err);
          dispatch(setStatus(STATUSES.ERROR));
          dispatch(deleteNoteError(err?.message));
        }
    }
}