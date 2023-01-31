import { useEffect, useState } from 'react'

const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function useCatImage ({ cats }) {
  const [imageUrl, setImageUrl] = useState()

  // Get the image
  useEffect(() => {
    if (!cats) return

    const fourFirstWords = cats.split(' ', 4).join(' ')

    fetch(`https://cataas.com/cat/says/${fourFirstWords}?size=50&color=green&json=true`)
      .then(response => response.json())
      .then(jsonResponse => {
        const { url } = jsonResponse
        setImageUrl(url)
      })
  }, [cats])

  return { imageUrl: `${CAT_PREFIX_IMAGE_URL}${imageUrl}` }
}
