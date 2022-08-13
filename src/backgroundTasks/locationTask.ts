import * as TaskManager from 'expo-task-manager'
import { getDatabase, ref, onValue, set, get } from 'firebase/database'

const TASK_NAME = 'BACKGROUND_LOCATION_TASK'

interface Props {
  userToken: string
  foto: string
  setSelfLocation: (location: any) => void
}

export const configureBgTask = ({
  userToken,
  foto,
  setSelfLocation,
}: Props) => {
  //
  //   const reference = ref(db, 'users/' + userToken)
  //   set(reference, {
  //     foto,
  //   })
  //   const lista: any[] = []
  //   participantes.forEach(async (participante) => {
  //     const reference2 = ref(db, 'users/' + participante)
  //     const gett = await get(reference2)
  //     lista.push(gett)
  //   })

  TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
    if (error) {
      return
    }
    if (data) {
      const { locations } = (data as any) || {}
      const [location] = locations || []
      const db = getDatabase()
      if (location) {
        setSelfLocation(location)
        const reference = ref(db, 'users/' + userToken)
        set(reference, {
          foto,
          longitude: location.coords?.longitude,
          latitude: location.coords?.latitude,
        })
      }
    }
  })
}
