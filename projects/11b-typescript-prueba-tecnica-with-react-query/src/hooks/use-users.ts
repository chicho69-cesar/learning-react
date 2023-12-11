import { useInfiniteQuery } from '@tanstack/react-query'

import { fetchUsers } from '../services/users'
import type { User } from '../types.d'

export function useUsers() {
  /* El hook useInfiniteQuery nos permite hacer queries con paginación, donde si nextCursor
  es number tiene una pagina mas para hacer fetch de la siguiente pagina, si
  es undefined no hay mas paginas para hacer fetch. Este hook nos devuelve el estado
  cuando esta cargando, si hay un error, los datos, la función de refetch, la función
  para hacer fetch de la siguiente pagina, si tenemos mas paginas, y muchas cosas más */
  const { isLoading, isError, data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery<{ nextCursor?: number, users: User[] }>(
    ['users'], // key de la query
    fetchUsers, // función fetcher para hacer la petición	
    /* Objeto de configuración para react-query */
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor, // función para obtener el siguiente cursor
      refetchOnWindowFocus: false, // refetch la query cuando se pierde el foco del navegador
      staleTime: 1000 * 60, // 24 hours
    }
  )

  return {
    refetch,
    fetchNextPage,
    isLoading,
    isError,
    users: data?.pages.flatMap((page) => page.users) ?? [],
    hasNextPage
  }
}
