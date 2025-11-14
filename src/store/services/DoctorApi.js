import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const DoctorApi = createApi({
  reducerPath: "DoctorApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/doctors`,
    credentials: "include", // 🔹 include credentials globally
  }),

  tagTypes: ["Doctors"],

  endpoints: (builder) => ({
    // 🔹 Get Doctor Profile
    getDoctorProfile: builder.query({
      query: () => "/profile",
      providesTags: ["Doctors"],
    }),

    // 🔹 Update Doctor Profile
    updateDoctorProfile: builder.mutation({
      query: (data) => ({
        url: "/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Doctors"],
    }),

    // 🔹 Get Doctor Availability
    getDoctorAvailability: builder.query({
      query: () => "/availability",
      providesTags: ["Doctors"],
    }),

    // 🔹 Update Doctor Availability
    updateDoctorAvailability: builder.mutation({
      query: (data) => ({
        url: "/availability",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Doctors"],
    }),

    // 🔹 Get All Doctors
    getAllDoctors: builder.query({
      query: () => "/alldoctors",
      providesTags: ["Doctors"],
    }),

    // 🔹 Get Doctor by ID
    getDoctorById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Doctors"], // consistent with tagTypes
    }),
  }),
});

// 🔹 Export Hooks
export const {
  useGetDoctorProfileQuery,
  useUpdateDoctorProfileMutation,
  useGetDoctorAvailabilityQuery,
  useUpdateDoctorAvailabilityMutation,
  useGetAllDoctorsQuery,
  useGetDoctorByIdQuery,
} = DoctorApi;
