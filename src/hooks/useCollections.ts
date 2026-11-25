import {limit} from "../constants/collectionFilters.ts";
import useCollectionsSearchParams from "./useCollectionsSearchParams.ts";
import {useGetCollectionsQuery} from "../services/collectionsApi.ts";

export default function useCollections() {
  const {page, selectedSpecialization, selectedAccess, searchQuery} = useCollectionsSearchParams();
  const {currentData, isFetching, isError, refetch} = useGetCollectionsQuery({page, limit, selectedSpecialization, selectedAccess, searchQuery})

  const collections = currentData?.data ?? [];
  const total = currentData?.total ?? 0;

  return {
    collections,
    total,
    hasData: currentData !== undefined,
    isFetching,
    isError,
    refetch
  }
}
