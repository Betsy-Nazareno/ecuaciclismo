import * as Yup from 'yup'
import { REGISTROLOCALSEGURO } from '../utils/constants'
import { formatoMaxLength, formatoMinLenght } from './FormatFieldFormMessages'

export const RegistroMiembroSchema = Yup.object({
    nombre: Yup.string()
        .max(
        REGISTROLOCALSEGURO.NOMBRE_MAX_LENGTH,
        formatoMaxLength('Su nombre', REGISTROLOCALSEGURO.NOMBRE_MAX_LENGTH)
        )
        .min(
            REGISTROLOCALSEGURO.NOMBRE_MIN_LENGTH,
        formatoMinLenght('Su nombre', REGISTROLOCALSEGURO.NOMBRE_MIN_LENGTH)
        )
        .required('Por favor, ingrese su nombre completo'),
    num_ced: Yup.string().required('Por favor, ingrese su número de cédula'),
    fecha_nacimiento: Yup.string().required('Debe ingresar su fecha de nacimiento'),
    celular: Yup.string()
        .min(10, 'Por favor, ingrese un número celular valido')
        .max(13, 'Por favor, ingrese un número celular valido')
        .required('Por favor, ingrese un número celular valido'),
    direccion: Yup.string().required('Por favor, ingrese su dirección'),
    ciudad: Yup.string().required('Por favor, ingrese la ciudad en la que reside'),
    ocupacion: Yup.string().required('Por favor, ingrese su ocupación'),
    seguro_med: Yup.string().required('Por favor, indique si cuenta con un seguro médico'),
    tipo_sangre: Yup.string().required('Por favor, indique su tipo de sangre'),
    contacto_emergencia: Yup.string().required('Debe ingresar un contacto de emergencia'),
    payment: Yup.array()
        .min(1, 'Debe agregar sólo una imágen del pago realizado')
        .max(1, 'Debe agregar sólo una imágen del pago realizado')
        .required('Debe agregar una imágen del pago realizado'),
    cedula: Yup.array()
        .min(2, 'Debe agregar dos imágenes de su cedula, una de la parte frontal y otra de la parte posterior')
        .max(2, 'Debe agregar dos imágenes de su cedula, una de la parte frontal y otra de la parte posterior')
        .required('Debe agregar dos imágenes de su cedula, una de la parte frontal y otra de la parte posterior'),
    imagen: Yup.array()
        .min(1, 'Debe agregar sólo una imágen')
        .max(1, 'Debe agregar sólo una imágen')
        .required('Debe agregar una imágen'),
})
