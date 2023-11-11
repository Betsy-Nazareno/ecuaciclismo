import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'twrnc'

import SectionTitle from '../../moleculas/SectionTitle'
import ListaBicicletas from './ListaBicicletas'
import { View, Image, TouchableHighlight } from 'react-native'
import { RootDrawerParamList, RootStackParamList, Screens } from '../../../models/Screens.types'
import { NavigationProp, useNavigation } from '@react-navigation/native'


const HistorialBicicletas = () => {
    const navigation =
        useNavigation<NavigationProp<RootDrawerParamList>>()

    return (
        <ScrollView style={tw`px-2 py-4`}>
            <View style={tw`mx-4`}>
                <SectionTitle
                    hasButton
                    isRestricted={false}
                    text="Mis Bicicletas"
                    styleText="text-3xl"
                    background={false}
                    buttonIcon={require('../../../../assets/plus.png')}
                    handleClickButton={() => navigation.navigate('BicicletaFormulario', { tokenUsuario: '' })}
                />
            </View>
            <ListaBicicletas />
        </ScrollView>
    )
}

export default HistorialBicicletas
