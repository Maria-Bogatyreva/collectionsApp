import {limit} from "../constants/collectionFilters.ts";
import useCollectionsSearchParams from "./useCollectionsSearchParams.ts";
import {useGetCollectionsQuery} from "../services/collectionsApi.ts";

export default function UseCollections() {
  const {page, selectedSpecialization, selectedAccess} = useCollectionsSearchParams();
  const {currentData, error, isFetching: isLoading} = useGetCollectionsQuery({page, limit, selectedSpecialization, selectedAccess})

  const collections = currentData?.data ?? [];
  const total = currentData?.total ?? [];

  return {
    collections,
    total,
    error,
    isLoading
  }
}
