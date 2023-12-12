import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import type { Comment, CommentWithId } from './types.d'
import { getComments, postComment } from './services/comments'
import FormInput from './components/FormInput'
import FormTextArea from './components/FormTextArea'
import Results from './components/Results'

function App() {
  /* Creamos una query y le pasamos la función getComments para obtener
  la información que vamos a almacenar para la key de 'comments' */
  const { data, isLoading, error } = useQuery<CommentWithId[]>(
    ['comments'],
    getComments
  )

  /* Creamos una instancia de queryClient con el cual podemos acceder
  a manipular la data que esta fluyendo en nuestro cliente de react query */
  const queryClient = useQueryClient()

  /* Instanciamos una mutación mediante la cual podemos obtener mucha
  información en la cual lo mas importante podríamos decir que es la función
  mutate la cual es la función que realiza la mutación, también tenemos 
  isLoading el cual nos indica si la mutación esta en curso, 
  o el si hubo un error, etc. */
  const { mutate, isLoading: isLoadingMutation } = useMutation({
    mutationFn: postComment, // Función para ejecutar con la mutación
    onMutate: async (newComment) => { // Al momento de hacer la mutación, recibimos los parámetros que recibe la función de mutación
      /* Cancelamos la query 'comments' */
      await queryClient.cancelQueries(['comments'])

      /* Esto lo hacemos para guardar el estado previo de 'comments'
      por si tenemos que hacer un rollback */
      const previousComments = queryClient.getQueryData(['comments'])

      /* Esto lo que hacemos es establecer la data de la query con la key
      'comments', donde recibimos un callback con la información antigua, es decir, 
      la información antes de hacer la mutación */
      queryClient.setQueryData(['comments'], (oldData?: Comment[]): Comment[] => {
        // Hacemos una copia del comentario que vamos a agregar
        const newCommentToAdd = structuredClone(newComment)
        newCommentToAdd.preview = true

        /* Si no había data antes, este comentario es el primero en agregarse */
        if (oldData == null) return [newCommentToAdd]
        /* Si ya había regresamos la data antigua junto al nuevo comentario */
        return [...oldData, newCommentToAdd]
      })

      /* Regresamos la información antigua de los comentarios */
      return { previousComments }
    },
    onError: (error, /* variables */_, context) => { // Si hubo un error en la mutación, obtenemos el error, las variables y el contexto
      console.error(error)

      /* Si tenemos el estado previo de los comentarios, establecemos la data de la query
      con dichos comentarios, es decir, los comentarios que teníamos antes de hacer la mutación
      para no perderlos a pesar del error */
      if (context?.previousComments != null) {
        queryClient.setQueryData(['comments'], context.previousComments)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['comments']
      })
    }
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (isLoadingMutation) return

    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const message = data.get('message')?.toString() ?? ''
    const title = data.get('title')?.toString() ?? ''

    if (title !== '' && message !== '') {
      mutate({ title, message }) // Hacemos la mutación y le mandamos el nuevo comentario
    }
  }

  return (
    <main className='grid h-screen grid-cols-2'>
      <div className='col-span-1 p-8 bg-white'>
        {isLoading && <strong>Cargando...</strong>}
        {error != null && <strong>Algo ha ido mal</strong>}
        
        <Results data={data} />
      </div>
      
      <div className='col-span-1 p-8 bg-black'>
        <form className={`${isLoadingMutation ? 'opacity-40' : ''} block max-w-xl px-4 m-auto`} onSubmit={handleSubmit}>
          <FormInput />
          <FormTextArea />

          <button
            disabled={isLoadingMutation}
            type='submit' className='mt-4 px-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2'
          >
            {isLoadingMutation ? 'Enviando comentario...' : 'Enviar comentario'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default App
