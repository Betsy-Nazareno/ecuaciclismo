import { DocumentResult } from 'expo-document-picker'
import {
  getDownloadURL,
  ref,
  StorageReference,
  uploadBytes,
} from 'firebase/storage'
import { firebaseStorage } from '../config/firebase'

export const guardarArchivo = async (
  folder: string,
  file: DocumentResult
): Promise<string> => {
  if (file.type === 'cancel') {
    return ''
  }
  const filePath = `/${folder}/${file.name?.replace(/\s/g, '')}`
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
    xhr.open('GET', file.uri, true)
    xhr.send(null)
  })

  await uploadBytes(fileRef, blob)
  const url: string = await getDownloadURL(fileRef)
  return url || ''
}
