import { useSelector } from "react-redux"
import { RootState } from "../../../redux/store"
import React from "react"
import { Bicicleta } from "../../../models/Bicicletas"
import { ResizeMode } from "expo-av"
import VideoPlayer from "expo-video-player"
import { View, Image } from "react-native"
import { MultimediaResult } from "../../../models/Publicaciones.model"
import { MIME_TYPES, WIDTH_DIMENSIONS } from "../../../utils/constants"
import EmptyPublicacionDetalle from "../../organismos/EmptyPublicacionDetalle"
import tw from 'twrnc'

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
    return <EmptyPublicacionDetalle />;

}
export default BicicletaDetalle