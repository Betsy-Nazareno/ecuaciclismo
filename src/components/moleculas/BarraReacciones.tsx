import * as React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import {
  agregarReacciones,
  eliminarReaccion,
} from '../../lib/services/reacciones.services'
import { Consejo } from '../../models/Consejo.model'
import { Publicacion } from '../../models/Publicaciones.model'
import {
  ReaccionesInterface,
  ReaccionTypes,
} from '../../models/Reacciones.model'
import { RootState } from '../../redux/store'
import Reaccion from '../atomos/Reaccion'

export interface ReaccionesProps {
  item?: Consejo | Publicacion
  type: 'Consejo' | 'Publicacion'
}

const initValues = {
  encanta: { usuarios: [], reaccion_usuario: false },
  like: { usuarios: [], reaccion_usuario: false },
  apoyo: { usuarios: [], reaccion_usuario: false },
  fuerza: { usuarios: [], reaccion_usuario: false },
  ciclista: { usuarios: [], reaccion_usuario: false },
}

const Reacciones = ({ item, type }: ReaccionesProps) => {
  const [pulsedReactions, setPulsedReactions] =
    React.useState<ReaccionesInterface>(initValues)
  const { authToken } = useSelector((state: RootState) => state.user)

  React.useEffect(() => {
    setPulsedReactions(item?.reacciones || {})
  }, [item])

  const handleClick = async (name: ReaccionTypes, alreadySelected: boolean) => {
    if (alreadySelected && authToken) {
      await eliminarReaccion(name, item?.token || '', authToken, type)
    } else if (authToken) {
      await agregarReacciones(name, item?.token || '', authToken, type)
    }
  }

  return (
    <View>
      <View style={tw`flex flex-row`}>
        <Reaccion
          image={require('../../../assets/like_reaccion_icon.png')}
          dimension={18}
          name="like"
          handleClick={handleClick}
          reaccionObject={pulsedReactions?.like}
          isSelected={pulsedReactions.like?.reaccion_usuario}
        />

        <Reaccion
          image={require('../../../assets/fuerza_reaccion_icon.png')}
          dimension={18}
          name="fuerza"
          handleClick={handleClick}
          reaccionObject={pulsedReactions?.fuerza}
          isSelected={pulsedReactions.fuerza?.reaccion_usuario}
        />

        <Reaccion
          image={require('../../../assets/encanta_reaccion_icon.png')}
          dimension={20}
          name="encanta"
          handleClick={handleClick}
          reaccionObject={pulsedReactions?.encanta}
          isSelected={pulsedReactions.encanta?.reaccion_usuario}
        />

        <Reaccion
          image={require('../../../assets/ciclista_reaccion_icon.png')}
          dimension={18}
          name="ciclista"
          handleClick={handleClick}
          reaccionObject={pulsedReactions?.ciclista}
          isSelected={pulsedReactions.ciclista?.reaccion_usuario}
        />

        <Reaccion
          image={require('../../../assets/apoyo_reaccion_icon.png')}
          dimension={18}
          name="apoyo"
          handleClick={handleClick}
          reaccionObject={pulsedReactions?.apoyo}
          isSelected={pulsedReactions.apoyo?.reaccion_usuario}
        />
      </View>
    </View>
  )
}

export default Reacciones
