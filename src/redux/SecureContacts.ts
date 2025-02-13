import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface SecureContactsSlice {
  secureContactsHasModified?: boolean
}

const initialState: SecureContactsSlice = {
  secureContactsHasModified: false,
}

export const SecureContacts = createSlice({
  name: 'SecureContacts',
  initialState,
  reducers: {
    setSecureContactsHasModified: (state, action: PayloadAction<SecureContactsSlice>) => {
      state.secureContactsHasModified = action.payload.secureContactsHasModified
    },
  },
})

export const {
  setSecureContactsHasModified,
} = SecureContacts.actions

export default SecureContacts.reducer
