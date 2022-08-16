import * as React from 'react'
import tw from 'twrnc'
import { Image, Pressable, Text, View } from 'react-native'
import DetalleUsuario from './DetalleUsuario'

interface DetalleUsuarioColaboracionProps {
  user: any
}

const DetalleUsuarioColaboracion = ({
  user,
}: DetalleUsuarioColaboracionProps) => {
  const [display, setDisplay] = React.useState(false)
  return (
    <View style={tw`pt-2 pr-4`}>
      <View style={tw`flex flex-row justify-between items-center`}>
        <DetalleUsuario
          nombre={`${user.first_name} ${user.last_name}`}
          hasDate={false}
        />
        <Pressable onPress={() => setDisplay(!display)}>
          <Image
            source={require('../../../assets/chevron-abajo.png')}
            style={{
              width: 20,
              height: 20,
              ...(display
                ? { transform: [{ rotateY: '190deg' }, { scaleY: -1 }] }
                : {}),
            }}
          />
        </Pressable>
      </View>
      {display && (
        <View style={tw`ml-16`}>
          {user.colaboraciones?.map((colaboracion: string, index: number) => (
            <View style={tw`flex flex-row items-center py-1`} key={index}>
              <Image
                source={require('../../../assets/check_filled_icon.png')}
                style={{ width: 15, height: 15, marginRight: 8 }}
              />
              <Text>{colaboracion}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  )
}

export default DetalleUsuarioColaboracion
