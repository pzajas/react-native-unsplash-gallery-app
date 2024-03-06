import { StyleSheet, Text, View } from 'react-native'

export const StatsScreen = () => {
  return (
    <View style={styles.screenContainer}>
      <Text>Stats Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screenContainer: {
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
