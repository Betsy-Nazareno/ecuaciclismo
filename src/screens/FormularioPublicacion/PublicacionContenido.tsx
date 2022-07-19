// import { Formik } from 'formik'
// import * as React from 'react'
// import { ScrollView } from 'react-native-gesture-handler'
// import HeaderScreen from '../../components/moleculas/HeaderScreen'
// import BasePaginasSecundarias from '../../components/templates/BasePaginasSecundarias'
// import { PublicacionValidationSchema } from '../../schemas/PublicacionSchema'
// import PublicacionContenidoFormulario from '../../components/templates/PublicacionFormulario/PublicacionContenidoFormulario'
// import tw from 'twrnc'

// const PublicacionContenido = () => {
//   const initialValues = {
//     titulo: '',
//     etiquetas: [],
//     descripcion: '',
//     fotos: [],
//     audios: [],
//     adjuntos: [],
//   }
//   const handleSubmit = async (props: any) => {}
//   return (
//     <BasePaginasSecundarias>
//       <ScrollView showsVerticalScrollIndicator={false} style={tw`px-2 mb-8`}>
//         <HeaderScreen
//           title="Publicación"
//           message="¡Dile a la comunidad lo que estás pensando!"
//           srcImage={require('../../../assets/nueva_publicacion_icon.png')}
//         />
//         <Formik
//           initialValues={initialValues}
//           validationSchema={PublicacionValidationSchema}
//           onSubmit={handleSubmit}
//         >
//           <>
//             <PublicacionContenidoFormulario />
//           </>
//         </Formik>
//       </ScrollView>
//     </BasePaginasSecundarias>
//   )
// }

// export default PublicacionContenido
