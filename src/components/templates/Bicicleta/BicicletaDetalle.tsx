import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import React from "react"
import { Bicicleta } from "../../../models/Bicicletas"
import { ResizeMode } from "expo-av"
import VideoPlayer from "expo-video-player"
import { View, Image, Text } from "react-native"
import { MultimediaResult } from "../../../models/Publicaciones.model"
import { MIME_TYPES, TEXT_COLORS, WIDTH_DIMENSIONS } from "../../../utils/constants"
import EmptyPublicacionDetalle from "../../organismos/EmptyPublicacionDetalle"
import tw from 'twrnc'
import RoundedWhiteBaseTemplate from "../../organismos/RoundedWhiteBaseTemplate"
import FieldFormulario from "../../moleculas/FieldFormulario"
import SectionTitle from "../../moleculas/SectionTitle"

interface DetalleBicicletaProps {
    token: string
}

const BicicletaDetalle = ({ token }: DetalleBicicletaProps) => {
    const { authToken, user } = useSelector((state: RootState) => state.user)
    const [bicicleta, setBicicleta] = React.useState<Bicicleta>();
    const [isRending, setIsRending] = React.useState(true)
    const [showHelpModal, setShowHelpModal] = React.useState(false);
    const [isAddingComent, setIsAddingComent] = React.useState(false)
    React.useEffect(() => {
        ; (async () => {
            if (authToken && token) {
                //setBicicleta();
            }
            setIsRending(false)
        })()
    }, [isAddingComent, token])
    const diplayImagesAndVideos = (multimediaResult: MultimediaResult[]) => {
        if (multimediaResult.length > 0) {

            const items = multimediaResult.map((file, index) => {
                switch (file.tipo) {
                    case MIME_TYPES.IMAGE:
                        return (
                            <Image
                                key={index}
                                source={{ uri: file.link }}
                                style={{
                                    width: WIDTH_DIMENSIONS * 0.85,
                                    height: 250,
                                    backgroundColor: '#fff',
                                }}
                                resizeMode="contain"
                            />
                        )
                    case MIME_TYPES.VIDEO:
                        return (
                            <VideoPlayer
                                key={index}
                                style={{
                                    width: WIDTH_DIMENSIONS * 0.85,
                                    height: 250,
                                    videoBackgroundColor: '#fff',
                                }}
                                slider={{ visible: false }}
                                videoProps={{
                                    source: { uri: file.link },
                                    resizeMode: 'contain' as ResizeMode,
                                    isLooping: true,
                                }}
                            />
                        )
                    default:
                        return null
                }
            })
            const finalItems = items.filter((item) => item)
            if (finalItems.length > 0) {
                return finalItems
            }
        }
        return (
            <View style={tw`mx-auto`}>
                <Image
                    source={require('../../../../assets/publicacion_default_icon.png')}
                    style={{ width: 200, height: 200 }}
                />
            </View>
        )
    };
    return isRending ? (
        <EmptyPublicacionDetalle />
    ) : (
        <View style={tw`p-2`}>
            <SectionTitle
                hasButton
                isRestricted={false}
                text="Detalle de la Bicicleta"

                styleText="text"
                background={true}
                buttonIcon={require('../../../../assets/pencil.png')}

            />
            <FieldFormulario>
                <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                    Código
                </Text>
                <Text style={tw`${TEXT_COLORS.DARK_GRAY} font-bold text-sm pl-2`}>
                    Prueba
                </Text>
            </FieldFormulario>
            <FieldFormulario>
                <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                    Marca
                </Text>
                <Text style={tw`${TEXT_COLORS.DARK_GRAY} font-bold text-sm pl-2`}>
                    Prueba
                </Text>
            </FieldFormulario>
            <FieldFormulario>
                <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                    Tipo
                </Text>
                <Text style={tw`${TEXT_COLORS.DARK_GRAY} font-bold text-sm pl-2`}>
                    Prueba
                </Text>
            </FieldFormulario>
            <FieldFormulario>
                <Text style={tw`${TEXT_COLORS.DARK_BLUE} font-bold text-sm pl-2`}>
                    Imagenes
                </Text>
            </FieldFormulario>
        </View>
    );

}
export default BicicletaDetalle