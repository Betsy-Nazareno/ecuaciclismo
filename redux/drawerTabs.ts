import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ScreensDrawer } from '../models/Screens.types'

interface DrawerTabsSlice {
  activeTab: ScreensDrawer
}

const initialState: DrawerTabsSlice = {
  activeTab: 'HomeStack',
}

export const ScreenStore = createSlice({
  name: 'drawerTabs',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<DrawerTabsSlice>) => {
      state.activeTab = action.payload.activeTab
    },
  },
})

export const { setActiveTab } = ScreenStore.actions

export default ScreenStore.reducer
