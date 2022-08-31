import * as React from 'react'
import { useSelector } from 'react-redux'
import { getRutasSinConfirmar } from '../../lib/services/user.services'
import { RootState } from '../../redux/store'
import SafeHomeModal from './SafeHomeModal'

const SafeView = () => {
  const [showSafeHome, setShowSafeHome] = React.useState(false)
  const [ruta, setruta] = React.useState({})
  const { authToken } = useSelector((state: RootState) => state.sesion)

  React.useEffect(() => {
    ;(async () => {
      if (authToken) {
        const rutaPendiente = await getRutasSinConfirmar(authToken)
        if (rutaPendiente) {
          setruta(rutaPendiente)
          setTimeout(() => {
            setShowSafeHome(true)
          }, 2000)
        }
      }
    })()
  }, [])

  return (
    <SafeHomeModal
      visible={showSafeHome}
      setVisible={setShowSafeHome}
      datosRuta={ruta}
    />
  )
}

export default SafeView
