import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./slice/UserSlice";
import {ApiSlice} from "./slice/ApiSlice";

export const Store=configureStore({
    reducer:{
        auth1:UserSlice.reducer,
        [ApiSlice.reducerPath]:ApiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(ApiSlice.middleware),
    devTools:true
})

export default Store;