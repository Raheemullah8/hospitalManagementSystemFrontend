import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const AuthApi = createApi({
   reducerPath: "AuthApi",
   baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
   }),
   tagTypes: ["Auth"],
   endpoints: (builder) =>({

    LoginUser: builder.mutation({
        query:(data) =>({
         url:"/auth/login",
         method:"POST",
         body:data,

        }),
        invalidatesTags:["Auth"],
    }),

    registerUser: builder.mutation({
    query:(data)=>({
        url:"/auth/register",
        method:"POST",
        body:data,
    }),
    invalidatesTags:["Auth"],
    })
   }),
   
         
})

export const  {useLoginUserMutation,useRegisterUserMutation} = AuthApi;