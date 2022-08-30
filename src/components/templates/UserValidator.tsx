import * as React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import tw from 'twrnc'
interface UserValidatorProps {
  children: React.ReactNode | React.ReactNode[]
  stylesProp?: string
  userToken: string
}

const UserValidator = ({
  userToken,
  children,
  stylesProp,
}: UserValidatorProps) => {
  const { user } = useSelector((state: RootState) => state.user)

  return userToken === user?.id_usuario ? (
    <View style={tw`${stylesProp || ''}`}>{children}</View>
  ) : null
}

export default UserValidator
