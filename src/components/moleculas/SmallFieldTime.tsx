import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Pressable, Image } from 'react-native'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'

interface SmallFieldFechaProps {
    hora?: string
    setFecha: (hora: string) => void
}

const SmallFieldFecha = ({ hora, setFecha }: SmallFieldFechaProps) => {
  const [show, setShow] = React.useState(false)

  const onChange = (event: DateTimePickerEvent, selectedHour?: Date) => {
    if (event.type === 'set' && selectedHour) {
      setShow(false)
      setFecha(selectedHour.getHours().toString() + ':' +
               selectedHour.getMinutes().toString() + ':' +
               selectedHour.getSeconds().toString())
    } else if (!selectedHour) {
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
          mode= 'time'
          value={new Date(Date.now())}
          is24Hour={true}
          onChange={onChange}
        />
      )}

      <Pressable onPress={handlePress}>
        <View style={tw`flex flex-row justify-between`}>
            {hora ? (
                <Text>
                    {hora}
                </Text>
            ) : (
                <Image
                source={require('../../../assets/clock.png')}
                style={{ width: 20, height: 20 }}
                />
            )}
        </View>
      </Pressable>
    </>
  )
}

export default SmallFieldFecha
