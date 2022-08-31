import * as React from 'react'
import tw from 'twrnc'
import { Image, ImageSourcePropType, ScrollView, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { Coordinate } from '../../models/Rutas'

interface SearchLocationProps {
  setCoordinates: (vale: Coordinate) => void
  placeholder: string
  iconSrc: ImageSourcePropType
  dimensionIcon?: number
}

const SearchLocation = ({
  placeholder,
  iconSrc,
  setCoordinates,
  dimensionIcon = 20,
}: SearchLocationProps) => {
  return (
    <ScrollView
      horizontal={true}
      style={{ width: '100%' }}
      keyboardShouldPersistTaps={'handled'}
    >
      <View style={tw`mt-3 ml-2`}>
        <Image
          source={iconSrc}
          style={{ width: dimensionIcon, height: dimensionIcon, opacity: 0.3 }}
        />
      </View>
      <GooglePlacesAutocomplete
        placeholder={placeholder}
        onPress={(data, details = null) => {
          const { lat: latitude, lng: longitude } =
            details?.geometry.location || {}
          if (data && latitude && longitude) {
            setCoordinates({ latitude, longitude })
          }
        }}
        query={{
          key: 'AIzaSyDMi7l9iptdGvFXZ4FgkBlmFquHvzZxpmU',
          language: 'es',
          components: 'country:ec',
        }}
        enablePoweredByContainer={false}
        disableScroll
        fetchDetails={true}
        styles={{
          textInput: {
            height: 44,
            borderRadius: 5,
            paddingVertical: 5,
            fontSize: 15,
          },
        }}
      />
    </ScrollView>
  )
}

export default SearchLocation
