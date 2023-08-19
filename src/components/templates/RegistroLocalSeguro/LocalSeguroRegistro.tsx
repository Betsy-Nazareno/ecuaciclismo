import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'twrnc'
import HeaderScreen from '../../moleculas/HeaderScreen'
import { View, Text, Image, Pressable } from 'react-native'
import Carousel from 'react-native-carousel-loop'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { BACKGROUND_COLORS } from '../../../utils/constants'

const LocalSeguroRegistro = () => {
  const beneficios = [
    {
        title: 'Publicidad', 
        image: require('../../../../assets/publicidad.png'), 
        text: 'Publica tus servicios y productos en la aplicación para que los usuarios puedan verlo.'
    },
  ]
  const planes = [
    {
        id: 1,
        title: 'Plan anual',
        price: '$5,00',
        beneficio: ''
    },
    {
        id: 2,
        title: 'Plan gratuito',
        price: 'Gratis',
        beneficio: 'Sin beneficios'
    },
  ]
  const navigation = useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const [isChecked, setIsChecked] = React.useState(0)
  const [registerType, setRegisterType] = React.useState<string>('')

  const handleCheckboxChange = (text: string, id: number) => {
    if(isChecked!=id) {
        setIsChecked(id)
        setRegisterType(text)
    }
  }

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
                    Accede a los siguientes beneficios al adquirir el plan anual
                </Text>
            </View>

            <View style={tw`mb-8`}>
                <Carousel
                    delay={8000}
                    autoplay
                    bullets
                    style={{ width: 350, height: 400, }}
                    isLooped
                >
                    {beneficios.map((beneficio) => {
                        return (
                            <View style={tw`bg-[#0C3248] h-full rounded-lg flex flex-col items-center`}>
                                <Text style={tw`pt-4 pb-8 text-xl text-white text-center font-bold`}>
                                    {beneficio.title}
                                </Text>
                                <View style={tw`bg-[#D9D9D9] rounded-full w-50 h-50 flex flex-col items-center justify-center`}>
                                    <Image source={beneficio.image} style={{width: 100, height: 100,}}/>
                                </View>
                                <Text style={tw`pt-8 px-4 text-m text-white text-center`}>
                                    {beneficio.text}
                                </Text>
                            </View>
                        )
                    })}
                </Carousel>
            </View>
            {planes.map((plan) => {
                return (
                    <Pressable
                        style={tw`rounded-xl w-5/6 my-1 p-2 flex flex-row items-center border border-[#2D84C4]`}
                        onPress={()=>handleCheckboxChange(plan.title, plan.id)}
                    >
                        
                        <View
                            style={tw`rounded-full w-8 h-8 ${(isChecked==plan.id)? 'bg-[#2D84C4]':'bg-[#D9D9D9] border border-black'}`}
                        />
                        
                        <View style={tw`flex flex-col w-9/12 px-2`}>
                            <Text style={tw`pr-2 text-xl text-black font-bold`}>{plan.title}</Text>
                            {(plan.beneficio !=='') ?
                                (<Text style={tw`text-xs text-black text-opacity-40`}>{plan.beneficio}</Text>):
                                null
                            }                            
                        </View>
                        <View style={tw`right-0`}>
                            <Text style={tw`text-m text-black`}>
                                {plan.price}
                            </Text>
                        </View>
                    </Pressable>
                )
            })}

            <Pressable
                style={tw`${BACKGROUND_COLORS.ORANGE} rounded-3xl mt-4 py-2 w-30 items-center justify-center ${(isChecked!=0) ? 'opacity-100' : 'opacity-50'}`}
                onPress={()=> {
                    navigation.navigate('RegistroLocalSeguroRequisitos', {registerType})
                }}
                disabled={(isChecked==0)}
            >
                <Text style={tw`text-m font-bold text-white`}>Continuar</Text>
            </Pressable>
        </View>
    </ScrollView>
  )
}

export default LocalSeguroRegistro
