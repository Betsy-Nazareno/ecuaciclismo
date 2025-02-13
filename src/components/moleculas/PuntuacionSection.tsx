import React from 'react';
import { View, Text , StyleSheet} from 'react-native';
import tw from 'twrnc';
import { BACKGROUND_COLORS, TEXT_COLORS } from '../../utils/constants';
import { Rating } from 'react-native-ratings';

interface PuntuacionSectionProps {
  puntuacionAtencion?: number;
  puntuacionLimpieza?: number;
  puntuacionSeguridad?: number;
  readonly?: boolean
  setPuntuacionSeguridad?: (puntuacion: number) => void;
  setPuntuacionAtencion?: (puntuacion: number) => void;
  setPuntuacionLimpieza?: (puntuacion: number) => void;
  size?: number
  tipo?: string
}

const PuntuacionSection = ({
  puntuacionAtencion,
  puntuacionLimpieza,
  puntuacionSeguridad,
  readonly = true,
  setPuntuacionSeguridad,
  setPuntuacionAtencion,
  setPuntuacionLimpieza,
  size = 30,
  tipo,

}: PuntuacionSectionProps) => {
  const [puntuacionSeguridadLocal, setPuntuacionSeguridadLocal] = React.useState(puntuacionSeguridad || 0);
  const [puntuacionAtencionLocal, setPuntuacionAtencionLocal] = React.useState(puntuacionAtencion || 0);
  const [puntuacionLimpiezaLocal, setPuntuacionLimpiezaLocal] = React.useState(puntuacionLimpieza || 0);
  React.useEffect(() => {
      
        setPuntuacionSeguridadLocal(puntuacionSeguridad)
        setPuntuacionAtencionLocal(puntuacionAtencion)
        setPuntuacionLimpiezaLocal(puntuacionLimpieza)
  }
  , [puntuacionAtencion, puntuacionLimpieza, puntuacionSeguridad])
  const handlePuntuacionSeguridad = (puntuacion: number) => {
        setPuntuacionSeguridadLocal(puntuacion)
        setPuntuacionSeguridad?.(puntuacion)
  }
  const handlePuntuacionAtencion = (puntuacion: number) => {
        setPuntuacionAtencionLocal(puntuacion)
        setPuntuacionAtencion?.(puntuacion)
  }
  const handlePuntuacionLimpieza = (puntuacion: number) => {
        setPuntuacionLimpiezaLocal(puntuacion)
        setPuntuacionLimpieza?.(puntuacion)
  }
  return (
    <View>
      <View style={tw`mb-0 flex flex-row w-full`}>
        <View
          style={[
            tw`py-0.25 my-3 flex flex-row w-35 justify-center ${BACKGROUND_COLORS.SKY_BLUE}`,
            styles.borderContainer,
          ]}
        >
          <Text style={tw`text-xl font-bold ${TEXT_COLORS.WHITE} my-2`}>
            Seguridad
          </Text>
        </View>
        <View
          style={[
            tw`bg-white py-1 px-4 mt-1 flex flex-row w-60 justify-center`,
            styles.borderContainer,
          ]}
        >
            <Rating
            onFinishRating={(stars: number) => handlePuntuacionSeguridad(stars)}
            style={{ paddingVertical: 10 }}
            startingValue={puntuacionSeguridad}
            readonly={readonly}
            imageSize={size}
            />
          <Text style={tw`text-2xl font-bold mt-3 ml-4`}>
            {puntuacionSeguridadLocal}
          </Text>
        </View>
      </View>

        {tipo==='local' ? (
            <>
            <View style={tw`mb-1 flex flex-row w-full`}>
                <View
                    style={[
                    tw`py-0.25 my-3 flex flex-row w-35 justify-center ${BACKGROUND_COLORS.SKY_BLUE}`,
                    styles.borderContainer,
                    ]}
                >
                    <Text style={tw`text-xl font-bold ${TEXT_COLORS.WHITE} my-2`}>
                    Atencion
                    </Text>
                </View>
                <View
                    style={[
                    tw`bg-white py-1 px-4 mt-1 flex flex-row w-60 justify-center`,
                    styles.borderContainer,
                    ]}
                >   
                    <Rating
                    onFinishRating={(stars: number) => handlePuntuacionAtencion(stars)}
                    style={{ paddingVertical: 10 }}
                    startingValue={puntuacionAtencion}
                    readonly={readonly}
                    imageSize={size}
                    />
                    <Text style={tw`text-2xl font-bold mt-3 ml-4`}>
                    {puntuacionAtencionLocal? puntuacionAtencionLocal : puntuacionAtencion}
                    </Text>
                </View>
            </View>
            <View style={tw`mb-1 flex flex-row w-full`}>
                    <View
                        style={[
                        tw`py-0.25 my-3 flex flex-row w-35 justify-center ${BACKGROUND_COLORS.SKY_BLUE}`,
                        styles.borderContainer,
                        ]}
                    >
                        <Text style={tw`text-xl font-bold ${TEXT_COLORS.WHITE} my-2`}>
                        Limpieza
                        </Text>
                    </View>
                    <View
                        style={[
                        tw`bg-white py-1 px-4 mt-1 flex flex-row w-60 justify-center`,
                        styles.borderContainer,
                        ]}
                    >
                        <Rating
                        onFinishRating={(stars: number) => handlePuntuacionLimpieza(stars)}
                        style={{ paddingVertical: 10 }}
                        startingValue={puntuacionLimpieza}
                        readonly={readonly}
                        imageSize={size}
                        />
                        <Text style={tw`text-2xl font-bold mt-3 ml-4`}>
                        {puntuacionLimpiezaLocal? puntuacionLimpiezaLocal : puntuacionLimpieza}
                        </Text>
                    </View>
                </View>
            </>
        ) : null}

    </View>
  );
};

export default PuntuacionSection;

const styles = StyleSheet.create({
  borderContainer: {
    borderWidth: 1,
    borderColor: '#DFDFF0',
    borderStyle: 'solid',
    borderRadius: 20,
  },
});
