import * as React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import { RootState } from '../../../redux/store'
import TarjetaBicicleta from './TarjetaBicicleta'
import { recuperarBicicletas, recuperarBicicletasPorUsuario } from '../../../lib/services/bicicleta.services'
import { Bicicleta } from '../../../models/Bicicletas'
import EmptyTarjetaPublicacion from '../../organismos/EmptyTarjetaPublicacion'
import WithoutResults from '../../moleculas/WithoutResults'
import TarjetaBicicletaVisitor from './TarjetaBicicletaVisitor'

interface ListaBicicletasVisitorProps {
    token_usuario: string
}
const ListaBicicletasVisitor = ({ token_usuario }: ListaBicicletasVisitorProps) => {
    const { authToken } = useSelector((state: RootState) => state.user)
    const [listBicicletas, setListBicicletas] = React.useState<Bicicleta[]>([])
    const [isLoading, setIsLoading] = React.useState(true)
    React.useEffect(() => {
        ; (async () => {
            const listRBicicletas = await recuperarBicicletasPorUsuario(authToken!, token_usuario);
            console.log(listRBicicletas);
            if (listRBicicletas.length > 0) {
                setListBicicletas(listRBicicletas);
            } else {
                setListBicicletas([]);
            }
            setIsLoading(false);
        })();
    }, [authToken, token_usuario]);



    const actualizarLista = React.useCallback(async () => {
        // Actualizar el estado para reflejar la eliminación
        const listRBicicletas = await recuperarBicicletas(authToken || '')
        if (listRBicicletas.length > 0) {
            setListBicicletas(listRBicicletas)
        } else {
            setListBicicletas([])
        }
    }, [authToken]); // Dependencias de la función

    return (
        <View style={tw`pt-4`}>
            {isLoading ? (
                <>
                    <EmptyTarjetaPublicacion />
                    <EmptyTarjetaPublicacion />
                    <EmptyTarjetaPublicacion />
                </>
            ) : listBicicletas.length <= 0 ? (
                <WithoutResults styles="pt-12" />
            ) : (
                listBicicletas.map((bici, index) => (
                    <View key={index} style={tw`p-2`}>
                        <TarjetaBicicletaVisitor onEliminar={actualizarLista} bicicleta={bici} />
                    </View>
                ))
            )}

        </View>
    )
}

export default ListaBicicletasVisitor
