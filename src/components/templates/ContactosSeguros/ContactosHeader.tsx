import * as React from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twrnc'
import { setText } from '../../../redux/publicacionBusqueda'
import { RootState } from '../../../redux/store'
import HeaderRoundedContainer from '../../moleculas/HeaderRoundedContainer'
import SearchBar from '../../moleculas/SearchBar'
import SectionTitle from '../../moleculas/SectionTitle'
import OpcionesAgregarContactoSeguro from '../../atomos/OpcionesAgregarContactoSeguro'

const ContactosHeader = () => {
  const [displayMenu, setDisplayMenu] = React.useState(false)
  const { text } = useSelector((state: RootState) => state.busqueda)
  const dispatch = useDispatch()

  const handleText = (text: string) => {
    dispatch(setText({ text }))
  }
  return (
    <>
      <HeaderRoundedContainer>
        <View style={tw`mx-4`}>
            <SectionTitle
              hasButton
              isRestricted={false}
              text="Contactos Seguros"
              styleText="text-3xl"
              background={false}
              buttonIcon={require('../../../../assets/plus.png')}
              handleClickButton={() => setDisplayMenu(!displayMenu)}
            />
              {displayMenu && (
                <OpcionesAgregarContactoSeguro
                  setDisplay={setDisplayMenu}
                />
              )}
          <SearchBar text={text} setText={handleText} />
        </View>
      </HeaderRoundedContainer>
    </>
  )
}

export default ContactosHeader
