import {
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytes,
} from 'firebase/storage'
import { firebaseStorage } from '../config/firebase'

export const guardarArchivo = async (
  folder: string,
  name: string,
  uri: string
): Promise<string> => {
  const filePath = `/${folder}/${name?.replace(/\s/g, '')}`
  const fileRef: StorageReference = ref(firebaseStorage, filePath)

  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.response)
    }
    xhr.onerror = function () {
      reject(new TypeError('Network request failed'))
    }
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)
    xhr.send(null)
  })

  await uploadBytes(fileRef, blob)
  const url: string = await getDownloadURL(fileRef)
  return url || ''
}
