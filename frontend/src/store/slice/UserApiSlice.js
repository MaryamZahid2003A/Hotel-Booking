import { ApiSlice } from "./ApiSlice";
const baseUrl='/api/users'

export const UserApiSlice=ApiSlice.injectEndpoints({
    endpoints:(builder)=>({
        login: builder.mutation({
            query:(data)=>({
                method:'POST',
                url:`${baseUrl}/login`,
                body:data,
            })
        }),
        register:builder.mutation({
            query :(data)=>({
                url:`${baseUrl}/register`,
                method:'POST',
                body:data
            })
        }),
        logout:builder.mutation({
            query :(data)=>({
                url:`${baseUrl}/logout`,
                method:'POST',
                body:data
            })
        })
    })
})

export const {useLoginMutation,useRegisterMutation,useLogoutMutation}=UserApiSlice;