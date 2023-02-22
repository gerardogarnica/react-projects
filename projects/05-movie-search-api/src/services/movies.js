const OMDB_API_KEY = '181e8d0c'

export const searchMovies = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${search}`)
    const data = await response.json()
    const movies = data.Search

    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      image: movie.Poster
    }))
  } catch (e) {
    throw new Error(`Error sarching movies. ${e.message}`)
  }
}
