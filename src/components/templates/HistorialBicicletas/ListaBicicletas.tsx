import * as React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import { RootState } from '../../../redux/store'
import TarjetaBicicleta from './TarjetaBicicleta'
import { recuperarBicicletas } from '../../../lib/services/bicicleta.services'
import { Bicicleta } from '../../../models/Bicicletas'
import EmptyTarjetaPublicacion from '../../organismos/EmptyTarjetaPublicacion'
import WithoutResults from '../../moleculas/WithoutResults'

const ListaBicicletas = () => {
    const { authToken } = useSelector((state: RootState) => state.user)
    const [listBicicletas, setListBicicletas] = React.useState<Bicicleta[]>([])
    const [isLoading, setIsLoading] = React.useState(false)
    /*
    React.useEffect(() => {
        ; (async () => {
            const listBicicletas = await recuperarBicicletas(authToken || '')
            if (listBicicletas.data.status === 'success') {
                const list: Bicicleta[] = listBicicletas.data.data
                setListBicicletas(list)
                setIsLoading(false)
            } else {
                const listEmpty: Bicicleta[] = []
                setListBicicletas(listEmpty)
                setIsLoading(false)
            }


        })()
    }, [listBicicletas])
    */
    return (
        <View style={tw`pt-4`}>
            {isLoading ? (
                <>
                    <EmptyTarjetaPublicacion />
                    <EmptyTarjetaPublicacion />
                    <EmptyTarjetaPublicacion />
                </>
            ) : listBicicletas?.length <= 0 ? (
                <WithoutResults styles="pt-12" />
            ) : (
                listBicicletas.map((bici, index) => (
                    <TarjetaBicicleta key={index} />
                ))
            )}
            
        </View>
    )
}

export default ListaBicicletas
