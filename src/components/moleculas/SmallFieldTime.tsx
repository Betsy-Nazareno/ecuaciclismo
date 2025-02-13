import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Pressable, Image } from 'react-native'
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker'

interface SmallFieldFechaProps {
  hora?: string
  setFecha: (hora: string) => void
  mod?: string
}

const SmallFieldFecha = ({ hora, setFecha, mod = 'time' }: SmallFieldFechaProps) => {
  const [show, setShow] = React.useState(false)
  const [mode, setMode] = React.useState<'date' | 'time'>('time')
  const [ image, setImage ] = React.useState(require('../../../assets/clock.png'))

  React.useEffect(() => {
    if(mod === 'date'){
      setImage(require('../../../assets/calendar_blue_icon.png'))
    }
  }, [])

  const onChange = (event: DateTimePickerEvent, selectedHour?: Date) => {
    if (event.type === 'set' && selectedHour && mode === 'time') {
      setShow(false)
      setFecha(selectedHour.getHours().toString() + ':' +
               selectedHour.getMinutes().toString() + ':' +
               selectedHour.getSeconds().toString())
    } else if (event.type === 'set' && selectedHour && mode === 'date'){
      setShow(false)
      setFecha(selectedHour.getDate().toString() + '/' +
               (selectedHour.getMonth() + 1).toString() + '/' +
               selectedHour.getFullYear().toString())
    } else if (!selectedHour) {
      setShow(false)
      return
    }
  }

  const handlePress = () => {
    if(mod === 'date'){
      setMode('date')
    }
    setShow(true)
  }

  return (
    <>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          mode= {mode}
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
                source={image}
                style={{ width: 20, height: 20 }}
                />
            )}
        </View>
      </Pressable>
    </>
  )
}

export default SmallFieldFecha
