import * as React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import tw from 'twrnc'

import SectionTitle from '../../moleculas/SectionTitle'
import ListaBicicletas from './ListaBicicletas'


const HistorialBicicletas = () => {

    return (
        <ScrollView style={tw`px-2 py-4`}>
            <SectionTitle text="Mis Bicicletas" />
            <ListaBicicletas />
        </ScrollView>
    )
}

export default HistorialBicicletas
