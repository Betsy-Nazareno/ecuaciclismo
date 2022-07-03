import * as React from 'react'
import Carousel from 'react-native-carousel-loop'
import { WIDTH_DIMENSIONS } from '../../../utils/constants'
import Publicidad from '../moleculas/Publicidad'
import { BannerPublicidad } from '../../../models/Publicidad.model'

const BannerPublicidad = () => {
  const mock_data = [
    {
      token: 1,
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
      token: 2,
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
      token: 3,
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

  return (
    <Carousel
      delay={3000}
      autoplay
      style={{ width: WIDTH_DIMENSIONS, height: 100 }}
    >
      {mock_data.map((item, index) => {
        return <Publicidad key={index} data={item} />
      })}
    </Carousel>
  )
}

export default BannerPublicidad
