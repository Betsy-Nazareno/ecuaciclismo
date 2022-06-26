import * as React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

const Spinner = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#F16F31" />
    </View>
  )
}

export default Spinner

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
})
