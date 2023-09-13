import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../components/templates/RegistroVerificado/VerifiedRegister'

interface RegistroVerificadoSlice {
    users: User[],
    election: User[],
    isUserModified: boolean,
    isElectionModified: boolean
}

const initialState: RegistroVerificadoSlice = {
    users: [],
    election: [],
    isUserModified: false,
    isElectionModified: false
}

export const RegistroVerificado = createSlice({
  name: 'RegistroVerificado',
  initialState,
  reducers: {
    setRegistroVerificado: (state, action: PayloadAction<{users: User[]}>) => {
      state.users = action.payload.users
      state.isUserModified = !state.isUserModified
    },
    setElection: (state, action: PayloadAction<{election: User[]}>) => {
      state.election = action.payload.election
      state.isElectionModified = !state.isElectionModified
    },
  },
})

export const {
    setRegistroVerificado,
    setElection,
} = RegistroVerificado.actions

export default RegistroVerificado.reducer
