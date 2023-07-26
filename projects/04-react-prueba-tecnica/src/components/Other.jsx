import { useCatImage } from '../hooks/useCatImage'

export function Other () {
  const { imageUrl } = useCatImage({ fact: 'cat' })

  console.log(imageUrl)

  return (
    <>
      {imageUrl && <img src={imageUrl} />}
    </>
  )
}
