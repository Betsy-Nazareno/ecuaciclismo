import * as React from 'react'
import Carousel from 'react-native-carousel-loop'
import { useSelector } from 'react-redux'
import { obtenerNovedades } from '../../../lib/services/novedades.services'
import { PublicidadInterface } from '../../../models/Publicidad.model'
import { RootState } from '../../../redux/store'
import { WIDTH_DIMENSIONS } from '../../../utils/constants'
import Publicidad from '../moleculas/Publicidad'

const BannerPublicidad = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const [novedades, setNovedades] = React.useState<PublicidadInterface[]>([])

  React.useEffect(() => {
    ;(async function () {
      const response = await obtenerNovedades(authToken || '')
      const novedades: PublicidadInterface[] = response.data
      setNovedades(novedades)
    })()
  }, [])

  return (
    <Carousel
      delay={3000}
      autoplay
      style={{ width: WIDTH_DIMENSIONS, height: 100 }}
    >
      {novedades?.map((item, index) => {
        return <Publicidad key={index} data={item} />
      })}
    </Carousel>
  )
}

export default BannerPublicidad
