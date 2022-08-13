import * as React from 'react'
import tw from 'twrnc'
import { Text, View, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import HeaderScreen from '../../moleculas/HeaderScreen'
import { Formik } from 'formik'
import FieldFormulario from '../../moleculas/FieldFormulario'
import Input from '../../moleculas/Input'
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../../utils/constants'
import GalleryButton from '../../moleculas/GalleryButton'
import Gap from '../../atomos/Gap'
import Ruler from '../../atomos/Ruler'
import FieldFechaHora from '../../moleculas/FieldFechaHora'
import SelectCreatableBatches from '../../moleculas/SelectCreatableBatches'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { getTiposRuta } from '../../../lib/services/rutas.services'
import SecondaryButton from '../../atomos/SecondaryButton'
import SelectInput from '../../atomos/SelectInput'

const PerfilForm = () => {
  const [tiposRuta, setTiposRuta] = React.useState([])
  const { authToken } = useSelector((state: RootState) => state.user)
  const initialValues = {
    first_name: '',
    last_name: '',
    foto: undefined,
    email: '',
    username: '',
    celular: '',
    fecha_nacimiento: undefined,
    genero: '',
    rutas_interes: [],
  }

  React.useEffect(() => {
    ;(async function () {
      authToken && setTiposRuta(await getTiposRuta(authToken))
    })()
  }, [])

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={tw`px-2 mb-8`}>
      <HeaderScreen
        title="Perfil"
        message="¡Presentate a la comunidad!"
        srcImage={require('../../../../assets/ciclista.png')}
      />

      <Formik
        initialValues={initialValues}
        onSubmit={() => {
          return
        }}
      >
        {({ handleSubmit, values, setFieldValue }) => (
          <>
            <FieldFormulario>
              <View style={tw`w-full flex items-center my-2 relative`}>
                <Image
                  source={require('../../../../assets/lorena.jpg')}
                  style={{ width: 200, height: 200, borderRadius: 200 / 2 }}
                />
              </View>
              <Gap py="1">
                <Input
                  text="Nombre"
                  type="none"
                  name="first_name"
                  value={values.first_name}
                  setValue={(value) => setFieldValue('first_name', value)}
                  placeholder="Nombre..."
                />
              </Gap>
              <Gap py="1">
                <Input
                  text="Apellido"
                  type="none"
                  name="last_name"
                  value={values.first_name}
                  setValue={(value) => setFieldValue('last_name', value)}
                  placeholder="Apellido..."
                />
              </Gap>

              <Ruler style="w-10/12 mx-auto bg-[#e6e6e6] my-4" />

              <Gap py="1">
                <Text
                  style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2 pb-1`}
                >
                  Fecha de nacimiento
                </Text>
                <FieldFechaHora
                  fecha={undefined}
                  setFecha={() => {
                    return
                  }}
                  placeholder="YY-MM-DD"
                />
              </Gap>

              {/* <Gap py="1">
                <Text
                  style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}
                >
                  Género
                </Text>
                <SelectCreatableBatches
                  values={[
                    { value: 'femenino', nombre: 'Femenino' },
                    { nombre: 'Masculino', value: 'masculino' },
                    { nombre: 'Otro', value: 'otro' },
                  ]}
                  selectedValues={[]}
                  setValuesSelected={() => {}}
                  deleteValue={() => {}}
                  placeholder="Femenino, Masculino, Otros..."
                  field={'etiquetas'}
                />
              </Gap> */}
              <Gap py="3">
                <Input
                  text="Correo Electrónico"
                  type="none"
                  name="email"
                  value={values.first_name}
                  setValue={(value) => setFieldValue('email', value)}
                  placeholder="alguien@ejemplo.com"
                />
              </Gap>

              <Gap py="3">
                <Input
                  text="Teléfono"
                  type="telephoneNumber"
                  name="telefono"
                  value={values.first_name}
                  setValue={(value) => setFieldValue('email', value)}
                  placeholder="+593 "
                />
              </Gap>

              <Ruler style="w-10/12 mx-auto bg-[#e6e6e6] my-4" />

              <Gap py="1">
                <Text
                  style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2 pb-1`}
                >
                  Rutas de interés
                </Text>
                <SelectCreatableBatches
                  values={tiposRuta}
                  selectedValues={values.rutas_interes}
                  setValuesSelected={(tipo) => {
                    const exists = values.rutas_interes.find(
                      (type: any) => type === tipo
                    )
                    if (!exists) {
                      setFieldValue('rutas_interes', [
                        ...(values.rutas_interes || []),
                        tipo,
                      ])
                    }
                  }}
                  deleteValue={(tipo) => {
                    setFieldValue('rutas_interes', [
                      ...(values.rutas_interes || []).filter(
                        (m: any) => m !== tipo
                      ),
                    ])
                  }}
                  placeholder="Montaña, Carretera..."
                  field={'rutas_interes'}
                />
              </Gap>

              <Gap py="3">
                <Text
                  style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2 pb-2`}
                >
                  Nivel
                </Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#e6e6e6',
                    borderStyle: 'solid',
                    borderRadius: 10,
                  }}
                >
                  <SelectInput
                    values={[
                      { nombre: 'Nivel Básico', value: 'basico' },
                      { nombre: 'Nivel Intermedio', value: 'intermedio' },
                      { nombre: 'Nivel Avanzado', value: 'avanzado' },
                    ]}
                    setValuesSelected={() => {
                      return
                    }}
                    placeholder="Básico, Intermedio, Avanzado..."
                  />
                </View>
              </Gap>

              <Ruler style="w-10/12 mx-auto bg-[#e6e6e6] my-4" />

              <Gap py="1">
                <Text
                  style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2 pb-1`}
                >
                  Modelo de bicicleta
                </Text>
                <Input
                  type="none"
                  name="email"
                  value={values.first_name}
                  setValue={(value) => setFieldValue('email', value)}
                  placeholder="Tipo..."
                />
                <Input
                  type="none"
                  name="email"
                  value={values.first_name}
                  setValue={(value) => setFieldValue('email', value)}
                  placeholder="Marca..."
                />
                <Input
                  type="none"
                  name="email"
                  value={values.first_name}
                  setValue={(value) => setFieldValue('email', value)}
                  placeholder="Código..."
                />
                <FieldFormulario>
                  <GalleryButton
                    field="imagen"
                    icono={require('../../../../assets/gallery_icon.png')}
                  />
                </FieldFormulario>
              </Gap>
              <SecondaryButton
                label="Guardar"
                handleClick={handleSubmit}
                style={`${BACKGROUND_COLORS.PRIMARY_BLUE} w-6/12 mx-auto mt-6`}
              />
            </FieldFormulario>
          </>
        )}
      </Formik>
    </ScrollView>
  )
}

export default PerfilForm
