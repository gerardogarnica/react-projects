import './App.css'
import { useCallback, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'

function App () {
  const [sort, setSort] = useState(false)

  const { queryText, setQueryText, formError } = useSearch()
  const { movies, getMovies, loading } = useMovies({ queryText, sort })

  const debouncedGetMovies = useCallback(
    debounce(queryText => {
      getMovies({ queryText })
    }, 300), [getMovies])

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({ queryText })
  }

  const handleSort = () => {
    setSort(!sort)
  }

  const handleChangeQueryText = (event) => {
    const newQueryText = event.target.value
    setQueryText(newQueryText)
    debouncedGetMovies(newQueryText)
  }

  return (
    <div className='page'>
      <header>
        <h1>Movie Search</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              border: '1px solid transparent',
              borderColor: formError ? 'red' : 'transparent'
            }}
            onChange={handleChangeQueryText} value={queryText} name='queryText' placeholder='Avengers, The Matrix, Harry Potter, ...'
          />
          <button type='submit'>Search</button>
          <input type='checkbox' onChange={handleSort} checked={sort} />
        </form>
        {formError && <p style={{ color: 'red' }}>{formError}</p>}
      </header>

      <main>
        {
          loading ? <p>Loading...</p> : <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
