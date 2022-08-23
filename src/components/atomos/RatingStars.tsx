import * as React from 'react'
import { Rating } from 'react-native-ratings'

interface RatingStarsProps {
  stars: number
  setStars?: (value: number) => void
  readonly?: boolean
  size?: number
}

const RatingStars = ({
  stars,
  setStars,
  readonly = false,
  size = 40,
}: RatingStarsProps) => {
  return (
    <Rating
      onFinishRating={(stars: number) => setStars?.(stars)}
      style={{ paddingVertical: 10 }}
      startingValue={stars}
      readonly={readonly}
      imageSize={size}
    />
  )
}

export default RatingStars
