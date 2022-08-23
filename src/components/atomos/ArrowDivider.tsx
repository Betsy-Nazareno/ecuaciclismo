import * as React from 'react'
import { Image } from 'react-native'

const ArrowDivider = () => {
  return (
    <Image
      source={require('../../../assets/flecha.png')}
      style={{ width: 20, height: 20 }}
    />
  )
}

export default ArrowDivider
