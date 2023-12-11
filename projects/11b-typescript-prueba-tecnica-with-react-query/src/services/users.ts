/* Creamos una función delay para hacer precisamente que un proceso que queramos
se ejecute después de cierto tiempo. Esta función espera un numero de milisegundos */
const delay = async (ms: number) => await new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchUsers({ pageParam = 1 }: { pageParam?: number }) {
  /* Esperamos 300 ms para hacer la petición a el servidor */
  await delay(300)

  return await fetch(`https://randomuser.me/api?results=10&seed=midudev&page=${pageParam}`)
    .then(async (res) => {
      if (!res.ok) throw new Error('Error en la petición')
      return await res.json()
    })
    .then((res) => {
      const currentPage = Number(res.info.page)
      const nextCursor = currentPage > 5 ? undefined : currentPage + 1

      return {
        users: res.results,
        nextCursor
      }
    })
    .catch((err) => {
      console.error(`Error: ${err}`)

      return {
        users: [],
        nextCursor: undefined
      }
    })
}
