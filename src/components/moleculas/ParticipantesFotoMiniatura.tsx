import * as React from 'react'
import tw from 'twrnc'
import { View, Image } from 'react-native'
import ViewMoreRounded from '../atomos/ViewMoreRounded'
import { User } from '../../models/User'

interface ParticipantesFotoMiniaturaProps {
  dimensionImages?: number
  ciclistas?: Partial<User>[]
}

const ParticipantesFotoMiniatura = ({
  dimensionImages = 40,
  ciclistas,
}: ParticipantesFotoMiniaturaProps) => {
  const [usersDisplay, setUsersDisplay] = React.useState<Partial<User>[]>([])

  React.useEffect(() => {
    if (ciclistas && ciclistas.length > 10) {
      setUsersDisplay(ciclistas.splice(0, 10))
    } else {
      setUsersDisplay(ciclistas || [])
    }
  }, [])

  return (
    <View style={tw`flex flex-row`}>
      {usersDisplay?.map((ciclista, index) => {
        const foto = ciclista.foto
          ? { uri: ciclista.foto }
          : require('../../../assets/user.png')
        return (
          <Image
            key={index}
            source={foto}
            style={{
              width: dimensionImages,
              height: dimensionImages,
              borderRadius: 100 / 2,
              marginLeft: -10,
            }}
            resizeMode="contain"
          />
        )
      })}

      {ciclistas && ciclistas?.length > 10 ? (
        <ViewMoreRounded label="+10" dimension={dimensionImages} />
      ) : null}
    </View>
  )
}

export default ParticipantesFotoMiniatura
