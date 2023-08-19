import { useFormikContext } from 'formik'
import * as React from 'react'
import { Text, View, Pressable } from 'react-native'
import {
  BACKGROUND_COLORS,
  serviciosTipos,
  TEXT_COLORS,
} from '../../../utils/constants'
import Input from '../../moleculas/Input'
import SecondaryButton from '../../atomos/SecondaryButton'
import FieldFormulario from '../../moleculas/FieldFormulario'
import tw from 'twrnc'
import SelectCreatableBatches from '../../moleculas/SelectCreatableBatches'
import GalleryMultiImages from '../../organismos/GalleryMultiImages'
import SmallFieldTime from '../../moleculas/SmallFieldTime'
import ArrowDivider from '../../atomos/ArrowDivider'
import { RegistroLocalSeguro } from '../../../models/RegistroLocalSeguro'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import MapViewSelectUbication from '../../moleculas/MapViewSelectUbication'

interface FormularioRegistroLocalSeguroCamposProps {
  registerType: string
  initialValues: RegistroLocalSeguro
  charge: boolean
}

const FormularioRegistroLocalSeguroCampos = ({ registerType, initialValues, charge }: FormularioRegistroLocalSeguroCamposProps) => {
  const { values, setFieldValue, handleSubmit } = useFormikContext<RegistroLocalSeguro>()
  const { user } = useSelector((state: RootState) => state.user)
  const parking = [
    {
        id: 1,
        val: 1,
        text: 'Sí'
    },
    {
        id: 2,
        val: 0,
        text: 'No'
    },
  ]
  const [isChecked, setIsChecked] = React.useState(0)
 
  React.useEffect(() => {
    setFieldValue('nombre',initialValues.nombre)
    setFieldValue('servicio',initialValues.servicio)
    setFieldValue('descripcion',initialValues.descripcion)
    setFieldValue('parqueadero',initialValues.parqueadero)
    setFieldValue('ciudad',initialValues.ciudad)
    setFieldValue('direccion',initialValues.direccion)
    setFieldValue('ubicacion',initialValues.ubicacion)
    setFieldValue('celular',initialValues.celular)
    setFieldValue('hora_inicio',initialValues.hora_inicio)
    setFieldValue('hora_fin',initialValues.hora_fin)
    setFieldValue('payment',initialValues.payment)
    setFieldValue('cedula',initialValues.cedula)
    setFieldValue('imagen',initialValues.imagen)
    setFieldValue('registerType', initialValues.registerType);
    (values.parqueadero === 0) ? setIsChecked(2) :
      (values.parqueadero === 1) ? setIsChecked(1) : null
  }, [charge])

  const handleCheckboxChange = (hasParking: number, id: number) => {
    if(isChecked != id){
      setIsChecked(id)
      setFieldValue('parqueadero', hasParking)
    }
  }

  return (
    <>
        <FieldFormulario>
            <Input
            text="Nombre del propietario"
            type="none"
            name="owner"
            value={user?.first_name+' '+user?.last_name}
            editable={false}
            />
        </FieldFormulario>

        <FieldFormulario>
            <Input
            text="Nombre del local"
            type="none"
            name="nombre"
            value={values.nombre}
            setValue={(value) => setFieldValue('nombre', value)}
            placeholder="Ingrese el nombre del local"
            />
        </FieldFormulario>

        <FieldFormulario>
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
              Servicio
            </Text>
            <SelectCreatableBatches
              values={serviciosTipos}
              selectedValues={[values.servicio]}
              setValuesSelected={(value) => setFieldValue('servicio', value)}
              deleteValue={() => console.log('')}
              placeholder="---------"
              field= {'servicio'}
              activateCancel= {false}
            />
        </FieldFormulario>

        <FieldFormulario>
            <Input
            multiline
            numberOfLines={6}
            text="Descripción del servicio"
            type="none"
            name="descripcion"
            value={values.descripcion}
            textAlignVertical="top"
            stylesInput="pt-2"
            setValue={(value) => setFieldValue('descripcion', value)}
            placeholder="Agregue una descripción de los servicios ofrecidos..."
            />
        </FieldFormulario>

        <FieldFormulario>
          <View style={tw`flex flex-col`}>
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
              ¿El local cuenta con parqueadero de bicicletas?
            </Text>
            {parking.map((pkng) => {
                    return (
                        <Pressable style={tw`my-1 p-2 flex flex-row items-center`} onPress={()=>handleCheckboxChange(pkng.val, pkng.id)}>
                            <View
                                style={tw`rounded-full w-5 h-5 ${(isChecked==pkng.id)? 'bg-[#2D84C4]':'bg-[#D9D9D9] border border-black'}`}
                            />
                            <Text style={tw`ml-2 text-m text-black`}>{pkng.text}</Text>
                        </Pressable>
                    )
            })}
          </View>
        </FieldFormulario>

        <FieldFormulario>
            <Input
            text="Ciudad"
            type="none"
            name="ciudad"
            value={values.ciudad}
            setValue={(value) => setFieldValue('ciudad', value)}
            placeholder="Ingrese la ciudad donde se encuentra el local"
            />
        </FieldFormulario>

        <FieldFormulario>
            <Input
            text="Dirección"
            type="none"
            name="direccion"
            value={values.direccion}
            setValue={(value) => setFieldValue('direccion', value)}
            placeholder="Ingrese la dirección del local"
            />
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2 mt-4`}>
              Selecciona la ubicación en el mapa
            </Text>
            <Text style={tw`text-m text-black text-opacity-40 ml-2`}>
              Arrastra y suelta el icono de bicicleta sobre la ubicación deseada
            </Text>
            <MapViewSelectUbication
              select
              field="ubicacion"
              setField={setFieldValue}
              value={values.ubicacion}
              isUnique={true}
            />
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
          <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
            Horario de atención
          </Text>

          <View style={tw`flex flex-row justify-between items-center mx-8`}>
            <View style={tw`flex flex-col justify-between items-center`}>
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-sm my-2`}>
                Apertura
              </Text>
              <SmallFieldTime
                hora = {values.hora_inicio}
                setFecha={(value) => {setFieldValue('hora_inicio', value)}}
              />
            </View>
            <ArrowDivider/>
            <View style={tw`flex flex-col justify-between items-center`}>
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-sm my-2`}>
                Cierre
              </Text>
              <SmallFieldTime
                hora = {values.hora_fin}
                setFecha={(value) => setFieldValue('hora_fin', value)}
              />
            </View>
          </View>
        </FieldFormulario>

        {(registerType!=='Plan gratuito')?
          <FieldFormulario>
              <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                Comprobante de depósito
              </Text>
              <GalleryMultiImages
                field="payment"
                setFieldValue={setFieldValue}
                values={values.payment??[]}
                allowedFiles={['image/*']}
                icon={require('../../../../assets/gallery_icon.png')}
                placeholder="Sube una imagen del comprobante del depósito realizado para pagar el registro"
              />
          </FieldFormulario>
          :null
        }

        <FieldFormulario>
            <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
              Cédula de identidad del propietario
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
              Foto del local
            </Text>
            <GalleryMultiImages
            field="imagen"
            setFieldValue={setFieldValue}
            values={values.imagen}
            allowedFiles={['image/*']}
            icon={require('../../../../assets/gallery_icon.png')}
            placeholder="Sube una imagen frontal de tu local"
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
