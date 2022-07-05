import * as React from 'react'
import { Text, View, Image } from 'react-native'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import { RootState } from '../../../redux/store'
import { TEXT_COLORS } from '../../../utils/constants'

const UserInformation = () => {
  const { user } = useSelector((state: RootState) => state.user)
  return (
    <View style={tw`flex flex-row`}>
      <View style={tw`mr-4`}>
        <Image
          source={require('../../../assets/user.png')}
          style={{ width: 40, height: 45, borderRadius: 400 / 2 }}
        />
      </View>
      <View>
        <Text
          style={tw`font-bold text-white text-lg capitalize`}
        >{`${user?.first_name} ${user?.last_name}`}</Text>

        <Text style={tw`font-semibold ${TEXT_COLORS.ORANGE} text-sm`}>
          {user?.admin ? 'Administrador' : 'Ciclista'}
        </Text>
      </View>
    </View>
  )
}

export default UserInformation
