import { createSlice } from "@reduxjs/toolkit";

const initialState={
    hotelInfo:localStorage.getItem('hotelInfo')? JSON.parse(localStorage.getItem('hotelInfo')): null
}

const HotelSlice=createSlice({
    name:'hotel',
    initialState,
    reducers: {
        setHotelCredentials : (state,action)=>{
            state.hotelInfo=action.payload;
            localStorage.setItem('hotelInfo',JSON.stringify(action.payload))
        }
    }
})

export {HotelSlice}
export const {setHotelCredentials}=HotelSlice.actions;