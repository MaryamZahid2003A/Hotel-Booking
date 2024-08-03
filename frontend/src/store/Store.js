import { configureStore } from "@reduxjs/toolkit";
import { UserSlice } from "./slice/UserSlice";
import {ApiSlice} from "./slice/ApiSlice";
import { HotelSlice } from "./slice/HotelSlice";
import { BookSlice } from "./slice/BookSlice";

export const Store=configureStore({
    reducer:{
        auth1:UserSlice.reducer,
        auth2:HotelSlice.reducer,
        auth3:BookSlice.reducer,
        [ApiSlice.reducerPath]:ApiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(ApiSlice.middleware),
    devTools:true
})

export default Store;