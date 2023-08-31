import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'twrnc'
import HeaderScreen from '../../moleculas/HeaderScreen'
import { View, Text, Image, Pressable } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../../../models/Screens.types'
import { BACKGROUND_COLORS, WIDTH_DIMENSIONS } from '../../../utils/constants'

const MemberRegister = () => {
  const beneficios = [
    {
        title: 'Carnet de Ecuaciclimo', 
        image: require('../../../../assets/carnet.png'), 
        text: 'Obtienes el carnet de miembro de la comunidad de ecuaciclismo.'
    },{
        title: 'Fiesta aniversario', 
        image: require('../../../../assets/fiesta_aniversario.png'), 
        text: 'Asiste y celebra con nosotros en la fiesta de aniversario de Ecuaciclismo.'
    },{
        title: 'Descuentos',
        image: require('../../../../assets/descuentos.png'),
        text: 'Obtienes descuentos en repuestos y accesorios de bicicleta, además de descuentos en rutas.'
    },
  ]
  const planes = [
    {
        id: 1,
        title: 'Plan anual',
        price: '$25,00',
    },
  ]
  const navigation = useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const [isChecked, setIsChecked] = React.useState(0)
  //const [registerType, setRegisterType] = React.useState<string>('')

  const handleCheckboxChange = (text: string, id: number) => {
    if(isChecked!=id) {
        setIsChecked(id)
        //setRegisterType(text)
    }
  }
  
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`px-2 mb-8`}>
        <HeaderScreen
            title="Registro de miembro"
            message="Forma parte de los miembros de la comunidad de Ecuaciclismo App"
            srcImage={require('../../../../assets/registro_local.png')}
        />
        <View style={tw`flex flex-col justify-center items-center`}>
            <View style={tw`py-4 px-8 justify-center items-center`}>
                <Text style={tw`text-sm text-black text-opacity-40 text-center font-bold`}>
                    Accede a los siguientes beneficios con tu membresía
                </Text>
            </View>

            <View style={tw`mb-8 flex-1 justify-center items-center`}>
            <Carousel
                data={beneficios}
                renderItem={({ item }) => (
                    <View style={tw`bg-[#0C3248] h-full rounded-lg flex flex-col items-center w-full h-100`}>
                        <Text style={tw`pt-4 pb-8 text-xl text-white text-center font-bold`}>
                            {item.title}
                        </Text>
                        <View style={tw`bg-[#D9D9D9] rounded-full w-50 h-50 flex flex-col items-center justify-center`}>
                            {(item.title==='Carnet de Ecuaciclimo') ? (
                                <Image source={require('../../../../assets/favicon.png')} style={{ width: 80, height: 39 }} />
                            ) : null
                            }
                            <Image source={item.image} style={{ width: 75, height: 75 }} />
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
            />

            <Pagination
                dotsLength={beneficios.length}
                activeDotIndex={0} // Puedes cambiar esto para indicar el índice activo
                containerStyle={tw`mt-2`}
                dotStyle={tw`bg-primary`}
                inactiveDotStyle={tw`bg-gray-300`}
            />
    
            </View>

            {planes.map((plan) => {
                return (
                    // eslint-disable-next-line react/jsx-key
                    <Pressable
                        style={tw`rounded-xl w-5/6 my-1 p-2 flex flex-row items-center border border-[#2D84C4]`}
                        onPress={()=>handleCheckboxChange(plan.title, plan.id)}
                    >
                        
                        <View
                            style={tw`rounded-full w-8 h-8 ${(isChecked==plan.id)? 'bg-[#2D84C4]':'bg-[#D9D9D9] border border-black'}`}
                        />
                        
                        <View style={tw`flex flex-col w-9/12 px-2`}>
                            <Text style={tw`pr-2 text-xl text-black font-bold`}>{plan.title}</Text>                      
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
                    navigation.navigate('RequisitosMiembro')
                }}
                disabled={(isChecked==0)}
            >
                <Text style={tw`text-m font-bold text-white`}>Continuar</Text>
            </Pressable>
        </View>
    </ScrollView>
  )
}

export default MemberRegister
