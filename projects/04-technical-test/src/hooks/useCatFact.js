import { useEffect, useState } from 'react'
import { getRandomFact } from '../services/fact'

export const useCatFact = () => {
  const [cats, setCats] = useState()

  const refreshFact = () => {
    getRandomFact().then(newFact => setCats(newFact))
  }

  // Get the fact
  useEffect(refreshFact, [])

  return { cats, refreshFact }
}
