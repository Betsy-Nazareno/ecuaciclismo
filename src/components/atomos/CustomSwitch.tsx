import * as React from 'react'
import { Switch } from 'react-native-gesture-handler'

interface CustomSwitchProps {
  handleClick: () => void
  active: boolean
}

const CustomSwitch = ({ active, handleClick }: CustomSwitchProps) => {
  return (
    <Switch
      trackColor={{ false: '#e6e6e6', true: '#81b0ff' }}
      thumbColor="#3FA1EE"
      onValueChange={handleClick}
      value={active}
    />
  )
}

export default CustomSwitch
