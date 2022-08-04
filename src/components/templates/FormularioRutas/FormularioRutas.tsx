import * as React from 'react'
import tw from 'twrnc'
import { ScrollView, Text } from 'react-native'
import HeaderScreen from '../../moleculas/HeaderScreen'
import { Formik } from 'formik'
import { RutasValidationSchema } from '../../../schemas/RutasValidationSchema'
import FieldFormulario from '../../moleculas/FieldFormulario'
import Input from '../../moleculas/Input'
import {
  BACKGROUND_COLORS,
  catalogoRequisitos,
  TEXT_COLORS,
  tiposRuta,
} from '../../../utils/constants'
import SelectCreatableList from '../../moleculas/SelectCreatableList'
import GalleryMultiImages from '../../organismos/GalleryMultiImages'
import FieldFechaHora from '../../moleculas/FieldFechaHora'
import MapViewSelectUbication from '../../moleculas/MapViewSelectUbication'
import Spinner from '../../atomos/Spinner'
import SecondaryButton from '../../atomos/SecondaryButton'
import SelectCreatableBatches from '../../moleculas/SelectCreatableBatches'

const FormularioRutas = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const initialValues = {
    nombre: '',
    cupos: undefined,
    requisitos: [],
    tipoRuta: [],
    fotos: [],
    lugar: '',
    ubicacion: {
      coordinateX: {
        latitude: -2.1538019492930163,
        longitude: -79.88844282925129,
      },
      coordinateY: {
        latitude: -2.1453200715782175,
        longitude: -79.89056378602983,
      },
    },
    fechaInicio: new Date(Date.now()),
    fechaFin: new Date(Date.now()),
  }

  const handleSubmit = (prop: any) => {
    console.error(prop)
    setIsLoading(!isLoading)
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`px-2 mb-8`}>
      <HeaderScreen
        title="Rutas"
        message="¡Planifica actividades para la comunidad!"
        srcImage={require('../../../../assets/ruta_icon.png')}
      />
      <Formik
        initialValues={initialValues}
        validationSchema={RutasValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <>
            <FieldFormulario>
              <Input
                text="Nombre"
                type="none"
                name="nombre"
                placeholder="Nombre de la ruta..."
                value={values.nombre}
                setValue={(value) => setFieldValue('nombre', value)}
              />
            </FieldFormulario>

            <FieldFormulario>
              <Input
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                text="Descripcion"
                type="none"
                name="descripcion"
                placeholder="Agrega una descripción del evento..."
                value={values.nombre}
                setValue={(value) => setFieldValue('descripcion', value)}
              />
            </FieldFormulario>

            <FieldFormulario>
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                Tipo de Ruta
              </Text>
              <SelectCreatableBatches
                values={tiposRuta}
                selectedValues={values.tipoRuta}
                setValuesSelected={(tipo) => {
                  const exists = values.tipoRuta.find((type) => type === tipo)
                  if (!exists) {
                    setFieldValue('tipoRuta', [
                      ...(values.tipoRuta || []),
                      tipo,
                    ])
                  }
                }}
                deleteValue={(tipo) => {
                  setFieldValue('tipoRuta', [
                    ...(values.tipoRuta || []).filter((m) => m !== tipo),
                  ])
                }}
                placeholder="Montaña, Carretera..."
                field={'tiposRuta'}
              />
            </FieldFormulario>

            <FieldFormulario>
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                Requisitos
              </Text>
              <SelectCreatableList
                field="requisitos"
                placeholder="Insumos, Nivel de ciclista..."
                values={catalogoRequisitos}
                selectedValues={values.requisitos}
                setValuesSelected={(valor) => {
                  const exists = values.requisitos.find(
                    (requisito) => requisito === valor
                  )
                  if (!exists) {
                    setFieldValue('requisitos', [
                      ...(values.requisitos || []),
                      valor,
                    ])
                  }
                }}
                deleteValue={(valor) => {
                  setFieldValue('requisitos', [
                    ...(values.requisitos || []).filter((m) => m !== valor),
                  ])
                }}
              />
            </FieldFormulario>

            <FieldFormulario>
              <Input
                text="Cupos disponibles"
                type="none"
                name="cupos"
                placeholder="Cantidad de participantes admitidos..."
                value={values.cupos}
                setValue={(value) => setFieldValue('cupos', value)}
              />
            </FieldFormulario>

            <FieldFormulario>
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                Fotos
              </Text>
              <GalleryMultiImages
                field="fotos"
                setFieldValue={setFieldValue}
                values={values.fotos}
                allowedFiles={['image/*']}
                icon={require('../../../../assets/ruta_gallery.png')}
                placeholder="¡Agrega algunas imágenes de la ruta!"
              />
            </FieldFormulario>

            <FieldFormulario>
              <Input
                text="Lugar"
                type="none"
                name="lugar"
                placeholder="Añade una referencia del punto de partida..."
                value={values.lugar}
                setValue={(value) => setFieldValue('lugar', value)}
              />
            </FieldFormulario>

            <FieldFormulario>
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                Fecha de inicio
              </Text>
              <FieldFechaHora
                fecha={values.fechaInicio}
                setFecha={(value) => setFieldValue('fechaInicio', value)}
              />
            </FieldFormulario>

            <FieldFormulario>
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                Fecha de finalización
              </Text>
              <FieldFechaHora
                fecha={values.fechaFin}
                setFecha={(value) => setFieldValue('fechaFin', value)}
              />
            </FieldFormulario>

            <FieldFormulario>
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                Ubicacion
              </Text>
              <MapViewSelectUbication
                select
                field="ubicacion"
                setField={setFieldValue}
                value={values.ubicacion}
              />
            </FieldFormulario>

            {isLoading ? (
              <Spinner />
            ) : (
              <SecondaryButton
                label="Publicar"
                handleClick={handleSubmit}
                style={`${BACKGROUND_COLORS.PRIMARY_BLUE} w-6/12 mx-auto mt-6`}
              />
            )}
          </>
        )}
      </Formik>
    </ScrollView>
  )
}

export default FormularioRutas
