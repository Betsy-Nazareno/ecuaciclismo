import React from 'react'
import { Button, Image, View } from 'react-native'
import BasePaginas from '../components/templates/BasePaginas'
import { useAuthentication } from '../../hooks/useAuthentication'
import tw from 'twrnc'

const Perfil = () => {
  const { deleteUserStore } = useAuthentication()

  return (
    <BasePaginas>
      <View style={tw`mx-auto mt-[30%]  mb-[20%]`}>
        <Image
          source={require('../../assets/wip3.png')}
          style={{ width: 256, height: 256 }}
        />
      </View>
      <Button title="Cerrar sesion" onPress={deleteUserStore}></Button>
    </BasePaginas>
  )
}

export default Perfil
