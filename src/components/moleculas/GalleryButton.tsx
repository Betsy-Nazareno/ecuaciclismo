import { ErrorMessage, useFormikContext } from 'formik'
import * as React from 'react'
import {
  Text,
  View,
  ImageSourcePropType,
  Image,
  TouchableHighlight,
} from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import tw from 'twrnc'
import { DOCUMENT_RESULT_TYPES, TEXT_COLORS } from '../../utils/constants'
import { FieldError } from '../atomos/FieldError'

interface GalleryButtonProps {
  field: string
  icono?: ImageSourcePropType
  imagen?: ImageSourcePropType
}

const GalleryButton = ({ icono, field, imagen }: GalleryButtonProps) => {
  const { setFieldValue } = useFormikContext<any>()

  const getFile = async () => {
    const file = await DocumentPicker.getDocumentAsync()
    if (file.type !== DOCUMENT_RESULT_TYPES.CANCEL) {
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
