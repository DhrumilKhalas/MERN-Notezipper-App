import {configureStore} from "@reduxjs/toolkit"
import userReducer from "./userSlice"
import notesReducer from "./notesSlice"
import updateNoteReducer from "./updateNoteSlice"
import deleteNoteReducer from "./deleteNoteSlice"

const store = configureStore({ 
    reducer:{
        user: userReducer,
        noteList: notesReducer,
        isNoteUpdated: updateNoteReducer,
        isNoteDeleted: deleteNoteReducer
    }
})

export default store