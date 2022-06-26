import * as React from 'react'
import { Text, View, Pressable } from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import tw from 'twrnc'
import {
  BACKGROUND_COLORS,
  BORDER_COLORS,
  TEXT_COLORS,
} from '../../../utils/constants'
import { useFormikContext } from 'formik'
import { Consejo } from '../../../models/Consejo.model'
const CANCEL_TYPE = 'cancel'

interface RoundedDashButtonProps {
  textoProp?: string
  field: string
}

const RoundedDashButton = ({ textoProp, field }: RoundedDashButtonProps) => {
  const { setFieldValue } = useFormikContext<Consejo>()
  const [text, setText] = React.useState(textoProp)

  const getFile = async () => {
    const file = await DocumentPicker.getDocumentAsync()

    if (file.type !== CANCEL_TYPE) {
      setText('Cambiar foto')
      setFieldValue(field, file)
    }
  }

  return (
    <Pressable onPress={getFile}>
      <View
        style={tw`rounded-3xl shadow-md px-4 py-2 ${BORDER_COLORS.GRAY} ${BACKGROUND_COLORS.BLUE_LIGHTER}`}
      >
        <Text style={tw`text-center ${TEXT_COLORS.DARK_BLUE}`}>{text}</Text>
      </View>
    </Pressable>
  )
}

export default RoundedDashButton
