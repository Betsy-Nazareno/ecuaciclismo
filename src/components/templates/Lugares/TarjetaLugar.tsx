import * as React from 'react'
import { Pressable, Text} from "react-native"
import { Lugar } from "../../../models/Lugares"
import tw from 'twrnc'
import { BACKGROUND_COLORS, TEXT_COLORS } from "../../../utils/constants"
import { View, Image } from 'react-native'
import { CustomText } from "../../atomos/CustomText"
import LabelTipoLugar from "../../moleculas/LabelTipoLugar"
import Gap from '../../atomos/Gap'

interface TarjetaLugarProps {
    lugar: Lugar
    onClose: () => void
}
const TarjetaLugar = ({ lugar,onClose }: TarjetaLugarProps) => {
    const getTipo=()=>{
        if (lugar.local_seguro !== undefined && lugar.local_seguro === 1) {
            return 'local seguro';
          }
          return lugar.tipo;
          
    }
    return (
        <Pressable
            onPress={onClose}
            style={tw`my-1 relative overflow-hidden shadow-xl`}
        >
            <View 
            style={tw`rounded-xl py-2 px-2 ${BACKGROUND_COLORS.WHITE}`}
            >
                <CustomText style={`${TEXT_COLORS.DARK_BLUE} font-semibold`}>
                            {lugar.nombre}
                </CustomText>
                <View 
                style={tw`rounded-xl flex flex-row items-center py-2 px-2`}
                >
                
                    <Image 
                    source={{uri:lugar.imagen}}
                    style={{
                    width:70,
                    height:70,
                    borderRadius:5,    
                    }}
                    />
                    <View style={tw`pl-2 pr-11`}>
                        <Gap py="1">
                            <Text style={{ flexWrap: 'wrap' }}> {lugar.descripcion}</Text>
                        </Gap>
                        <LabelTipoLugar tipoLugar={getTipo()} />

                    </View>
                </View>
            </View>


        </Pressable>

      )
    }
    export default TarjetaLugar