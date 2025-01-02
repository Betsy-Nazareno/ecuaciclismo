import React from 'react';
import { View, Image, StyleSheet} from 'react-native';
import { Marker } from 'react-native-maps';
import { BACKGROUND_COLORS, tiposDeLugares } from '../../utils/constants';
import tw from 'twrnc'
import { enviar_estadistica_lugar, getLugar } from '../../lib/services/lugares.services';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { Lugar } from '../../models/Lugares';

interface MarcadorLugarProps {
  lugar: any;
  setLugarSeleccionado: (lugar: any) => void;
  setModalInfoVisible: (visible: boolean) => void;
  setShouldRefresh: (shouldRefresh: boolean) => void;
  shouldRefresh: boolean;
  localSafepoint? : boolean; // Indicar si el local fue registrado por medio de la APP de safepoints
}

const MarcadorLugar = ({ 
    lugar ,
    setLugarSeleccionado, 
    setModalInfoVisible,
    setShouldRefresh,
    shouldRefresh,
    localSafepoint
  }: MarcadorLugarProps) => {
  const [lugarInfo, setLugar] =  React.useState<Lugar>() || undefined;
  const {authToken}= useSelector((state: RootState) => state.user)

  React.useEffect(() => {
    (async function () {
        if(lugar.token && authToken){
            const response: Lugar= await getLugar(authToken,lugar.token)
            setLugar(response)
            setShouldRefresh(true)
        }
    })()
    }, [shouldRefresh])

  const handleMarkerPress = async () => {
    setLugarSeleccionado(lugarInfo);
    setModalInfoVisible(true);
    setShouldRefresh(false);  

    // Verificamos si el lugar fue registrado mediante la aplicacion de Safepoint
    if(localSafepoint && authToken && lugarInfo && lugarInfo.id)
      await enviar_estadistica_lugar(authToken, lugarInfo.id);
  };

  const getTipo=()=>{
    if (lugar.local_seguro !== undefined && lugar.local_seguro === 1) {
        return 'local seguro';
      }
      return lugar.tipo;
      
}

const markerStyle = tw`${BACKGROUND_COLORS[
    getTipo() === 'parqueadero'
      ? 'DARK_GRAY'
      : getTipo() === 'ciclovia'
      ? 'ORANGE'
      : getTipo() == 'local seguro'
      ? 'GREEN_SECONDARY'
      : 'SKY_BLUE'
  ]}`;

  return (
    <>
      {lugar && (
        <Marker coordinate={lugar.ubicacion.coordinateX} onPress={handleMarkerPress}>
        <View key= {lugar.token}style={[tw`rounded-xl flex flex-row items-center py-2 px-2`, markerStyle]}>          
          <Image source={tiposDeLugares.find((tipo)=> tipo.nombre==getTipo())?.icon} style={styles.image} />
          </View>
        </Marker>
        )}

    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 25,
    height: 25,
    resizeMode: 'cover',
  },
  
});

export default MarcadorLugar;
