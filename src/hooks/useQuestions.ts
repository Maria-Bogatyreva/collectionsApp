import {useParams} from "react-router-dom";
import useCollectionsSearchParams from "./useCollectionsSearchParams.ts";
import {useGetQuestionsByIdCollectionQuery} from "../services/collectionsApi.ts";
import {limit} from "../constants/collectionFilters.ts";
import {skipToken} from "@reduxjs/toolkit/query";

export default function useQuestions() {
  const {id:collection} = useParams();
  const {page} = useCollectionsSearchParams();

  const params = collection ? {page, limit, collection} : skipToken;

  const {currentData, error, isFetching} = useGetQuestionsByIdCollectionQuery(params);
  const questions = currentData?.data ?? [];
  const total = currentData?.total ?? 0;

  return {
    questions,
    total,
    error,
    isFetching
  }
}
