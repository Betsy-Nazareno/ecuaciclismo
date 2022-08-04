import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import {
  BACKGROUND_COLORS,
  HEIGHT_DIMENSIONS,
  TEXT_COLORS,
} from '../../../utils/constants'
import { CustomText } from '../../atomos/CustomText'
import { Calendar } from 'react-native-calendars'
import WithoutResults from '../../moleculas/WithoutResults'

const MiAgenda = () => {
  const [date, setDate] = React.useState('')
  return (
    <View
      style={[
        tw`${BACKGROUND_COLORS.BLUE_LIGHTER} px-2 pt-2`,
        { minHeight: HEIGHT_DIMENSIONS },
      ]}
    >
      <CustomText
        style={`${TEXT_COLORS.DARK_BLUE} text-3xl`}
        containerProps={{ textAlign: 'center' }}
      >
        Mi agenda
      </CustomText>
      <View style={tw`my-4`}>
        <Calendar
          style={{
            borderRadius: 20 / 2,
          }}
          theme={{
            selectedDayBackgroundColor: '#00adf5',
          }}
          markedDates={{
            '2022-07-30': {
              // selected: true,
              marked: true,
            },
            '2022-07-28': { marked: true },
            '2022-07-25': { marked: true, dotColor: 'red', activeOpacity: 0 },
            '2022-07-10': { disabled: true, disableTouchEvent: true },
            [date]: { selected: true },
          }}
          onDayPress={(day) => {
            setDate(day.dateString)
          }}
        />
      </View>

      {/* <View style={tw`bg-white rounded-md p-4`}>
          <CustomText style={`${TEXT_COLORS.DARK_BLUE} text-base`}>
            Ruta xyz
          </CustomText>
        </View> */}

      <WithoutResults styles="pt-2" dimension={150} />
    </View>
  )
}

export default MiAgenda
