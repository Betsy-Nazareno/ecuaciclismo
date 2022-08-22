import * as TaskManager from 'expo-task-manager'
import { get, getDatabase, push, ref, set } from 'firebase/database'
import { getDistance } from 'geolib'

const TASK_NAME = 'BACKGROUND_LOCATION_TASK'

interface Props {
  userToken: string
  foto: string
  setSelfLocation: (location: any) => void
}

export const configureBgTask = ({ userToken, foto }: Props) => {
  const db = getDatabase()
  const referenceLocation = ref(db, 'users/' + userToken + '/location')
  const referenceSpeed = ref(db, 'users/' + userToken + '/speed')
  const referenceTime = ref(db, 'users/' + userToken + '/timestamp')
  const referenceDistance = ref(db, 'users/' + userToken + '/distance')

  TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
    if (error) {
      return
    }
    if (data) {
      const { locations } = (data as any) || {}
      const [location] = locations || []
      if (location) {
        const { coords, timestamp } = location
        const { longitude, latitude, speed } = coords || {}

        const snapshot = await get(referenceDistance)
        const data = snapshot.val()

        let distance = 0.01
        if (data?.distance) {
          distance = getDistance(
            { latitude, longitude },
            {
              latitude: data?.previousLatitude,
              lng: data?.previousLongitude,
            }
          )
        }
        set(referenceDistance, {
          distance: (data?.distance || 0) + distance,
          previousLatitude: latitude,
          previousLongitude: longitude,
        })
        set(referenceLocation, {
          foto,
          longitude,
          latitude,
        })
        push(referenceSpeed, speed)
        push(referenceTime, timestamp)
      }
    }
  })
}
