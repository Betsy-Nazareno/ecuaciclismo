import * as TaskManager from 'expo-task-manager'
import { getDatabase, push, ref, set } from 'firebase/database'

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
  TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
    if (error) {
      return
    }
    if (data) {
      const { locations } = (data as any) || {}
      const [location] = locations || []
      const db = getDatabase()
      if (location) {
        // setSelfLocation(location)
        const referenceLocation = ref(db, 'users/' + userToken + '/location')
        const referenceSpeed = ref(db, 'users/' + userToken + '/speed')

        const { coords } = location
        set(referenceLocation, {
          foto,
          longitude: coords?.longitude,
          latitude: coords?.latitude,
        })
        push(referenceSpeed, coords?.speed)
      }
    }
  })
}
