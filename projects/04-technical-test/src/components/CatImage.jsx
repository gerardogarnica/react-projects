import { useCatImage } from '../hooks/useCatImage.js'

export function CatImage ({ cats }) {
  const { imageUrl } = useCatImage({ cats })

  return (
    <>
      {imageUrl && <img src={imageUrl} alt={`Image fork ${cats}`} />}
    </>
  )
}
