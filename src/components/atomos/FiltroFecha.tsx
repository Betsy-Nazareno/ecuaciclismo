import * as React from 'react'
import tw from 'twrnc'
import Gap from './Gap'
import { Image, Pressable } from 'react-native'
import { CustomText } from './CustomText'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'
import { BACKGROUND_COLORS } from '../../utils/constants'
import CancelButton from './CancelButton'
interface FiltroFechaProps {
  date?: Date
  setDate: (date: Date | undefined) => void
}

const FiltroFecha = ({ date, setDate }: FiltroFechaProps) => {
  // const [date, setDate] = React.useState(new Date(1598051730000))
  const [show, setShow] = React.useState(false)

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type !== 'set' || !selectedDate) {
      setShow(false)
      return
    }
    setShow(false)
    setDate(selectedDate)
  }

  const handlePress = () => {
    if (!date) {
      setShow(true)
    } else {
      setDate(undefined)
    }
  }

  const backgroundColor = date
    ? BACKGROUND_COLORS.SKY_BLUE
    : BACKGROUND_COLORS.ORANGE

  return (
    <>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date || new Date(Date.now())}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <Pressable
        style={tw`${backgroundColor} rounded-3xl py-1 pl-2 pr-3 flex flex-row items-center h-7`}
        onPress={handlePress}
      >
        <Gap px="2">
          <Image
            source={require('../../../assets/calendar.png')}
            style={{ width: 16, height: 16 }}
          />
        </Gap>
        <CustomText style="text-white text-xs">
          {date?.toLocaleDateString() || 'Fecha'}
        </CustomText>
        {date && <CancelButton />}
      </Pressable>
    </>
  )
}

export default FiltroFecha
