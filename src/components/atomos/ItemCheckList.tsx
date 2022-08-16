import * as React from 'react'
import { Text, Image } from 'react-native'
import Gap from './Gap'

interface ItemCheckListProps {
  text: string
}

const ItemCheckList = ({ text }: ItemCheckListProps) => {
  return (
    <Gap styles="flex flex-row" py="1">
      <Image
        source={require('../../../assets/check_icon.png')}
        style={{ width: 15, height: 15, marginRight: 4 }}
      />
      <Text>{text}</Text>
    </Gap>
  )
}

export default ItemCheckList
