import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {Specialization, PaginatedResponse, QueryParams, Collection} from "./collectionsApi.types.ts";

export const apiSlice = createApi({
  reducerPath: 'collectionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.yeatwork.ru/',
    timeout: 5000
  }),
  endpoints: (builder) => ({
    getSpecializations: builder.query<Specialization[], void>({
      query: () => 'specializations?limit=15', // эндпоинт для получения ВСЕХ специализаций
      transformResponse: (response: PaginatedResponse<Specialization>) => response.data
    }),
    getCollectionById: builder.query<Collection, string>({
      query: (id) => `/collections/${id}/public` //эндпоинт для получения ОДНОЙ коллекции
    }),
    getQuestionById: builder.query({
      query: (id) => `/questions/public-questions/${id}` //эндпоинт для получения ОДНОГО вопроса
    }),
    getCollections: builder.query<PaginatedResponse<Collection>, QueryParams>({
      query: (params) => {
        const {
          page,
          limit,
          selectedSpecialization,
          selectedAccess
        } = params;
        const searchParams = new URLSearchParams({limit: limit.toString(), page: page})

        if (selectedSpecialization) {
          searchParams.set('specializations', selectedSpecialization)
        }

        if (selectedAccess) {
          searchParams.set('isFree', selectedAccess)
        }

        return {
          url: '/collections/public',
          params: searchParams
        }
      }
    })
  })
})

// экспорт хуков для использования в компонентах
export const {useGetSpecializationsQuery, useGetCollectionByIdQuery, useGetCollectionsQuery} = apiSlice;
