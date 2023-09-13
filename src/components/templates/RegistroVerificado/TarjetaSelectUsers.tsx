import * as React from 'react'
import tw from 'twrnc'
import { Image, Pressable, Text, View } from 'react-native'
import { CustomText } from '../../atomos/CustomText'
import { TEXT_COLORS, imagesRoutes } from '../../../utils/constants'
import Gap from '../../atomos/Gap'
import { capitalize } from '../../../utils/capitalizeText'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { User } from './VerifiedRegister'
import { setElection } from '../../../redux/RegistroVerificado'

interface TarjetaSelectUsersProps {
  usuario: User
}

const TarjetaComunityContact = ({ usuario }: TarjetaSelectUsersProps) => {
  const [ isChecked, setIsChecked ] = React.useState<boolean>(false)
  const { election, isElectionModified } = useSelector((state: RootState) => state.verificado)
  const dispatch = useDispatch()

  React.useEffect(() => {
    (election?.includes(usuario)) ? setIsChecked(true) : null
  }, [isElectionModified])
  
  const handlePress = () => {
    if(!isChecked){
      addUser(usuario)
    }else{
      deleteUser(usuario)
    }
  }

  const deleteUser = (val: User) => {
    dispatch(setElection({election: [
      ...(election || []).filter((u) => u.username !== val.username),
    ]}))
  }

  const addUser = async (val: User) => {
    dispatch(setElection({election: [...(election || []), val]}))
  }

  const labels: string[]= Object.keys(imagesRoutes)
  let indx=0
  const label: string = usuario.tipo ?? ''
  while(indx<labels.length && label!= labels[indx]){indx++}
  let val
  (indx>=labels.length)?
    (val=require("../../../../assets/failed.png")) : (val = Object.values(imagesRoutes)[indx])

  return (
    <>
      <View
        style={tw`bg-white rounded-xl w-full my-1 py-2 flex flex-row justify-between`}
      >
        <View style={tw`flex flex-row items-center`}>
          <Image
            source={
              usuario.foto
                ? { uri: usuario.foto }
                : require('../../../../assets/user.png')
            }
            style={{
              width: 60,
              height: 60,
              borderRadius: 400 / 2,
            }}
            resizeMode="contain"
          />
          <Gap px="4">
            <View style={tw`flex flex-row items-center`}>
              <CustomText style={`${TEXT_COLORS.DARK_BLUE}`}>
                {capitalize(usuario.first_name)} {capitalize(usuario.last_name)}
              </CustomText>
              <View style={{ paddingLeft: 9 }}>
                {usuario.admin ? (
                  <Image
                    source={require('../../../../assets/admin.png')}
                    style={{ width: 20, height: 20 }}
                  />
                ) : (label!=='') ? (
                  <Image
                    source={val}
                    style={{ width: 20, height: 20 }}
                  />
                ) : null}
              </View>
            </View>
            {usuario.admin ?
              (<Text style={tw`text-xs text-black text-opacity-40`}>Administrador</Text>)
              : (<Text style={tw`text-xs text-black text-opacity-40`}>{label}</Text>)
            }
          </Gap>
        </View>

        <View style={tw`flex flex-row right-0 items-center`}>
          <Pressable style={tw`my-1 p-2 flex flex-row items-center`} onPress={() => {
            setIsChecked(!isChecked)
            handlePress()
          }}>
                <View
                  style={tw`rounded-full w-5 h-5 ${(isChecked)? 'bg-[#2D84C4]':'bg-[#D9D9D9] border border-black'}`}
                />
          </Pressable>      
        </View>

      </View>
    </>
  )
}

export default TarjetaComunityContact
