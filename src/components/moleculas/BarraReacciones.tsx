import * as React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import {
  agregarReacciones,
  eliminarReaccion,
} from '../../../lib/services/reacciones.services'
import { Consejo } from '../../../models/Consejo.model'
import {
  ReaccionesInterface,
  ReaccionTypes,
} from '../../../models/Reacciones.model'
import { RootState } from '../../../redux/store'
import Reaccion from '../atomos/Reaccion'

export interface ReaccionesProps {
  // reacciones: ReaccionesInterface
  // token: string
  item: Consejo
}

const initValues = {
  encanta: { usuarios: [], reaccion_usuario: false },
  like: { usuarios: [], reaccion_usuario: false },
  apoyo: { usuarios: [], reaccion_usuario: false },
  fuerza: { usuarios: [], reaccion_usuario: false },
  ciclista: { usuarios: [], reaccion_usuario: false },
}

const Reacciones = ({ item }: ReaccionesProps) => {
  const [pulsedReactions, setPulsedReactions] =
    React.useState<ReaccionesInterface>(initValues)
  const { authToken } = useSelector((state: RootState) => state.user)
  const [isLoading, setIsLoading] = React.useState(false)

  React.useEffect(() => {
    setPulsedReactions(item?.reacciones || {})
  }, [item])

  const handleClick = async (name: ReaccionTypes) => {
    setIsLoading(true)
    const users = pulsedReactions[name]?.usuarios || []

    if (pulsedReactions[name]?.reaccion_usuario) {
      const filteredUsers = users.filter((user) => user !== authToken)
      setPulsedReactions({
        ...pulsedReactions,
        [name]: {
          usuarios: filteredUsers,
          reaccion_usuario: false,
        },
      })
      await eliminarReaccion(name, item.token || '', authToken || '')
    } else {
      setPulsedReactions({
        ...pulsedReactions,
        [name]: { usuarios: [...users, authToken], reaccion_usuario: true },
      })
      await agregarReacciones(name, item.token || '', authToken || '')
    }
    setIsLoading(false)
  }

  const getCountReaction = (name: ReaccionTypes) => {
    return pulsedReactions[name]?.usuarios?.length || 0
  }

  return (
    <View>
      <View style={tw`flex flex-row`}>
        <Reaccion
          image={require('../../../assets/like_reaccion_icon.png')}
          dimension={18}
          name="like"
          handleClick={handleClick}
          isSelected={pulsedReactions.like?.reaccion_usuario}
          countReaction={getCountReaction('like')}
          isLoading={isLoading}
        />

        <Reaccion
          image={require('../../../assets/fuerza_reaccion_icon.png')}
          dimension={18}
          name="fuerza"
          handleClick={handleClick}
          isSelected={pulsedReactions.fuerza?.reaccion_usuario}
          countReaction={getCountReaction('fuerza')}
          isLoading={isLoading}
        />

        <Reaccion
          image={require('../../../assets/encanta_reaccion_icon.png')}
          dimension={20}
          name="encanta"
          handleClick={handleClick}
          isSelected={pulsedReactions.encanta?.reaccion_usuario}
          countReaction={getCountReaction('encanta')}
          isLoading={isLoading}
        />

        <Reaccion
          image={require('../../../assets/ciclista_reaccion_icon.png')}
          dimension={18}
          name="ciclista"
          handleClick={handleClick}
          isSelected={pulsedReactions.ciclista?.reaccion_usuario}
          countReaction={getCountReaction('ciclista')}
          isLoading={isLoading}
        />

        <Reaccion
          image={require('../../../assets/apoyo_reaccion_icon.png')}
          dimension={18}
          name="apoyo"
          handleClick={handleClick}
          isSelected={pulsedReactions.apoyo?.reaccion_usuario}
          countReaction={getCountReaction('apoyo')}
          isLoading={isLoading}
        />
      </View>
    </View>
  )
}

export default Reacciones
