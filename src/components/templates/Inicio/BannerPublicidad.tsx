import * as React from 'react'
import Carousel from 'react-native-snap-carousel';
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
      data={novedades}
      renderItem={({ item }) => (
        <Novedad data={item} />
      )}
      sliderWidth={WIDTH_DIMENSIONS}
      itemWidth={WIDTH_DIMENSIONS}
      layout={'default'}
      autoplay
      autoplayDelay={3000}
      loop
    />
  )
}

export default BannerNovedad
