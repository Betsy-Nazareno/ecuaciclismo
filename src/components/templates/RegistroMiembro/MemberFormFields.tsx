import { useFormikContext } from 'formik'
import * as React from 'react'
import { Text, View, Pressable } from 'react-native'
import {
  BACKGROUND_COLORS,
  TEXT_COLORS,
} from '../../../utils/constants'
import Input from '../../moleculas/Input'
import SecondaryButton from '../../atomos/SecondaryButton'
import FieldFormulario from '../../moleculas/FieldFormulario'
import tw from 'twrnc'
import GalleryMultiImages from '../../organismos/GalleryMultiImages'
import SmallFieldTime from '../../moleculas/SmallFieldTime'
import { RegistroMiembro } from '../../../models/RegistroMiembro'

const FormularioRegistroLocalSeguroCampos = () => {
  const { values, setFieldValue, handleSubmit } = useFormikContext<RegistroMiembro>()
  const [ showField, setShowField ] = React.useState<boolean>(false)
  const [ isChecked, setIsChecked ] = React.useState(0)
 
  React.useEffect(() => {
    (values.seguro_med === 'No') ? setIsChecked(2) :
      (values.seguro_med !== '') ? setIsChecked(1) : null
  }, [])

  return (
    <>
        <FieldFormulario>
            <Input
            text="Nombre completo"
            type="none"
            name="nombre"
            value={values.nombre}
            setValue={(value) => setFieldValue('nombre', value)}
            placeholder="Ingrese su nombre completo"
            />
        </FieldFormulario>

        <FieldFormulario>
            <Input
            text="Cedula de identidad"
            type="none"
            name="num_ced"
            value={values.num_ced}
            setValue={(value) => setFieldValue('num_ced', value)}
            placeholder="Ingrese su número de cedula"
            />
        </FieldFormulario>

        <FieldFormulario>
          <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
            Fecha de nacimiento
          </Text>

          <View style={tw`flex flex-row justify-center items-center`}>
            <SmallFieldTime
              hora = {values.fecha_nacimiento}
              setFecha={(value) => {setFieldValue('fecha_nacimiento', value)}}
              mod='date'
            />
          </View>
        </FieldFormulario>

        <FieldFormulario>
            <Input
            text="Celular"
            type="none"
            name="celular"
            value={values.celular}
            setValue={(value) => setFieldValue('celular', value)}
            placeholder="Ingrese su número celular"
            />
        </FieldFormulario>

        <FieldFormulario>
            <Input
            text="Dirección"
            type="none"
            name="direccion"
            value={values.direccion}
            setValue={(value) => setFieldValue('direccion', value)}
            placeholder="Ingrese su dirección"
            />
        </FieldFormulario>

        <FieldFormulario>
            <Input
            text="Ciudad"
            type="none"
            name="ciudad"
            value={values.ciudad}
            setValue={(value) => setFieldValue('ciudad', value)}
            placeholder="Ingrese su ciudad"
            />
        </FieldFormulario>

        <FieldFormulario>
            <Input
            text="Ocupación"
            type="none"
            name="ocupacion"
            value={values.ocupacion}
            setValue={(value) => setFieldValue('ocupacion', value)}
            placeholder="Ingrese su ocupación"
            />
        </FieldFormulario>

        <FieldFormulario>
          <View style={tw`flex flex-col`}>
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
              ¿Cuenta con seguro médico?
            </Text>
            <Pressable style={tw`my-1 p-2 flex flex-row items-center`} onPress={() => {
              setIsChecked(1)
              setShowField(true)
            }}>
              <View
                style={tw`rounded-full w-5 h-5 ${(isChecked == 1)? 'bg-[#2D84C4]':'bg-[#D9D9D9] border border-black'}`}
              />
              <Text style={tw`ml-2 text-m text-black`}>Sí</Text>
            </Pressable>
            <Pressable style={tw`my-1 p-2 flex flex-row items-center`} onPress={()=> {
              setIsChecked(2)
              setShowField(false)
              setFieldValue('seguro_med', 'No')
            }}>
              <View
                style={tw`rounded-full w-5 h-5 ${(isChecked == 2)? 'bg-[#2D84C4]':'bg-[#D9D9D9] border border-black'}`}
              />
              <Text style={tw`ml-2 text-m text-black`}>No</Text>
            </Pressable>
            {(showField) ? (
              <Input
                text="Indique cuál"
                type="none"
                name="seguro_med"
                value={values.seguro_med}
                setValue={(value) => setFieldValue('seguro_med', value)}
                placeholder="Ingrese su seguro médico"
              />
            ) : null
            }
          </View>
        </FieldFormulario>

        <FieldFormulario>
            <Input
            text="Tipo de sangre"
            type="none"
            name="tipo_sangre"
            value={values.tipo_sangre}
            setValue={(value) => setFieldValue('tipo_sangre', value)}
            placeholder="Ingrese su tipo de sangre"
            />
        </FieldFormulario>

        <FieldFormulario>
            <Input
            text="Contacto de emergencia"
            type="none"
            name="contacto_emergencia"
            value={values.contacto_emergencia}
            setValue={(value) => setFieldValue('contacto_emergencia', value)}
            placeholder="Ingrese un contacto de emergencia (Nombre - Celular)"
            />
        </FieldFormulario>

        <FieldFormulario>
          <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
            Comprobante de depósito
          </Text>
          <GalleryMultiImages
            field="payment"
            setFieldValue={setFieldValue}
            values={values.payment}
            allowedFiles={['image/*']}
            icon={require('../../../../assets/gallery_icon.png')}
            placeholder="Sube una imagen del comprobante del depósito realizado para pagar el registro"
          />
        </FieldFormulario>

        <FieldFormulario>
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
              Fotos de su cédula de identidad
            </Text>
            <GalleryMultiImages
              field="cedula"
              setFieldValue={setFieldValue}
              values={values.cedula}
              allowedFiles={['image/*']}
              icon={require('../../../../assets/gallery_icon.png')}
              placeholder="Sube dos imágenes: una de la parte frontal y otra de la parte posterior de tu cedula"
            />
        </FieldFormulario>

        <FieldFormulario>
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
              Foto para su perfil
            </Text>
            <GalleryMultiImages
              field="imagen"
              setFieldValue={setFieldValue}
              values={values.imagen}
              allowedFiles={['image/*']}
              icon={require('../../../../assets/gallery_icon.png')}
              placeholder="Sube una imagen para que aparezca como tu foto de perfil"
            />
        </FieldFormulario>
        
        <View style={tw`flex flex-row justify-center items-center my-6`}>
            <SecondaryButton
                label={'Enviar'}
                handleClick={handleSubmit}
                style={`${BACKGROUND_COLORS.ORANGE} w-48 shadow-sm`}
            />
        </View>
    </>
  )
}

export default FormularioRegistroLocalSeguroCampos
