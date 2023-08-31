import * as React from 'react'
import { Image, Text, View } from 'react-native'
import tw from 'twrnc'
import { TEXT_COLORS } from '../../utils/constants'

interface InformacionUsuarioProps {
  firstName: string
  lastName: string
  type?:string
  foto?: string
}

const InformacionUsuario = ({
  firstName,
  lastName,
  type='Administrador',
  foto,
}: InformacionUsuarioProps) => {
  let iconSource;
  if(type==='Administrador'){
    iconSource = require('../../../assets/admin.png');
  }else if (type === 'Verificado') {
    iconSource = require('../../../assets/verificado.png');
  } else if (type === 'Miembro') {
    iconSource = require('../../../assets/miembro.png');
  } else {
    // Si el tipo de usuario no es "verificado" ni "miembro", no mostramos ningún icono
    return null;
  }
  return (
    <View style={tw`flex flex-row pb-2`}>
      <Image
        source={foto ? { uri: foto } : require('../../../assets/user.png')}
        style={{ width: 40, height: 45, borderRadius: 400 / 2 }}
        resizeMode="contain"
      />
      <View style={tw`ml-[4%] mt-[1%]`}>
        <View style={tw`flex flex-row`}>
          <Text
            style={tw`text-base ${TEXT_COLORS.DARK_BLUE} font-semibold capitalize`}
          >
            {`${firstName} ${lastName}`}

          </Text>
          {iconSource!=null && (
          <Image
          source={iconSource}
          style={{
            width:20,
            height: 20,
            borderRadius: 400 / 2,
            marginTop:2,
          }}
          resizeMode="contain"
          />
        )}  
        </View>
        <Text style={tw`text-[11px] ${TEXT_COLORS.DARK_GRAY} font-semibold`}>
          {type}
        </Text>
      </View>
    </View>
  )
}

export default InformacionUsuario
