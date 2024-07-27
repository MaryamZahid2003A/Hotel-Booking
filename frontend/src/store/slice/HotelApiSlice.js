import { ApiSlice } from "./ApiSlice";
const baseURL='/api/hotel'

const HotelApiSlice=ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        add_hotel:builder.mutation({
            query : (data)=>({
                method:'POST',
                url:`${baseURL}`,
                body:data

            })
        }),
        update_hotel:builder.mutation({
            query : (data)=>({
                method:'POST',
                url:`${baseURL}/view/:hotelId`,
                body:data

            })
        })
    })
})

export const {useAdd_hotelMutation,useUpdate_hotelMutation}=HotelApiSlice;