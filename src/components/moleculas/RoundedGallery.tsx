import { ErrorMessage } from 'formik'
import * as React from 'react'
import {
  View,
  ImageSourcePropType,
  Image,
  TouchableHighlight,
} from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import tw from 'twrnc'
import { FOLDERS_STORAGE } from '../../utils/constants'
import { FieldError } from '../atomos/FieldError'
import { guardarArchivo } from '../../lib/googleCloudStorage'
import Spinner from '../atomos/Spinner'

interface RoundedGalleryProps {
  field: string
  icono?: ImageSourcePropType
  foto?: string
  handleChange: (path: string) => void
}

const RoundedGallery = ({
  icono,
  field,
  foto,
  handleChange,
}: RoundedGalleryProps) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const getFile = async () => {
    setIsLoading(true)
    const file = await DocumentPicker.getDocumentAsync()
    if (file.type !== 'cancel') {
      const path = await guardarArchivo(
        FOLDERS_STORAGE.USUARIOS,
        file.name,
        file.uri
      )
      handleChange(path)
    }
    setIsLoading(false)
  }

  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor="#E7F5FF"
      onPress={getFile}
      style={tw`w-40 h-40 rounded-full mx-auto ${
        isLoading ? 'bg-black bg-opacity-20' : ''
      }`}
    >
      <View style={tw`relative`}>
        {foto ? (
          <View style={tw`relative mx-auto`}>
            <Image
              source={{ uri: foto || '' }}
              style={{
                width: 150,
                height: 150,
                borderRadius: 150 / 2,
              }}
            />
          </View>
        ) : (
          <View>
            <View style={tw`mx-auto py-2`}>
              {icono && (
                <Image
                  source={require('../../../assets/user.png')}
                  style={{ width: 150, height: 150, borderRadius: 150 / 2 }}
                />
              )}
            </View>
            {field && (
              <View style={tw`mx-auto`}>
                <ErrorMessage name={field} render={FieldError} />
              </View>
            )}
          </View>
        )}
        {isLoading ? (
          <View style={tw`absolute top-20 left-20`}>
            <Spinner />
          </View>
        ) : null}
      </View>
    </TouchableHighlight>
  )
}

export default RoundedGallery
