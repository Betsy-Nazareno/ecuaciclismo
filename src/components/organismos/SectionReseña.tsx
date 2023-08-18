import { useState } from "react";
import { Reseña } from "../../models/Lugares";
import React from "react";
import { getReseñas } from "../../lib/services/lugares.services";
import TarjetaReseñaLugar from "../templates/Lugares/TarjetaReseñaLugar";
import PuntuacionSection from "../moleculas/PuntuacionSection";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import InputAgregarReseña from "../templates/Lugares/InputAgregarReseña";
import tw from 'twrnc'
import ButtonPrimary from "../atomos/ButtonPrimary";
import { BACKGROUND_COLORS, TEXT_COLORS } from "../../utils/constants";
import FieldFormulario from "../moleculas/FieldFormulario";
import { FlatList } from "react-native-gesture-handler";

interface SectionReseñaProps {
    token_lugar: string;
    authToken: string;
    tipo: string;
    setShouldRefresh: (shouldRefresh: boolean) => void;
}

const SectionReseña = ({ token_lugar,authToken, tipo, setShouldRefresh }: SectionReseñaProps) => {
    const {user } = useSelector((state: RootState) => state.user)
    const [reseñas, setReseñas] = useState<Reseña[]>([]);
    const [reseñaEdit, setReseñaEdit] = React.useState<Reseña>() || undefined;
    const [puntuacionAtencion, setPuntuacionAtencion] = React.useState(0)
    const [puntuacionLimpieza, setPuntuacionLimpieza] = React.useState(0)
    const [puntuacionSeguridad, setPuntuacionSeguridad] = React.useState(0)
    const [isEdit, setIsEdit] = useState(false);
    const [isAñadirReseña, setIsAñadirReseña] = useState(false);
    const [isRending, setIsRending] = useState(true);
    const [isActualizado, setIsActualizado] = useState(false);
    const userReseña = reseñas.find(reseña => reseña.key === authToken);
    React.useEffect(() => {
        ;(async function () {
            if(authToken ){
                const response: Reseña[] = await getReseñas(authToken,token_lugar)
                setReseñas(response)
                setReseñaEdit(userReseña);
                setIsRending(false);
                setIsActualizado(false);
                setShouldRefresh(false);

            }
        })()
        
    }
    , [isAñadirReseña,isRending,isActualizado])
    
    const handleEditReseña = () => {
        // Lógica para editar la reseña
        // Puedes usar el estado reseñaEdit para manejar la reseña que se está editando
        setIsAñadirReseña(true);
        setIsEdit(true);
    };

    const handleWriteReseña = () => {
        setIsAñadirReseña(true);
        // Lógica para escribir una nueva reseña
        // Puedes usar el estado reseñaCreate para manejar la creación de una nueva reseña
        //setReseñaCreate({ /* Inicializar con los campos necesarios */ });
    };
    return isRending ? (
        <View style={tw` flex flex-col justify-center items-center `}>
            <Text style={tw` text-2xl text-white text-center`}>Cargando reseñas...</Text>
        </View>
    ):(
        <View style={tw` flex flex-col justify-center `}>
            {reseñaEdit ? (
                <>
                    <PuntuacionSection 
                        puntuacionAtencion={reseñaEdit.puntuacion_atencion}
                        puntuacionLimpieza={reseñaEdit.puntuacion_limpieza}
                        puntuacionSeguridad={reseñaEdit.puntuacion_seguridad}
                        readonly={false}
                        tipo={tipo}
                        setPuntuacionAtencion={(puntuacion) => setPuntuacionAtencion(puntuacion)}
                        setPuntuacionLimpieza={(puntuacion) => setPuntuacionLimpieza(puntuacion)}
                        setPuntuacionSeguridad={(puntuacion) => setPuntuacionSeguridad(puntuacion)}
                    /> 
                    {isAñadirReseña===false && (
                        <View style={tw` flex flex-col`}>
                        <FieldFormulario>
                            <Text >{reseñaEdit.contenido}</Text>
                        </FieldFormulario>
                        <Pressable style={[tw`bg-white py-2 px-4 rounded-md mt-2 mx-20`,styles.borderContainer]} onPress={handleEditReseña}>
                        <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-base text-center`}>Editar reseña</Text>
                        </Pressable>

                        </View>
                    )}
                </>
                
            ) : (
                <>
                    {isAñadirReseña===false && (
                        <Pressable style={[tw`bg-white py-2 px-4 rounded-md mt-2 mx-20`,styles.borderContainer]} onPress={handleWriteReseña}>
                        <Text style={tw`${TEXT_COLORS.DARK_BLUE} text-base text-center`}>Escribir reseña</Text>
                        </Pressable>
                    )}

                </>
   

            )}
            {isEdit===false && isAñadirReseña===true ? (
                
                <View style={tw`flex flex-column mt-2`}> 

                    <PuntuacionSection 
                        readonly={false}
                        tipo={tipo}
                        setPuntuacionAtencion={(puntuacion) => setPuntuacionAtencion(puntuacion)}
                        setPuntuacionLimpieza={(puntuacion) => setPuntuacionLimpieza(puntuacion)}
                        setPuntuacionSeguridad={(puntuacion) => setPuntuacionSeguridad(puntuacion)}
                    />
                </View>
            ) : null}

            {isAñadirReseña && (
                <>

                    <InputAgregarReseña 
                        onSend={() => {setIsAñadirReseña(!isAñadirReseña)}}

                        nombreUsuario={`${user?.first_name} ${user?.last_name}`}
                        tokenUsuario={authToken}
                        tokenLugar={token_lugar}
                        fotoUsuario={user?.foto}
                        puntuacion_atencion={puntuacionAtencion}
                        puntuacion_limpieza={puntuacionLimpieza}
                        puntuacion_seguridad={puntuacionSeguridad}
                        isEdit={isEdit}
                        setIsActualizado={setIsActualizado}
                        contenidoExistente={isEdit ? reseñaEdit?.contenido : ''}
                        token_reseña={reseñaEdit?.token}
                    />
                </>
            )}
            
            <View style={tw`border-b border-white my-2`} />
            {reseñas.length!=0 ?(
                <FlatList
                    data={reseñas.filter(reseña => reseña.key !== authToken)}
                    keyExtractor={item => item.token}
                    renderItem={({ item }) => (
                    <TarjetaReseñaLugar key={item.token} reseña={item} tipo={tipo} />
                    )}
                />
            ):( 
                <Text style={"text-black"}>No hay reseñas para mostrar</Text>
            )}

        </View>
    );
};

export default SectionReseña;
const styles = StyleSheet.create({
    borderContainer: {
      borderWidth: 1,
      borderColor: 'white',
      borderRadius: 20
    },
  })