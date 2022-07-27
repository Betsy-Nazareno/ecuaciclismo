import * as React from 'react'
import { Text, View, Image, ImageSourcePropType, Pressable } from 'react-native'
import tw from 'twrnc'
import { ReaccionTypes, ReaccionValues } from '../../models/Reacciones.model'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../utils/constants'

interface ReaccionProps {
  image: ImageSourcePropType
  dimension: number
  reaccionObject?: ReaccionValues
  isSelected?: boolean
  name: ReaccionTypes
  handleClick: (value: ReaccionTypes, alreadySelected: boolean) => void
}

const Reaccion = ({
  image,
  dimension,
  name,
  handleClick,
  isSelected,
  reaccionObject,
}: ReaccionProps) => {
  const [count, setCount] = React.useState<number | undefined>(0)
  const [isPressed, setIsPressed] = React.useState(false)

  React.useEffect(() => {
    setCount(reaccionObject?.usuarios?.length || undefined)
    setIsPressed(isSelected || false)
  }, [reaccionObject])

  const handleReaction = () => {
    if (!isPressed) {
      setCount((count || 0) + 1)
    } else {
      setCount((count || 1) - 1)
    }
    setIsPressed(!isPressed)
    handleClick(name, isPressed)
  }

  return (
    <Pressable onPress={handleReaction}>
      <View style={tw`mx-2 flex flex-row `}>
        <View style={tw`pr-2`}>
          <Image
            source={image}
            style={{ width: dimension, height: dimension }}
          />
          {isPressed && (
            <View
              style={tw`h-[3px] w-full mt-2 rounded-2xl ${BACKGROUND_COLORS.ORANGE}`}
            />
          )}
        </View>
        <Text style={tw`${TEXT_COLORS.DARK_GRAY} text-xs`}>{count || ''}</Text>
      </View>
    </Pressable>
  )
}

export default Reaccion
