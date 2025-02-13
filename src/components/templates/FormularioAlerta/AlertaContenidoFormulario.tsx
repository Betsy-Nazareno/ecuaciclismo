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
interface AlertaFormularioProps {
  isSubmiting: boolean
}
const AlertaContenidoFormulario = ({ isSubmiting }: AlertaFormularioProps) => {
  const { authToken } = useSelector((state: RootState) => state.user)
  const { values, setFieldValue, handleSubmit } = useFormikContext<Alerta>()
  const [colaboracionesCatalog, setColaboracionesCatalog] = React.useState([])
  const [hasCollaborations, setHasCollaborations] = React.useState(false)
  const [location, setLocation] = React.useState<RutaCoordinadas>()


  React.useEffect(() => {
    ; (async () => {
      if (authToken) {
        setColaboracionesCatalog(await getColaboracionesRutas(authToken))
      }
      getLocationAsync();
    })()
  }, [])
  React.useEffect(() => {
    if (values) {
      setHasCollaborations(!!(values.colaboraciones.length > 0))

    }
  }, [values])
  const addAudio = (audio: Audio.Recording) => {
    const { audios } = values
    setFieldValue('audios', [...(audios || []), audio])
  }

  const deleteAudio = (uri: string) => {
    const { audios } = values
    setFieldValue('audios', [
      ...(audios || []).filter((audio) => {
        return audio._uri !== uri
      }),
    ])
  }
  //obtener ubicacion
  const getLocationAsync = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        const temp = {
          coordinateX: {
            latitude: -2.1538019492930163,
            longitude: -79.88844282925129,
          },
          coordinateY: {
            latitude: -2.1453200715782175,
            longitude: -79.89056378602983,
          }
        }
        setLocation(temp);
        return { errorMsg: 'Permiso de ubicación denegado', coordinates: null };
      }

      const locationTemp = await Location.getCurrentPositionAsync({});
      const temp = {
        coordinateX: {
          latitude: locationTemp.coords.latitude,
          longitude: locationTemp.coords.longitude,
        },
        coordinateY: {
          latitude: -2.1453200715782175,
          longitude: -79.89056378602983,
        }
      }
      setLocation(temp);

    } catch (error) {
      console.log(error);

    }
  }
  const updateLocation = () => {
    setFieldValue('ubicacion', location)
  }
  const addVisibilidad = (value: string) => {
    const exists = values.visibilidad.find((tipoUsuario) => tipoUsuario === value)
    if (!exists) {
      const { visibilidad } = values
      setFieldValue('visibilidad', [...(visibilidad || []), value])
    }
  }
  const deleteVisibilidad = (value: string) => {
    const { visibilidad } = values
    setFieldValue('visibilidad', [
      ...(visibilidad || []).filter((user) => user !== value),
    ])
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
      <FieldFormulario >
        <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
          Visibilidad
        </Text>
        <SelectCreatableBatches
          values={tiposUsuarios}
          accessibilityLabel='visibilidad'
          selectedValues={values.visibilidad}
          setValuesSelected={addVisibilidad}
          deleteValue={deleteVisibilidad}
          placeholder="Selecciona la visibilidad de la alerta"
          field={'visibilidad'}
        />
      </FieldFormulario>

      <FieldFormulario>
        <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
          Tipo de Alerta
        </Text>
        <SelectInput
          values={tipoAlertas}
          accessibilityLabel='tipo'
          placeholder="Selecciona un tipo"
          setValuesSelected={handleTipoAlertaChange}
          selectedValue={values.tipo}
        />
      </FieldFormulario>

      <FieldFormulario>
        <Input
          multiline
          numberOfLines={6}
          text="Descripción"
          type="none"
          name="descripcion"
          value={values.descripcion}
          textAlignVertical="top"
          stylesInput="pt-2"
          setValue={(value) => setFieldValue('descripcion', value)}
          placeholder="Agrega una descripción..."
        />
        <Gap py="2">
          <View style={tw`flex flex-row items-center justify-between`}>
            <FieldTitle text="Colaboraciones de los ciclistas" />
            <CustomSwitch
              handleClick={() => setHasCollaborations(!hasCollaborations)}
              active={hasCollaborations}
            />
          </View>
          {hasCollaborations ? (
            <SelectCreatableList
              field="colaboraciones"
              placeholder="Gasas, Alcohol..."
              values={colaboracionesCatalog}
              selectedValues={values.colaboraciones}
              setValuesSelected={(valor) => {
                const exists = values.colaboraciones.find(
                  (colaboracion) => colaboracion === valor
                )
                if (!exists) {
                  setFieldValue('colaboraciones', [
                    ...(values.colaboraciones || []),
                    valor,
                  ])
                }
              }}
              deleteValue={(valor) => {
                setFieldValue('colaboraciones', [
                  ...(values.colaboraciones || []).filter(
                    (m) => m !== valor
                  ),
                ])
              }}
            />
          ) : null}
        </Gap>
      </FieldFormulario>

      <FieldFormulario>
        <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
          Multimedia
        </Text>
        <MediaPicker
          field="multimedia"
          setFieldValue={setFieldValue}
          values={values.multimedia}
          icon={require('../../../../assets/multimedia.png')}
          placeholder="Puedes tomar fotos / videos o agregar desde la galeria"
        />
      </FieldFormulario>
      <FieldFormulario>
        <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
          Audios
        </Text>
        {/* Campo para ingresar archivos de audio */}
        <CreatableAudioRecord
          field="audios"
          setField={addAudio}
          values={values.audios}
          deleteValue={deleteAudio}
        />
      </FieldFormulario>

      {/* Botón de publicar alerta o Spinner si se está enviando */}
      {isSubmiting ? (
        <Spinner />
      ) : (
        <View style={tw`flex flex-row justify-center items-center my-6`}>
          <SecondaryButton
            label="Enviar Alerta"
            handleClick={() => { handleSubmit(); updateLocation(); }}
            style={`${BACKGROUND_COLORS.ORANGE} w-48 shadow-sm`}
          />

        </View>
      )}
    </>
  )
}

export default AlertaContenidoFormulario

