import { useCallback, useEffect, useMemo, useState } from 'react'
import useSWR from 'swr'

import { Character, Ancestry } from '../types/characters'
import useFilters from './use-filters'
import useSearch from './use-search'
import useDebounce from './use-debounce'

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

function filterByType(
  character: Character,
  typeFilters: {
    all: boolean;
    wizards: boolean;
    muggles: boolean;
    'half-blob': boolean;
    'pure-blob': boolean;
    alive: boolean;
  }
): boolean {
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

function filterByFilters(
  character: Character, 
  filters: {
    house: string;
    genre: string;
  }
): boolean {
  const { house, genre } = filters

  return (
    (house === 'House' || house === character.house) &&
    (genre === 'Genre' || genre === character.gender)
  )
}
