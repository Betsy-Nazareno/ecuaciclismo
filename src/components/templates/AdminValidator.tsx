import * as React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import tw from 'twrnc'
interface AdminValidatorProps {
  children: React.ReactNode | React.ReactNode[]
  stylesProp?: string
}

const AdminValidator = ({ children, stylesProp }: AdminValidatorProps) => {
  const { user } = useSelector((state: RootState) => state.user)
  const [isAdmin, setIsAdmin] = React.useState(false)

  React.useEffect(() => {
    setIsAdmin(user?.admin || false)
  }, [])

  return isAdmin ? (
    <View style={tw`${stylesProp || ''}`}>{children}</View>
  ) : null
}

export default AdminValidator
