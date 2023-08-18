import { useRecoilState } from "recoil";
import { searchState } from "../store/search";

export default function useSearch() {
  const [search, setSearch] = useRecoilState(searchState)

  const handleSearch = (text: string) => {
    if (text === search) return
    setSearch(text)
  }

  return {
    search,
    handleSearch
  }
}
