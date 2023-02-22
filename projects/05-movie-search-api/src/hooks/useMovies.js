import { useCallback, useMemo, useRef, useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ queryText, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [, setError] = useState(null)
  const previousQueryText = useRef(queryText)

  const getMovies = useCallback(async ({ queryText }) => {
    if (queryText === previousQueryText.current) return

    try {
      setLoading(true)
      setError(null)

      previousQueryText.current = queryText

      const responseMovies = await searchMovies({ search: queryText })
      setMovies(responseMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const sortedMovies = useMemo(() => {
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [movies, sort])

  return { movies: sortedMovies, getMovies, loading }
}
