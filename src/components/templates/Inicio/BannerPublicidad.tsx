import * as React from 'react'
import Carousel from 'react-native-carousel-loop'
import { useSelector } from 'react-redux'
import { obtenerNovedades } from '../../../lib/services/novedades.services'
import { NovedadInterface } from '../../../models/Novedad.model'
import { RootState } from '../../../redux/store'
import { WIDTH_DIMENSIONS } from '../../../utils/constants'
import EmptyNovedad from '../../organismos/EmptyNovedad'
import Novedad from './Novedad'

const BannerNovedad = () => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const { novedadHasModified } = useSelector(
    (state: RootState) => state.novedad
  )
  const [novedades, setNovedades] = React.useState<NovedadInterface[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    ;(async function () {
      const response = await obtenerNovedades(authToken || '')
      const novedades: NovedadInterface[] = response.data
      setNovedades(novedades)
      setIsLoading(false)
    })()
  }, [novedadHasModified])

  return isLoading ? (
    <EmptyNovedad />
  ) : (
    <Carousel
      delay={3000}
      autoplay
      style={{ width: WIDTH_DIMENSIONS, height: 100 }}
      isLooped
    >
      {novedades?.map((item, index) => {
        return <Novedad key={index} data={item} />
      })}
    </Carousel>
  )
}

export default BannerNovedad
