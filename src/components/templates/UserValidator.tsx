import * as React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import tw from 'twrnc'
interface UserValidatorProps {
  children: React.ReactNode | React.ReactNode[]
  stylesProp?: string
}

const UserValidator = ({ children, stylesProp }: UserValidatorProps) => {
  const { user } = useSelector((state: RootState) => state.user)
  const [isAdmin, setIsAdmin] = React.useState(false)

  React.useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setIsAdmin(user?.admin || false)
    }
    return () => {
      isMounted = false
    }
  }, [])

  return !isAdmin ? (
    <View style={tw`${stylesProp || ''}`}>{children}</View>
  ) : null
}

export default UserValidator
