import React from 'react'
import BasePaginas from '../components/templates/BasePaginas'
import Consejos from '../components/templates/Inicio/Consejos'
import BannerPublicidad from '../components/templates/Inicio/BannerPublicidad'
import SectionTitle from '../components/moleculas/SectionTitle'
import AdminValidator from '../components/templates/AdminValidator'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList, Screens } from '../models/Screens.types'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store'
import { setHasModified } from '../redux/consejo'
import { setNovedadHasModified } from '../redux/novedad'

const Inicio = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, Screens>>()
  const { hasModified } = useSelector((state: RootState) => state.consejo)
  const dispatch = useDispatch()
  const { novedadHasModified } = useSelector(
    (state: RootState) => state.novedad
  )

  const onRefresh = async () => {
    dispatch(setHasModified({ hasModified: !hasModified }))
    dispatch(setNovedadHasModified({ novedadHasModified: !novedadHasModified }))
  }

  return (
    <BasePaginas stickyIndexes={[1]} handleRefresh={onRefresh}>
      <AdminValidator stylesProp="py-4 px-2">
        <SectionTitle
          text="Novedades"
          hasButton
          buttonIcon={require('../../assets/plus.png')}
          handleClickButton={() => navigation.navigate('NovedadFormulario')}
        />
      </AdminValidator>
      <BannerPublicidad />
      <Consejos />
    </BasePaginas>
  )
}

export default Inicio
