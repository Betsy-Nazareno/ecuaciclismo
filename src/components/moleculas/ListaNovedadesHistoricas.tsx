import * as React from 'react'
import { View } from 'react-native'
import tw from 'twrnc'
import { PublicidadInterface } from '../../../models/Publicidad.model'
import TarjetaNovedadHistorica from '../atomos/TarjetaNovedadHistorica'

const mock_data: PublicidadInterface[] = [
  {
    token: '1',
    imagen: require('../../../assets/camisa.png'),
    titulo: 'Nueva camisa disponible 1',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply',
    descripcion_corta: 'Camisas por temporada1',
    datos_contacto: {
      nombre: 'Daniel',
      celular: '095224652',
      direccion: 'Guerreros del fortin 2',
    },
  },
  {
    token: '2',
    imagen: require('../../../assets/camisa.png'),
    titulo: 'Nueva camisa disponible 2',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply',
    descripcion_corta: 'Camisas por temporada2',
    datos_contacto: {
      nombre: 'Daniel2',
      celular: '095224652',
      direccion: 'Guerreros del fortin 2',
    },
  },
  {
    token: '3',
    imagen: require('../../../assets/trajes.jpg'),
    titulo: 'Nueva camisa disponible 3',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply',
    descripcion_corta: 'Camisas por temporada3',
    datos_contacto: {
      nombre: 'Daniel3',
      celular: '095224652',
      direccion: 'Guerreros del fortin 2',
    },
  },
  {
    token: '3',
    imagen: require('../../../assets/trajes.jpg'),
    titulo: 'Nueva camisa disponible 3',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply',
    descripcion_corta: 'Camisas por temporada3',
    datos_contacto: {
      nombre: 'Daniel3',
      celular: '095224652',
      direccion: 'Guerreros del fortin 2',
    },
  },
  {
    token: '3',
    imagen: require('../../../assets/trajes.jpg'),
    titulo: 'Nueva camisa disponible 3',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply',
    descripcion_corta: 'Camisas por temporada3',
    datos_contacto: {
      nombre: 'Daniel3',
      celular: '095224652',
      direccion: 'Guerreros del fortin 2',
    },
  },
  {
    token: '3',
    imagen: require('../../../assets/trajes.jpg'),
    titulo: 'Nueva camisa disponible 3',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply',
    descripcion_corta: 'Camisas por temporada3',
    datos_contacto: {
      nombre: 'Daniel3',
      celular: '095224652',
      direccion: 'Guerreros del fortin 2',
    },
  },
  {
    token: '3',
    imagen: require('../../../assets/trajes.jpg'),
    titulo: 'Nueva camisa disponible 3',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply',
    descripcion_corta: 'Camisas por temporada3',
    datos_contacto: {
      nombre: 'Daniel3',
      celular: '095224652',
      direccion: 'Guerreros del fortin 2',
    },
  },
  {
    token: '3',
    imagen: require('../../../assets/trajes.jpg'),
    titulo: 'Nueva camisa disponible 3',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply',
    descripcion_corta: 'Camisas por temporada3',
    datos_contacto: {
      nombre: 'Daniel3',
      celular: '095224652',
      direccion: 'Guerreros del fortin 2',
    },
  },
  {
    token: '3',
    imagen: require('../../../assets/trajes.jpg'),
    titulo: 'Nueva camisa disponible 3',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply',
    descripcion_corta: 'Camisas por temporada3',
    datos_contacto: {
      nombre: 'Daniel3',
      celular: '095224652',
      direccion: 'Guerreros del fortin 2',
    },
  },
  {
    token: '3',
    imagen: require('../../../assets/trajes.jpg'),
    titulo: 'Nueva camisa disponible 3',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply',
    descripcion_corta: 'Camisas por temporada3',
    datos_contacto: {
      nombre: 'Daniel3',
      celular: '095224652',
      direccion: 'Guerreros del fortin 2',
    },
  },
  {
    token: '3',
    imagen: require('../../../assets/trajes.jpg'),
    titulo: 'Nueva camisa disponible 3',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply',
    descripcion_corta: 'Camisas por temporada3',
    datos_contacto: {
      nombre: 'Daniel3',
      celular: '095224652',
      direccion: 'Guerreros del fortin 2',
    },
  },
  {
    token: '3',
    imagen: require('../../../assets/trajes.jpg'),
    titulo: 'Nueva camisa disponible 3',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply',
    descripcion_corta: 'Camisas por temporada3',
    datos_contacto: {
      nombre: 'Daniel3',
      celular: '095224652',
      direccion: 'Guerreros del fortin 2',
    },
  },
  {
    token: '3',
    imagen: require('../../../assets/trajes.jpg'),
    titulo: 'Nueva camisa disponible 3',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply',
    descripcion_corta: 'Camisas por temporada3',
    datos_contacto: {
      nombre: 'Daniel3',
      celular: '095224652',
      direccion: 'Guerreros del fortin 2',
    },
  },
  {
    token: '3',
    imagen: require('../../../assets/trajes.jpg'),
    titulo: 'Nueva camisa disponible 3',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply',
    descripcion_corta: 'Camisas por temporada3',
    datos_contacto: {
      nombre: 'Daniel3',
      celular: '095224652',
      direccion: 'Guerreros del fortin 2',
    },
  },
  {
    token: '3',
    imagen: require('../../../assets/trajes.jpg'),
    titulo: 'Nueva camisa disponible 3',
    descripcion:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply',
    descripcion_corta: 'Camisas por temporada3',
    datos_contacto: {
      nombre: 'Daniel3',
      celular: '095224652',
      direccion: 'Guerreros del fortin 2',
    },
  },
]

interface ListaNovedadesHistoricasProps {
  text: string
}

const ListaNovedadesHistoricas = ({ text }: ListaNovedadesHistoricasProps) => {
  // const { authToken } = useSelector((state: RootState) => state.user)
  const [novedades, setNovedades] = React.useState<PublicidadInterface[]>([])
  const [filteredNovedades, setFilteredNovedades] = React.useState<
    PublicidadInterface[]
  >([])

  React.useEffect(() => {
    let isMounted = true
    if (isMounted) {
      ;(async function () {
        setNovedades(mock_data)
        setFilteredNovedades(mock_data)
      })()
    }
    return () => {
      isMounted = false
    }
  }, [])

  React.useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (!text) {
        setFilteredNovedades(mock_data)
      } else {
        setFilteredNovedades(filtrarNovedades())
      }
    }
    return () => {
      isMounted = false
    }
  }, [text])

  const filtrarNovedades = (): PublicidadInterface[] => {
    const standarText = text.toLowerCase()
    return novedades.filter(
      (novedad: PublicidadInterface) =>
        novedad.descripcion.toLowerCase().includes(standarText) ||
        novedad.descripcion_corta.toLowerCase().includes(standarText) ||
        novedad.titulo.toLowerCase().includes(standarText) ||
        novedad.datos_contacto?.nombre.toLowerCase().includes(standarText)
    )
  }

  return (
    <View style={tw`pt-4`}>
      {filteredNovedades?.map((novedad, index) => (
        <TarjetaNovedadHistorica key={index} novedad={novedad} />
      ))}
    </View>
  )
}

export default ListaNovedadesHistoricas
