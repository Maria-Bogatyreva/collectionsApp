import {limit} from "../constants/collectionFilters.ts";
import useCollectionsSearchParams from "./useCollectionsSearchParams.ts";
import {useGetCollectionsQuery} from "../services/collectionsApi.ts";

export default function useCollections() {
  const {page, selectedSpecialization, selectedAccess} = useCollectionsSearchParams();
  const {currentData, error, isFetching: isLoading} = useGetCollectionsQuery({page, limit, selectedSpecialization, selectedAccess})

  const collections = currentData?.data ?? [];
  const total = currentData?.total ?? 0;

  return {
    collections,
    total,
    error,
    isLoading
  }
}
