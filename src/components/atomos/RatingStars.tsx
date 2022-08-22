import * as React from 'react'
import { Rating } from 'react-native-ratings'

interface RatingStarsProps {
  stars: number
  setStars: (value: number) => void
}

const RatingStars = ({ stars, setStars }: RatingStarsProps) => {
  return (
    <Rating
      onFinishRating={(stars: number) => setStars(stars)}
      style={{ paddingVertical: 10 }}
      startingValue={stars}
    />
  )
}

export default RatingStars
