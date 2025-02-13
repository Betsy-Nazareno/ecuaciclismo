import * as React from 'react'
import { ImageSourcePropType, Text, View } from 'react-native'
import { useFormikContext } from 'formik'
import Input from '../../moleculas/Input'
import SecondaryButton from '../../atomos/SecondaryButton'
import FieldFormulario from '../../moleculas/FieldFormulario'
import tw from 'twrnc'
import Spinner from '../../atomos/Spinner'
import { BACKGROUND_COLORS, TEXT_COLORS, tipoLugar, tipoServicio } from '../../../utils/constants'
import SelectInput from '../../atomos/SelectInput'
import { Lugar } from '../../../models/Lugares'
import GalleryButton from '../../moleculas/GalleryButton'
import UnfocusButton from '../../atomos/UnfocusButton'

interface LugarFormularioProps {
  isSubmiting: boolean
  onCancel: () => void
}
const LugarContenidoFormulario = ({ isSubmiting , onCancel}: LugarFormularioProps) => {
  const { values, setFieldValue, handleSubmit } =useFormikContext<Lugar>()
  return (
    <>
        <FieldFormulario>
            <Input
                text="Nombre del Lugar:"
                type="none"
                name="nombre"
                value={values.nombre}
                setValue={(value) => setFieldValue('nombre', value)}
                placeholder="Escribe el nombre del lugar..."
            />
        </FieldFormulario>


        <FieldFormulario>
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                Tipo de lugar
            </Text>
            <SelectInput
                values={tipoLugar}
                placeholder="Tipo de lugar:"
                setValuesSelected={(value) => setFieldValue('tipo', value)}
                selectedValue={values.tipo}
            />
        </FieldFormulario>

        <FieldFormulario>
            {/* Campo para ingresar la descripción */}
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
        </FieldFormulario>

        <FieldFormulario>
            <Input
                text="Ciudad:"
                type="none"
                name="ciudad"
                value={values.ciudad}
                setValue={(value) => setFieldValue('ciudad', value)}
                placeholder="Ciudad del lugar..."
            />
        </FieldFormulario>
        { values.tipo === 'parqueadero' && (
            <>
            <FieldFormulario>
                <Input
                  text="Capacidad:"
                  type="none"
                  name="capacidad"
                  value={values.capacidad}
                  setValue={(value) => setFieldValue('capacidad', value)}
                  placeholder="Cantidad de estacionamientos..."
                />
            </FieldFormulario>
            <FieldFormulario>
                <Input
                  text="Tarifa:"
                  type="none"
                  name="tarifa"
                  value={values.tarifa}
                  setValue={(value) => setFieldValue('tarifa', value)}
                  placeholder="Precio del parqueadero..."
                />
            </FieldFormulario>

            </>
        ) }
        { values.tipo === 'ciclovia' && (
            <FieldFormulario>
                <Input
                text="Longitud:"
                type="none"
                name="longitud"
                value={values.longitud}
                setValue={(value) => setFieldValue('longitud', value)}
                placeholder="50m..."
                />
            </FieldFormulario>
        )}
        { values.tipo === 'local' && (
            <FieldFormulario>
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                Tipo de servicio
            </Text>
            <SelectInput
                values={tipoServicio}
                placeholder="Servicio que ofrece..."
                setValuesSelected={(value) => setFieldValue('servicio', value)}
                selectedValue={values.servicio}
            />
            </FieldFormulario>
        )}

        <FieldFormulario>
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                    Foto del lugar:
            </Text>
            <FieldFormulario>
                <GalleryButton
                    field="imagen"
                    icono={require('../../../../assets/gallery_icon.png')}
                    imagen={values.imagen as ImageSourcePropType}
                />
            </FieldFormulario>
        </FieldFormulario>


      {/* Botón de publicar alerta o Spinner si se está enviando */}
      {isSubmiting ? (
        <Spinner />
      ) : (
        <View style={tw`flex flex-row justify-center items-center my-6`}>
        <UnfocusButton
            label="Cancelar"
            handleClick={onCancel}
            style={`${BACKGROUND_COLORS.GRAY} w-30 shadow-sm mr-4`}
        />
        <SecondaryButton
            label="Recomendar Lugar"
            handleClick={handleSubmit}
            style={`${BACKGROUND_COLORS.ORANGE} w-40 shadow-sm`}
        />
        </View>
      )}
    </>
  )
}

export default LugarContenidoFormulario