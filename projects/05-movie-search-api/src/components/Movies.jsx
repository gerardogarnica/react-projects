function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {
      movies.map(movie => (
        <li className='movie' key={movie.imdbID}>
          <h3>{movie.title}</h3>
          <p>{movie.year}</p>
          <img src={movie.image} alt={movie.title} />
        </li>
      ))
      }
    </ul>
  )
}

function NoMoviesFound () {
  return (
    <p>No se encontraron pelis para tu búsqueda</p>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies && movies.length > 0

  return (
    <>
      {
        hasMovies
          ? <ListOfMovies movies={movies} />
          : <NoMoviesFound />
      }
    </>
  )
}
