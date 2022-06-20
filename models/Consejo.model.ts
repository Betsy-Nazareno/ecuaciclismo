import { ImageSourcePropType } from 'react-native'
import { User } from './User'

export interface Consejo {
  image?: string | ImageSourcePropType
  text?: string
  user: User
}
