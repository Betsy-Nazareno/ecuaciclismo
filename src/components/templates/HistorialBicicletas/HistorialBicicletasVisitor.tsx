import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'twrnc'

import SectionTitle from '../../moleculas/SectionTitle'
import ListaBicicletas from './ListaBicicletas'
import { View, Image, TouchableHighlight } from 'react-native'
import { RootDrawerParamList, RootStackParamList, Screens } from '../../../models/Screens.types'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import ListaBicicletasVisitor from './ListaBicicletasVisitor'

interface HistorialBicicletasVisitorProps {
    token_usuario: string;
}
const HistorialBicicletasVisitor = ({token_usuario}:HistorialBicicletasVisitorProps) => {
    console.log(token_usuario)
    return (
        <ScrollView style={tw`px-2 py-4`}>
            <View style={tw`mx-4`}>
                <SectionTitle
                    hasButton
                    isRestricted={false}
                    text="Bicicletas"
                    styleText="text-3xl"
                    background={false}
                />
            </View>
            <ListaBicicletasVisitor token_usuario={token_usuario} />
        </ScrollView>
    )
}

export default HistorialBicicletasVisitor
