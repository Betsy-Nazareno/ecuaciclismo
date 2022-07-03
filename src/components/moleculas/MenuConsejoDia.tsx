import * as React from 'react'
import { View, Pressable, Image } from 'react-native'
import { Consejo } from '../../../models/Consejo.model'
import ConsejosOpcionesMenu from '../atomos/ConsejosOpcionesMenu'
import AdminValidator from '../templates/AdminValidator'
import tw from 'twrnc'

interface MenuConsejoDiaProps {
  consejo: Consejo
}

const MenuConsejoDia = ({ consejo }: MenuConsejoDiaProps) => {
  const [displayMenu, setDisplayMenu] = React.useState(false)
  //stylesProp="w-6 -mr-2"
  return (
    <AdminValidator stylesProp="">
      <Pressable onPress={() => setDisplayMenu(!displayMenu)}>
        <View style={tw`w-6 -mr-2`}>
          <Image
            source={require('../../../assets/menu_icon.png')}
            style={{ height: 25, width: 12 }}
          />
        </View>
      </Pressable>
      {displayMenu && (
        <ConsejosOpcionesMenu
          setDisplay={setDisplayMenu}
          consejo={consejo as Consejo}
        />
      )}
    </AdminValidator>
  )
}

export default MenuConsejoDia
