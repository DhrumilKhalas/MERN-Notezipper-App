import {createSlice} from "@reduxjs/toolkit"
import axios from "axios"



const userInfoFromStorage = localStorage.getItem("NotezipperUser")
  ? JSON.parse(localStorage.getItem("NotezipperUser"))
  : null;

export const STATUSES = Object.freeze({
    IDLE:"idle",
    ERROR:"error",
    LOADING:"loading"
})

const userSlice = createSlice({
    name:"User",
    initialState:{
        status: STATUSES.IDLE,
        userInfo: userInfoFromStorage,
        isError:null,
    
    },
    reducers:{
        setUserLogin(state, action){
            return{
                ...state,
                userInfo:action.payload,
        
            }
        },
        setUserLoginError(state, action){
            return{
                ...state,
                isError: action.payload,
            
            }
        },
        setUserLogout(state){
            return{
                ...state,
                
            }
        },
        setUserLogoutError(state, action){
            return{
                ...state,
                isError : action.payload,
            
            }
        },
        setUserRegister(state, action){
            return{
                ...state,
                userInfo:action.payload,
            
                
            }
        },
        setUserRegisterError(state, action){
            return{
                ...state,
                isError: action.payload,
            
            }
        },
        updateProfile(state, action){
            return{
                ...state,
                userInfo:action.payload,
        
            }

        },
        updateProfileError(state, action){
            return{
                ...state,
                isError:action.payload,
        
            }
        },
        setStatus(state, action){
            return{
                ...state,
                status: action.payload
            }
        }
    }

})

export const {setUserLogin, setUserLoginError, setUserLogout, setUserLogoutError, setUserRegister, setUserRegisterError, updateProfile, updateProfileError, setStatus} = userSlice.actions
export default userSlice.reducer

export function fetchUserLogin(email, password) {
    return async function fetchUserLoginThunk(dispatch, getState){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const config = {"Content-Type":"application/json"}
            const res = await axios.post("/api/users/login", {email, password}, config)
            const data = await res.data;
            dispatch(setStatus(STATUSES.IDLE))
            dispatch(setUserLogin(data))
            localStorage.setItem("NotezipperUser", JSON.stringify(data))
            window.location.reload(false)
        }catch(err){
            console.log("LOGIN ERROR: " + err)
            dispatch(setStatus(STATUSES.ERROR))
            dispatch(setUserLoginError(err?.response?.data?.message)) 
        }
    }
} 

export function fetchUserLogout() {
    return async function fetchUserLogoutThunk(dispatch, getState){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            localStorage.removeItem("NotezipperUser")
            await dispatch(setUserLogout())
            await dispatch(setStatus(STATUSES.IDLE))
            window.location.reload(false)
        }catch(err){
           console.log("LOGOUT ERROR: " + err);
           dispatch(setStatus(STATUSES.ERROR))
           dispatch(setUserLogoutError(err?.response?.data?.message)) 
        }
    }
}

export function fetchUserRegister(name, email, password, pic){
    return async function fetchUserRegsiterThunk(dispatch, getState){
        dispatch(setStatus(STATUSES.LOADING))
        try{
            const config = {"Content-Type":"application/json"}
            const res = await axios.post("/api/users/", {
                name, email, password, pic
            }, config) 
            const data = await res?.data
            dispatch(setStatus(STATUSES.IDLE))
            dispatch(setUserRegister(data))
            dispatch(setUserLogin(data))
            localStorage.setItem("NotezipperUser", JSON.stringify(data))
            window.location.reload(false)
        }catch(err){
            console.log("REGISTER ERROR: " + err)
            dispatch(setStatus(STATUSES.ERROR))
            dispatch(setUserRegisterError(err?.response?.data?.message))  
        }
    }
}

export function fetchUpdateProfile(user){
    return async function fetchUpdateProfileThunk(dispatch, getState){
        // dispatch(setStatus(STATUSES.LOADING)) 
        try{
            const userToken = getState()?.user?.userInfo?.token;
            const config = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${userToken}`
                }
            }
            const res = await axios.post("/api/users/profile", 
                user
            , config)
            const data = await res.data;
            // dispatch(setStatus(STATUSES.IDLE))
            dispatch(updateProfile(data))
            localStorage.setItem("NotezipperUser", JSON.stringify(data))
            alert("Profile Updated Successfully!")
        }catch(err){
            console.log("Update User Profile Error: " + err); 
            dispatch(setStatus(STATUSES.ERROR))
            dispatch(updateProfileError(err.message))
        }
    }
}