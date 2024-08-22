import {fetchBaseQuery,createApi} from '@reduxjs/toolkit/query/react'

const baseQuery=fetchBaseQuery({baseurl:''})

export const ApiSlice=createApi({
    baseQuery,
    tagTypes:['User'],
    middleware:(builder)=>({})
})
