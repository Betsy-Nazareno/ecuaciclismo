import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Pressable, Image } from 'react-native'
import RoundedWhiteBaseTemplate from '../organismos/RoundedWhiteBaseTemplate'
import { TEXT_COLORS } from '../../utils/constants'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'

interface FieldFechaHoraProps {
  fecha?: Date
  setFecha: (fecha: Date) => void
  placeholder?: string
}

const FieldFechaHora = ({
  fecha,
  setFecha,
  placeholder,
}: FieldFechaHoraProps) => {
  const [show, setShow] = React.useState(false)
  const [date, setDate] = React.useState<Date>()
  const [mode, setMode] = React.useState<'date' | 'time'>('date')

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && mode === 'date') {
      setDate(selectedDate)
      setMode('time')
    } else if (event.type === 'set' && mode === 'time') {
      setShow(false)
      if (date && selectedDate) {
        selectedDate.setDate(date.getDate())
        selectedDate.setMonth(date.getMonth())
        selectedDate.setFullYear(date.getFullYear())
        setFecha(selectedDate)
        setMode('date')
      }
    } else if (event.type !== 'set' || !selectedDate) {
      setShow(false)
      return
    }
  }

  const handlePress = () => {
    setShow(true)
  }

  return (
    <>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          mode={mode}
          value={fecha ? new Date(fecha) : new Date(Date.now())}
          is24Hour={true}
          onChange={onChange}
        />
      )}
      <RoundedWhiteBaseTemplate shadow={false}>
        <Pressable onPress={handlePress}>
          <View style={tw`flex flex-row justify-between`}>
            {fecha ? (
              <Text>
                {fecha.toLocaleDateString()} {fecha.toLocaleTimeString()}
              </Text>
            ) : (
              <Text style={tw`${TEXT_COLORS.GRAY_PLACEHOLDER} text-sm`}>
                {placeholder || 'Establece una fecha para este evento...'}
              </Text>
            )}
            <Image
              source={require('../../../assets/calendar_blue_icon.png')}
              style={{ width: 20, height: 20 }}
            />
          </View>
        </Pressable>
      </RoundedWhiteBaseTemplate>
    </>
  )
}

export default FieldFechaHora
