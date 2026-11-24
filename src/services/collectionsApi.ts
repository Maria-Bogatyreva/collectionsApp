import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {
  Specialization,
  PaginatedResponse,
  Collection,
  QuestionItem,
  QuestionQueryParams,
  CollectionQueryParams, Question
} from "./collectionsApi.types.ts";

export const apiSlice = createApi({
  reducerPath: 'collectionsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.yeatwork.ru/',
    timeout: 5000
  }),
  endpoints: (builder) => ({
    // эндпоинт для получения ВСЕХ специализаций
    getSpecializations: builder.query<Specialization[], void>({
      query: () => 'specializations?limit=15',
      transformResponse: (response: PaginatedResponse<Specialization>) => response.data
    }),
    //эндпоинт для получения ОДНОЙ коллекции
    getCollectionById: builder.query<Collection, string>({
      query: (id) => `/collections/${id}/public`
    }),
    //эндпоинт для получения ОДНОГО ВОПРОСА
    getQuestionById: builder.query<Question, string>({
      query: (id) => `/questions/public-questions/${id}` //эндпоинт для получения ОДНОГО вопроса
    }),
    //эндпоинт для получения коллекций с квери-параметрами
    getCollections: builder.query<PaginatedResponse<Collection>, CollectionQueryParams>({
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
    }),
    //эндпоинт для получения ВОПРОСОВ коллекции
    getQuestionsByIdCollection: builder.query<PaginatedResponse<QuestionItem>, QuestionQueryParams>({
      query: (params) => {
        const {
          page,
          limit,
          collection
        } = params;

        const searchParams = new URLSearchParams({limit: limit.toString(), page: page, collection: collection})

        return {
          url: '/questions/public-questions',
          params: searchParams
        }
      }
    })
  })
})

// экспорт хуков для использования в компонентах
export const { useGetSpecializationsQuery,
               useGetCollectionByIdQuery,
               useGetCollectionsQuery,
               useGetQuestionsByIdCollectionQuery,
               useGetQuestionByIdQuery
} = apiSlice;
