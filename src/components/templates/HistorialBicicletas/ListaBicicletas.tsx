import * as React from 'react'
import { View } from 'react-native'
import { useSelector } from 'react-redux'
import tw from 'twrnc'
import { RootState } from '../../../redux/store'
import TarjetaBicicleta from './TarjetaBicicleta'

const ListaBicicletas = () => {
    //const { authToken } = useSelector((state: RootState) => state.user)
    const { novedadHasModified } = useSelector(
        (state: RootState) => state.novedad
    )

    React.useEffect(() => {
        let isMounted = true
        if (isMounted) {
            ; (async function () {
               
            })()
        }
        return () => {
            isMounted = false
        }
    }, [novedadHasModified])
    return (
        <View style={tw`pt-4`}>
            <TarjetaBicicleta/>
        </View>
    )
}

export default ListaBicicletas
