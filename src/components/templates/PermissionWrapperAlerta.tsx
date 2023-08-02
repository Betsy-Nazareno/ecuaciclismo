import * as React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

interface PermissionWrapperProps {
  tokenUserOwnerAlerta: string | undefined
  children: React.ReactNode | React.ReactNode[]
}

const PermissionWrapperAlerta = ({
  tokenUserOwnerAlerta,
  children,
}: PermissionWrapperProps) => {
  const { authToken, user } = useSelector((state: RootState) => state.user)

  const isOwner = tokenUserOwnerAlerta === authToken

  if (!isOwner ) {
    return null
  }
  return <>{children}</>
}

export default PermissionWrapperAlerta