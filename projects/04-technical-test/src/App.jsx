import { CatImage } from './components/CatImage'
import { useCatFact } from './hooks/useCatFact'
import './App.css'

function App () {
  const { cats, refreshFact } = useCatFact()

  const handleFactButton = () => {
    refreshFact()
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleFactButton}>Get New Cat</button>
      <section>
        {cats && <p>{cats}</p>}
        <CatImage cats={cats} />
      </section>
    </main>
  )
}

export default App
