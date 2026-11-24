// Хук предназначен для формирования поисковых параметров коллекций на основании фильтров
// Внимание! В коллекции НЕТ множественных фильтров
import {useSearchParams} from "react-router-dom";
import type { MouseEvent } from 'react';

export type AllowedParamName = 'specializations' | 'isFree'

export default function useCollectionsSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = searchParams.get('page') || '1' //страница
  const searchQuery = searchParams.get('titleOrDescriptionSearch') || ''
  const selectedSpecialization = searchParams.get('specializations') || ''; // специализация
  const selectedAccess = searchParams.get('isFree') || ''; // уровень доступа


  function handleFilterChange(
    newValue: number,
    paramName: AllowedParamName
  ) {
    const value = paramName === 'isFree'
      ? String(newValue === 1)
      : String(newValue);

    setSearchParams(prev => {
      const next = new URLSearchParams(prev);

      next.set('page', '1');

      if (next.get(paramName) === value) {
        next.delete(paramName);
      } else {
        next.set(paramName, value);
      }

      return next;
    });
  }

  function handleNextPage(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('page', (Number(page) + 1).toString());
      return next;
    })
  }

  function handlePrevPage(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('page', (Number(page) - 1).toString());
      return next;
    })
  }

  function handlePageClick(e: MouseEvent<HTMLAnchorElement>, pageNumber:number) {
    e.preventDefault();
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('page', pageNumber.toString());
      return next;
    })
  }

  return {
    searchParams,
    setSearchParams,
    page,
    selectedSpecialization,
    selectedAccess,
    searchQuery,
    handleFilterChange,
    handleNextPage,
    handlePrevPage,
    handlePageClick
  }
}