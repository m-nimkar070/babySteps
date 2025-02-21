import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Doctor, Appointment } from '../interfaces/interfaces';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://babysteps-backend-horw.onrender.com/v1' }),
  tagTypes: ['Doctors', 'Appointments', 'Slots'],
  endpoints: (builder) => ({
    getDoctors: builder.query<Doctor[], void>({
      query: () => '/doctors',
      providesTags: ['Doctors']
    }),
    createDoctor: builder.mutation({
        query: (body) => ({
            url: '/doctors',
            method: 'POST',
            body
          }),
    }),
    getSlots: builder.query<string[], { doctorId: string; date: string }>({
      query: ({ doctorId, date }) => `/doctors/${doctorId}/slots?date=${date}`,
      providesTags: ['Slots']
    }),
    getAppointments: builder.query<Appointment[], void>({
      query: () => '/appointments',
      providesTags: ['Appointments']
    }),
    createAppointment: builder.mutation<Appointment, Partial<Appointment>>({
      query: (body) => ({
        url: '/appointments',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Appointments', 'Slots']
    }),
    updateAppointment: builder.mutation<
      Appointment,
      { id: string; updates: Partial<Appointment> }
    >({
      query: ({ id, updates }) => ({
        url: `/appointments/${id}`,
        method: 'PUT',
        body: updates
      }),
      invalidatesTags: ['Appointments', 'Slots']
    }),
    deleteAppointment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/appointments/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Appointments', 'Slots']
    })
  })
});

export const {
    useGetDoctorsQuery,
    useGetSlotsQuery,
    useGetAppointmentsQuery,
    useCreateAppointmentMutation,
    useUpdateAppointmentMutation,
    useDeleteAppointmentMutation,
    useCreateDoctorMutation,
  } = api;