import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

interface PermissionWrapperProps {
  tokenUserOwnerPublication: string | undefined
  children: React.ReactNode | React.ReactNode[]
}

const PermissionWrapper = ({
  tokenUserOwnerPublication,
  children,
}: PermissionWrapperProps) => {
  const { authToken, user } = useSelector((state: RootState) => state.user)

  const isOwner = tokenUserOwnerPublication === authToken
  const isAdmin = user?.admin

  if (!(isOwner || isAdmin)) {
    return null
  }
  return <>{children}</>
}

export default PermissionWrapper
