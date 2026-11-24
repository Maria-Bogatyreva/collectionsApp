import useCollectionsSearchParams from "./useCollectionsSearchParams.ts";
import {type ChangeEvent, useEffect, useRef, useState} from "react";
import useDebounce from "./useDebounce.ts";

export default function useCollectionsSearch() {
  const {searchQuery, setSearchParams} = useCollectionsSearchParams(); // значение поиска из урла!
  const [inputSearchValue, setInputSearchValue] = useState(searchQuery) // значение инпута

  const debouncedInputSearchValue = useDebounce(inputSearchValue, 1000).trim();
  const hasPendingUserInput = useRef(false); // флаг - нужно применить новое значение инпута
  const expectedSearchQuery = useRef<string | null>(null);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setInputSearchValue(e.target.value);
    hasPendingUserInput.current = true;
  }

  useEffect(() => {
      // подтверждение нашей записи в URL
      if (searchQuery === expectedSearchQuery.current) {
        expectedSearchQuery.current = null;
        return
      } else  {
        // программный ввод
        hasPendingUserInput.current = false;
        expectedSearchQuery.current = null;
        setInputSearchValue(searchQuery);
      }
  }, [searchQuery]);

  // Запись в URL при изменении дебаунс-значения
  useEffect(() => {
    // если нет значения, ожидающего обработки - ничего не делаем
    if(!hasPendingUserInput.current) return

    // если дебаунс-значение еще не догнало текущий ввод
    if (debouncedInputSearchValue !== inputSearchValue.trim()) return;

    // Если дебаунс-значение инпута = значению в урле -> ничего не делаем
    if (debouncedInputSearchValue === searchQuery) {
      hasPendingUserInput.current = false;
      return;
    }

    hasPendingUserInput.current = false;
    expectedSearchQuery.current = debouncedInputSearchValue;
    setSearchParams(prev => {
      const next = new URLSearchParams(prev);
      next.set('page', '1');

      if (debouncedInputSearchValue.length) {
        next.set('titleOrDescriptionSearch', debouncedInputSearchValue)
      } else {
        next.delete('titleOrDescriptionSearch')
      }
      return next
    })
  }, [debouncedInputSearchValue, searchQuery, setSearchParams, inputSearchValue]);
  return {
    inputSearchValue,
    handleSearch
  }
}
