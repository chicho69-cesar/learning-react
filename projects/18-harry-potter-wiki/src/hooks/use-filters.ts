import { useRecoilState } from 'recoil'
import { typeFiltersState } from '../store/type-filters'
import { filtersState } from '../store/filters'

export default function useFilters() {
  const [typeFilters, setTypeFilters] = useRecoilState(typeFiltersState)
  const [filters, setFilters] = useRecoilState(filtersState)

  const changeTypeFilter = (filterName: string, value: boolean) => {
    setTypeFilters((prevState) => ({
      ...prevState,
      [`${filterName}`]: value,
    }))
  }

  const changeHouse = (house: string) => {
    setFilters((prevState) => ({
      ...prevState,
      house,
    }))
  }

  const changeGenre = (genre: string) => {
    setFilters((prevState) => ({
      ...prevState,
      genre,
    }))
  }

  return {
    typeFilters,
    changeTypeFilter,
    filters,
    changeHouse,
    changeGenre,
  }
}
