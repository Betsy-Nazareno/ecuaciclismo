import { ErrorMessage, useFormikContext } from 'formik'
import * as React from 'react'
import {
  Text,
  View,
  ImageSourcePropType,
  Image,
  TouchableHighlight,
} from 'react-native'
import { Consejo } from '../../../models/Consejo.model'
import * as DocumentPicker from 'expo-document-picker'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../../utils/constants'
import { FieldError } from './FieldError'
const CANCEL_TYPE = 'cancel'

interface GalleryButtonProps {
  field: string
  icono?: ImageSourcePropType
}

const GalleryButton = ({ icono, field }: GalleryButtonProps) => {
  const { values, setFieldValue } = useFormikContext<Consejo>()
  const imagen = values.imagen as ImageSourcePropType
  const getFile = async () => {
    const file = await DocumentPicker.getDocumentAsync()

    if (file.type !== CANCEL_TYPE) {
      setFieldValue(field, file)
    }
  }

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#E7F5FF"
      onPress={getFile}
    >
      {imagen ? (
        <View style={tw`relative mx-auto`}>
          <Image
            source={imagen}
            style={{
              width: 300,
              height: 150,
              borderRadius: 10 / 2,
            }}
          />

          <View
            style={tw`absolute bg-black bg-opacity-30 rounded-t-xl left-2 bottom-0 py-2 w-9/12`}
          >
            <Text style={tw`text-white font-bold text-center`}>
              Cambiar imágen
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <View style={tw`mx-auto py-2`}>
            {icono && (
              <Image source={icono} style={{ width: 100, height: 100 }} />
            )}
          </View>
          <Text style={tw`text-center ${TEXT_COLORS.DARK_GRAY}`}>
            Selecciona una imagen de tu galería
          </Text>
          {field && (
            <View style={tw`mx-auto`}>
              <ErrorMessage name={field} render={FieldError} />
            </View>
          )}
        </View>
      )}
    </TouchableHighlight>
  )
}

export default GalleryButton
