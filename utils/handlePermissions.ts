import { User } from '../models/User'

export const handlePermissions = (user: User) => {
  return user.admin
}
