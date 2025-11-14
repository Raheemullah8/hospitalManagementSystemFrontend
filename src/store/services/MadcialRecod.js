import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MedicalRecordApi = createApi({
  reducerPath: "MedicalRecordApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_BASE_URL}/medcial`,
    credentials: "include",
  }),

  tagTypes: ["MedicalRecord", "DoctorRecords", "PatientRecords"],

  endpoints: (builder) => ({

    // 🩺 Create new record (Doctor only)
    createMedicalRecord: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["DoctorRecords", "PatientRecords"],
    }),

    // 👨‍⚕️ Get all records created by doctor
    getDoctorMedicalRecords: builder.query({
      query: () => "/doctor/my-records",
      providesTags: ["DoctorRecords"],
    }),

    // ✏️ Update existing record (Doctor only)
    updateMedicalRecord: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "MedicalRecord", id },
        "DoctorRecords",
        "PatientRecords",
      ],
    }),

    // 👩‍⚕️ Get records for logged-in patient
    getPatientMedicalRecords: builder.query({
      query: () => "/patient/my-records",
      providesTags: ["PatientRecords"],
    }),

    // 🔍 Get single record details (both doctor & patient)
    getMedicalRecordById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "MedicalRecord", id }],
    }),

  }),
});

export const {
  useCreateMedicalRecordMutation,
  useGetDoctorMedicalRecordsQuery,
  useUpdateMedicalRecordMutation,
  useGetPatientMedicalRecordsQuery,
  useGetMedicalRecordByIdQuery,
} = MedicalRecordApi;
