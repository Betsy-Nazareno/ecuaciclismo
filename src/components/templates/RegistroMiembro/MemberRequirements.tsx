import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'twrnc'
import HeaderScreen from '../../moleculas/HeaderScreen'
import { View, Text, Image, Pressable } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { BACKGROUND_COLORS, WIDTH_DIMENSIONS } from '../../../utils/constants'

const RequisitosRegistroLocalSeguro = () => {
  const [activeSlide, setActiveSlide] = React.useState(0)
  const bankAccount  = 'Bco. Pichincha\n105898632'
  const requisitos = [
    {
        title: 'Depósito',
        image: require('../../../../assets/deposito.png'),
        text: 'Ten a la mano una copia del depósito por el pago de la membresía.'
    },{
        title: 'Foto del local',
        image: require('../../../../assets/shop.png'),
        text: 'Necesitas haber participado en al menos una ruta. Recuerda tener a la mano una foto o captura de pantalla para verificarlo.'
    },{
        title: 'Formulario',
        image: require('../../../../assets/registration_form.png'),
        text: 'Llena el formulario con los datos requeridos, recuerda tener a la mano fotos de tu cédula de identidad (parte frontal y posterior) y una foto tuya.'
    },
  ]
  const navigation = useNavigation<NavigationProp<RootStackParamList, Screens>>()

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`px-2 mb-8`}>
        <HeaderScreen
            title="Registro de miembro"
            message="Forma parte de los miembros de la comunidad de Ecuaciclismo App"
            srcImage={require('../../../../assets/registro_local.png')}
        />
        <View style={tw`flex flex-col justify-center items-center`}>
            <View style={tw`py-4 px-8 justify-center items-center`}>
                <Text style={tw`text-m text-black text-opacity-40 text-center font-bold`}>
                    Ten en cuenta los siguientes requisitos para obtener tu membresía.
                </Text>
            </View>
            <View style={tw`flex-1 justify-center items-center`}>
              <Carousel
                data={requisitos}
                renderItem={({ item }) => (
                  <View style={tw`bg-[#0C3248] h-full rounded-lg flex flex-col items-center`}>
                    <Text style={tw`pt-4 pb-8 text-xl text-white text-center font-bold`}>
                      {item.title}
                    </Text>
                    <View style={tw`bg-[#D9D9D9] rounded-full w-50 h-50 flex flex-col items-center justify-center`}>
                      <Image source={item.image} style={{ width: 100, height: 100 }} />
                      {item.title === 'Depósito' ? (
                        <Text style={tw`text-m text-white text-center font-bold`}>
                          {bankAccount}
                        </Text>
                      ) : null}
                    </View>
                    <Text style={tw`pt-8 px-4 text-m text-white text-center`}>
                      {item.text}
                    </Text>
                  </View>
                )}
                sliderWidth={WIDTH_DIMENSIONS}
                itemWidth={350}
                loop
                autoplay
                enableSnap
                onSnapToItem={(index) => setActiveSlide(index)}
              />

              <Pagination
                dotsLength={requisitos.length}
                activeDotIndex={activeSlide}
                containerStyle={tw`mt-2`}
                dotStyle={tw`bg-primary`}
                inactiveDotStyle={tw`bg-gray-300`}
                dotContainerStyle={tw`px-2`}
                inactiveDotOpacity={0.6}
                inactiveDotScale={0.8}
              />

            </View>
            
            <Pressable
              style={tw`${BACKGROUND_COLORS.ORANGE} rounded-3xl p-2 mt-4 w-30 items-center`}
              onPress={()=> navigation.navigate('FormularioMiembro')}
            >
              <Text style={tw`font-bold text-white`}>Ir al formulario</Text>
            </Pressable>
        </View>
    </ScrollView>
  )
}

export default RequisitosRegistroLocalSeguro
