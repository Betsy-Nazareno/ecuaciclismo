import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'twrnc'
import HeaderScreen from '../../moleculas/HeaderScreen'
import { View, Text, Image, Pressable } from 'react-native'
import Carousel from 'react-native-carousel-loop'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { BACKGROUND_COLORS } from '../../../utils/constants'

interface RequisitosRegistroLocalSeguroProps {
    registerType: string
}

const RequisitosRegistroLocalSeguro = ({ registerType }: RequisitosRegistroLocalSeguroProps) => {
  const bankAccount : string = 'Bco. Pichincha\n105898632'
  const requisitos = [
    {
        title: 'Depósito',
        image: require('../../../../assets/deposito.png'),
        text: 'Ten a la mano una copia del comprobante de depósito por el registro del local.'
    },{
        title: 'Foto del local',
        image: require('../../../../assets/shop.png'),
        text: 'Toma una foto de tu local para que pueda ser mostrada dentro de la aplicación.'
    },{
        title: 'Formulario',
        image: require('../../../../assets/registration_form.png'),
        text: 'Llena el formulario con los datos requeridos, recuerda tener a la mano una copia de tu cédula de identidad.'
    },
  ]
  const navigation = useNavigation<NavigationProp<RootStackParamList, Screens>>()

  let requirements
  (registerType!=='Plan gratuito') ?
    requirements = requisitos :
    requirements = requisitos.filter((val)=>val.title!=='Depósito')

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`px-2 mb-8`}>
        <HeaderScreen
            title="Registro de local seguro"
            message="Forma parte de los locales seguros"
            srcImage={require('../../../../assets/registro_local.png')}
        />
        <View style={tw`flex flex-col justify-center items-center`}>
            <View style={tw`py-4 px-8 justify-center items-center`}>
                <Text style={tw`text-m text-black text-opacity-40 text-center font-bold`}>
                    Ten en cuenta los siguientes requisitos para registrarte como local seguro
                </Text>
            </View>

            <Carousel
                delay={8000}
                autoplay
                bullets
                style={{ width: 350, height: 400, }}
                isLooped
            >
                {requirements.map((requisito) => {
                    return (
                        <View style={tw`bg-[#0C3248] h-full rounded-lg flex flex-col items-center`}>
                            <Text style={tw`pt-4 pb-8 text-xl text-white text-center font-bold`}>
                                {requisito.title}
                            </Text>
                            <View style={tw`bg-[#D9D9D9] rounded-full w-50 h-50 flex flex-col items-center justify-center`}>
                                <Image source={requisito.image} style={{width: 100, height: 100,}}/>
                                {(requisito.title === 'Depósito') ? (
                                    <Text style={tw`text-m text-white text-center font-bold`}>
                                        {bankAccount}
                                    </Text>
                                    ) : null
                                }
                            </View>
                            <Text style={tw`pt-8 px-4 text-m text-white text-center`}>
                                {requisito.text}
                            </Text>
                        </View>
                    )
                })}
            </Carousel>
            <Pressable
              style={tw`${BACKGROUND_COLORS.ORANGE} rounded-3xl p-2 mt-4 w-30 items-center`}
              onPress={()=> navigation.navigate('RegistroLocalSeguroFormulario', {registerType})}
            >
              <Text style={tw`font-bold text-white`}>Ir al formulario</Text>
            </Pressable>
        </View>
    </ScrollView>
  )
}

export default RequisitosRegistroLocalSeguro
