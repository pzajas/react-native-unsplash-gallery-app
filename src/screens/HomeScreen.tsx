import { FIREBASE_AUTH } from '../../Firebase'
import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

export const HomeScreen = () => {
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        let user = FIREBASE_AUTH.currentUser

        while (!user) {
          await new Promise((resolve) => setTimeout(resolve, 1000))
          user = FIREBASE_AUTH.currentUser
        }
      } catch (error) {
        console.error('Error checking login status:', error)
      }
    }

    void checkLoginStatus()
  }, [])

  return (
    <View style={styles.screenContainer}>
      <Text>Home Screen</Text>
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
