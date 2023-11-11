import * as React from 'react'
import { Text, View } from 'react-native'
import { useFormikContext } from 'formik'
import Input from '../../moleculas/Input'
import SecondaryButton from '../../atomos/SecondaryButton'
import FieldFormulario from '../../moleculas/FieldFormulario'
import SelectCreatableBatches from '../../moleculas/SelectCreatableBatches'
import CreatableAudioRecord from '../../organismos/CreatableAudioRecord'
import tw from 'twrnc'
import Spinner from '../../atomos/Spinner'
import {
  Alerta, RutaCoordinadas,
} from '../../../models/Alertas'
import { getColaboracionesRutas } from '../../../lib/services/rutas.services'
import { Audio } from 'expo-av'
import { BACKGROUND_COLORS, TEXT_COLORS, tipoAlertas, tiposUsuarios } from '../../../utils/constants'
import SelectInput from '../../atomos/SelectInput'
import MediaPicker from '../../organismos/MediaPicker'
import Gap from '../../atomos/Gap'
import SelectCreatableList from '../../moleculas/SelectCreatableList'
import FieldTitle from '../../atomos/FieldTitle'
import CustomSwitch from '../../atomos/CustomSwitch'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import * as Location from 'expo-location';
import { Bicicleta } from '../../../models/Bicicletas'
interface BicicletaFormularioProps {
  isSubmiting: boolean
}
const BicicletaContenidoFormulario = ({ isSubmiting }: BicicletaFormularioProps) => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const { values, setFieldValue, handleSubmit } = useFormikContext<Bicicleta>()
  const [colaboracionesCatalog, setColaboracionesCatalog] = React.useState([])
  const [hasCollaborations, setHasCollaborations] = React.useState(false)
  const [location, setLocation] = React.useState<RutaCoordinadas>()


  React.useEffect(() => {
    ; (async () => {
      if (authToken) {
        setColaboracionesCatalog(await getColaboracionesRutas(authToken))
      }

    })()
  }, [])


  const updateLocation = () => {
    setFieldValue('ubicacion', location)
  }


  // Función para manejar el tipo de alerta y actualizar la descripción
  const handleTipoAlertaChange = (value: string) => {
    setFieldValue('tipo', value)
    // Aquí puedes modificar la descripción en base al tipo de alerta seleccionado
    let descripcionPredeterminada = ''
    switch (value) {
      case 'tubo bajo':
        descripcionPredeterminada = 'Me quedé tubo bajo, necesito ayuda por favor'
        break
      case 'accidente':
        descripcionPredeterminada = 'Acabo de tener un accidente en mi bicicleta, necesito ayuda por favor!!'
        break
      case 'robo':
        descripcionPredeterminada = 'He sido victima de un robo mientras iba en mi bicicleta, necesito ayuda por favor'
        break
      case 'informativa':
        descripcionPredeterminada = '¡Hola a todos! Solo quería compartirles que estoy a punto de salir en mi bicicleta. ¡Les aviso para que estén al tanto y me envíen buenas vibras mientras pedaleo! ¡Nos vemos pronto!'
        break
      default:
        descripcionPredeterminada = ''
    }
    setFieldValue('descripcion', descripcionPredeterminada)
  }
  return (
    <>
      <FieldFormulario>
        <Input
          multiline
          numberOfLines={1}
          text="Código"
          type="none"
          name="codigo"
          value={values.codigo}
          textAlignVertical="top"
          stylesInput="pt-2"
          setValue={(value) => setFieldValue('codigo', value)}
          placeholder="Agrega el código de tu bicicleta..."
        />
        {/* Campo para ingresar la visibilidad de la alerta */}

      </FieldFormulario>

      <FieldFormulario>
        <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
          Tipo
        </Text>
        <SelectInput
          values={tipoAlertas}
          placeholder="Selecciona un tipo"
          setValuesSelected={handleTipoAlertaChange}
          selectedValue={values.tipo}
        />
      </FieldFormulario>

      <FieldFormulario>
        {/* Campo para ingresar la descripción */}
        <Input
          multiline
          numberOfLines={1}
          text="Marca"
          type="none"
          name="Marca"
          value={values.marca}
          textAlignVertical="top"
          stylesInput="pt-2"
          setValue={(value) => setFieldValue('marca', value)}
          placeholder="Especifica la marca de tu bicicleta..."
        />

      </FieldFormulario>

      <FieldFormulario>
        <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
          Multimedia
        </Text>
        
        <MediaPicker
          field="multimedia"
          setFieldValue={setFieldValue}
          values={values.imagen}
          icon={require('../../../../assets/multimedia.png')}
          placeholder="Puedes tomar fotos / videos o agregar desde la galeria"
        />
      </FieldFormulario>


      {/* Botón de publicar alerta o Spinner si se está enviando */}
      {isSubmiting ? (
        <Spinner />
      ) : (
        <View style={tw`flex flex-row justify-center items-center my-6`}>
          <SecondaryButton
            label="Registrar Bicicleta"
            handleClick={() => { handleSubmit(); updateLocation(); }}
            style={`${BACKGROUND_COLORS.ORANGE} w-48 shadow-sm`}
          />

        </View>
      )}
    </>
  )
}

export default BicicletaContenidoFormulario

