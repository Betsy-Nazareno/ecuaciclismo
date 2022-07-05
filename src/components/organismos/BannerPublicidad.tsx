import * as React from 'react'
import Carousel from 'react-native-carousel-loop'
import { useDispatch, useSelector } from 'react-redux'
import { obtenerNovedades } from '../../../lib/services/novedades.services'
import { PublicidadInterface } from '../../../models/Publicidad.model'
import { RootState } from '../../../redux/store'
import { WIDTH_DIMENSIONS } from '../../../utils/constants'
import EmptyPublicidad from '../moleculas/EmptyPublicidad'
import Publicidad from '../moleculas/Publicidad'

const BannerPublicidad = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const { novedadHasModified } = useSelector(
    (state: RootState) => state.novedad
  )
  const [novedades, setNovedades] = React.useState<PublicidadInterface[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ;(async function () {
      const response = await obtenerNovedades(authToken || '')
      const novedades: PublicidadInterface[] = response.data
      setNovedades(novedades)
      setIsLoading(false)
    })()
  }, [novedadHasModified])

  return isLoading ? (
    <EmptyPublicidad />
  ) : (
    <Carousel
      delay={3000}
      autoplay
      style={{ width: WIDTH_DIMENSIONS, height: 100 }}
      isLooped
    >
      {novedades?.map((item, index) => {
        return <Publicidad key={index} data={item} />
      })}
    </Carousel>
  )
}

export default BannerPublicidad
