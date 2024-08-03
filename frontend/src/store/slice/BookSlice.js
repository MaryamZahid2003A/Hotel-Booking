import { createSlice } from "@reduxjs/toolkit";

const initialState={
    bookInfo : localStorage.getItem('bookInfo')? JSON.parse(localStorage.getItem('bookInfo')): ''
}

const BookSlice=createSlice({
    name:'book',
    initialState,
    reducers:{
        setBookCredentials:(state,action)=>{
            state.bookInfo=action.payload
            localStorage.setItem('bookInfo',JSON.stringify(action.payload))
        }
    }
})
export {BookSlice}
export const {setBookCredentials}=BookSlice.actions;