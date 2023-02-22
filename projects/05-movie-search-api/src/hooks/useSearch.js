import { useEffect, useRef, useState } from 'react'

export function useSearch () {
  const [queryText, setQueryText] = useState('')
  const [formError, setFormError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = queryText === ''
      return
    }

    if (queryText === '') {
      setFormError('No se puede buscar una película sin texto')
      return
    }

    if (queryText.match(/^\d+$/)) {
      setFormError('El texto no puede ser un número')
      return
    }

    if (queryText.length < 3) {
      setFormError('El texto debe tener al menos 3 caracteres')
      return
    }

    setFormError(null)
  }, [queryText])

  return { queryText, setQueryText, formError }
}
