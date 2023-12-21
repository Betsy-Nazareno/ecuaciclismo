import axios from "axios";
import { Bicicleta } from "../../models/Bicicletas";
import { MultimediaResult } from '../../models/Publicaciones.model'
import { isAudioRecording, isImagePickerResult } from '../../utils/ckeckTypes'
import { FOLDERS_STORAGE } from '../../utils/constants'
import { guardarArchivo } from '../googleCloudStorage'
import { ImagePickerResult } from 'expo-image-picker'


export const agregarBicicleta = async (
    bicicleta: Bicicleta,
    token: string,
) => {
    try {
        const { imagen} = bicicleta
        const multimediaPaths = await guardarMultimedia(imagen)

        const data = {
            tipo: bicicleta.tipo,
            marca: bicicleta.marca,
            codigo: bicicleta.codigo,
            multimedia: [...multimediaPaths]
          }

          console.log(data)

        const response = await axios({
            method: 'POST',
            url: 'https://788e-181-199-42-26.ngrok-free.app/api/biclicleta/crear_bicicleta/',
            data,
            headers: { Authorization: 'Token ' + token },

        })
        return response.data
    } catch (e) {
        console.error(e)
        throw new Error('Error interno del servidor (500)');
    }
}

const guardarMultimedia = async (multimedia: ImagePickerResult[]) => {
    const multimediaPaths = []
    for (let i = 0; i < multimedia?.length; i++) {
      const file = multimedia[i]
      const isDocResult = isImagePickerResult(file)
      if (isDocResult && file.cancelled == false) {
        const { uri, type } = file
        const name = uri.split('/').pop() || ''
        const path = await guardarArchivo(
          FOLDERS_STORAGE.BICICLETAS,
          name,
          uri
        )
        multimediaPaths.push({ link: path, path: '' })
      } else {
        const fileResult = file as unknown as MultimediaResult
        if (fileResult.tipo !== 'audio') {
          multimediaPaths.push({
            link: fileResult.link,
            tipo: fileResult.tipo,
            path: '',
          })
        }
      }
    }
    return multimediaPaths
  }
