function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {movies.map((movie) => (
        <li key={movie.id} className='movie'>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.image} alt={movie.title} />
        </li>
      ))}
    </ul>
  )
}

function NoMoviesResult () {
  return (
    <p>No se encontraron películas</p>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    hasMovies 
      ? <ListOfMovies movies={movies}/>
      : <NoMoviesResult />
  )
}
