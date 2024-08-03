import { ApiSlice } from "./ApiSlice";
const baseURL='/api/booking'

const BookApiSlice=ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        add_book:builder.mutation({
            query:(data)=>({
                method:'POST',
                url:`${baseURL}/book`,
                body:data
            })
        })
    })
})

export const {useAdd_bookMutation}=BookApiSlice;