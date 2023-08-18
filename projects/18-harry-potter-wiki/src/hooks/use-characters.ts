import { useCallback, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

import { Character, Ancestry } from '../types/characters'
import useFilters from './use-filters'
import useSearch from './use-search'
import useDebounce from './use-debounce'
import type { FiltersType, TypeFiltersType } from '../types/types.d'

export default function useCharacters() {
  const { data, isLoading, error } = useSWR<Character[], string>('characters')
  const [characters, setCharacters] = useState<Character[]>(data || [])
  const { filters, typeFilters } = useFilters()
  const { search } = useSearch()
  const debouncedSearch = useDebounce<string>(search, 400)

  useEffect(() => {
    if (data) {
      setCharacters(data)
    }
  }, [data])

  const filterCharacters = useCallback((characters: Character[]) => {
    return characters.filter((character) => {
      return (
        filterByFilters(character, filters) &&
        filterByType(character, typeFilters) &&
        character.name.includes(debouncedSearch)
      )
    })
  }, [debouncedSearch, filters, typeFilters])

  const filteredCharacters = useMemo(() => {
    return filterCharacters(characters)
  }, [characters, filterCharacters])

  return {
    characters,
    filteredCharacters,
    isLoading,
    error,
  }
}

function filterByType(character: Character, typeFilters: TypeFiltersType): boolean {
  const {
    all,
    wizards,
    muggles,
    'half-blob': halfBlob,
    'pure-blob': pureBlob,
    alive,
  } = typeFilters

  return (
    all ||
    (wizards && character.wizard) ||
    (muggles && character.ancestry === Ancestry.Muggle) ||
    (halfBlob && character.ancestry === Ancestry.HalfBlood) ||
    (pureBlob && character.ancestry === Ancestry.PureBlood) ||
    (alive && character.alive)
  )
}

function filterByFilters(character: Character, filters: FiltersType): boolean {
  const { house, genre } = filters

  return (
    (house === 'House' || house === character.house) &&
    (genre === 'Genre' || genre === character.gender)
  )
}
