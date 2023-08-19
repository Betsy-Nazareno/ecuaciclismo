import * as Yup from 'yup'
import { REGISTROLOCALSEGURO } from '../utils/constants'
import { formatoMaxLength, formatoMinLenght } from './FormatFieldFormMessages'

export const RegistroLocalSeguroSchema = Yup.object({
    nombre: Yup.string()
        .max(
        REGISTROLOCALSEGURO.NOMBRE_MAX_LENGTH,
        formatoMaxLength('El nombre del local', REGISTROLOCALSEGURO.NOMBRE_MAX_LENGTH)
        )
        .min(
            REGISTROLOCALSEGURO.NOMBRE_MIN_LENGTH,
        formatoMinLenght('El nombre del local', REGISTROLOCALSEGURO.NOMBRE_MIN_LENGTH)
        )
        .required('Por favor, ingresa el nombre del local'),
    servicio: Yup.string().required('Por favor, indique qué tipo de servicio ofrece su local.'),
    descripcion: Yup.string()
        .max(
            REGISTROLOCALSEGURO.DESCRIPCION_CORTA_MAX_LENGTH,
        formatoMaxLength('La descripción del servicio', REGISTROLOCALSEGURO.DESCRIPCION_CORTA_MAX_LENGTH)
        )
        .min(
            REGISTROLOCALSEGURO.DESCRIPCION_CORTA_MIN_LENGTH,
        formatoMinLenght('La descripción del servicio', REGISTROLOCALSEGURO.DESCRIPCION_CORTA_MIN_LENGTH)
        )
        .required('Por favor, ingrese una descripción del servicio ofrecido'),
    parqueadero: Yup.number().required('Por favor, indique si el local cuenta con parquedadero de bicicletas'),
    ciudad: Yup.string().required('Por favor, ingrese la ciudad donde se ubica el local'),
    direccion: Yup.string().required('Por favor, ingrese la dirección del local'),
    ubicacion: Yup.mixed().required(
        'Por favor, seleccione la ubicación de su local en el mapa'
    ),
    celular: Yup.string()
        .min(10, 'Por favor, ingrese un número celular valido')
        .max(13, 'Por favor, ingrese un número celular valido')
        .required('Por favor, ingrese un número celular valido'),
    hora_inicio: Yup.mixed().required('Debe ingresar la hora de apertura del local'),
    hora_fin: Yup.mixed().required('Debe ingresar la hora de cierre del local'),
    payment: Yup.array()
        .min(1, 'Debe agregar sólo una imágen del pago realizado')
        .max(1, 'Debe agregar sólo una imágen del pago realizado')
        .required('Debe agregar una imágen del pago realizado'),
    cedula: Yup.array()
        .min(2, 'Debe agregar dos imágenes de su cedula, una de la parte frontal y otra de la parte posterior')
        .max(2, 'Debe agregar dos imágenes de su cedula, una de la parte frontal y otra de la parte posterior')
        .required('Debe agregar dos imágenes de su cedula, una de la parte frontal y otra de la parte posterior'),
    imagen: Yup.array()
        .min(1, 'Debe agregar sólo una imágen de su local')
        .max(1, 'Debe agregar sólo una imágen de su local')
        .required('Debe agregar una imágen de su local'),
})

export const RegistroLocalSeguroFreeSchema = Yup.object({
    nombre: Yup.string()
        .max(
        REGISTROLOCALSEGURO.NOMBRE_MAX_LENGTH,
        formatoMaxLength('El nombre del local', REGISTROLOCALSEGURO.NOMBRE_MAX_LENGTH)
        )
        .min(
            REGISTROLOCALSEGURO.NOMBRE_MIN_LENGTH,
        formatoMinLenght('El nombre del local', REGISTROLOCALSEGURO.NOMBRE_MIN_LENGTH)
        )
        .required('Por favor, ingresa el nombre del local'),
    servicio: Yup.string().required('Por favor, indique qué tipo de servicio ofrece su local.'),
    descripcion: Yup.string()
        .max(
            REGISTROLOCALSEGURO.DESCRIPCION_CORTA_MAX_LENGTH,
        formatoMaxLength('La descripción del servicio', REGISTROLOCALSEGURO.DESCRIPCION_CORTA_MAX_LENGTH)
        )
        .min(
            REGISTROLOCALSEGURO.DESCRIPCION_CORTA_MIN_LENGTH,
        formatoMinLenght('La descripción del servicio', REGISTROLOCALSEGURO.DESCRIPCION_CORTA_MIN_LENGTH)
        )
        .required('Por favor, ingrese una descripción del servicio ofrecido'),
    parqueadero: Yup.number().required('Por favor, indique si el local cuenta con parquedadero de bicicletas'),
    ciudad: Yup.string().required('Por favor, ingrese la ciudad donde se ubica el local'),
    direccion: Yup.string().required('Por favor, ingrese la dirección del local'),
    ubicacion: Yup.mixed().required(
        'Por favor, seleccione la ubicación de su local en el mapa'
    ),
    celular: Yup.string()
        .min(10, 'Por favor, ingrese un número celular valido')
        .max(13, 'Por favor, ingrese un número celular valido')
        .required('Por favor, ingrese un número celular valido'),
    hora_inicio: Yup.mixed().required('Debe ingresar la hora de apertura del local'),
    hora_fin: Yup.mixed().required('Debe ingresar la hora de cierre del local'),
    cedula: Yup.array()
        .min(2, 'Debe agregar dos imágenes de su cedula, una de la parte frontal y otra de la parte posterior')
        .max(2, 'Debe agregar dos imágenes de su cedula, una de la parte frontal y otra de la parte posterior')
        .required('Debe agregar dos imágenes de su cedula, una de la parte frontal y otra de la parte posterior'),
    imagen: Yup.array()
        .min(1, 'Debe agregar sólo una imágen de su local')
        .max(1, 'Debe agregar sólo una imágen de su local')
        .required('Debe agregar una imágen de su local'),
})