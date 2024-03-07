import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { UserNotLoggedInNavigation } from './UserNotLoggedInNavigation'
import { UserLoggedNavigation } from './UserLoggedNavigation'
import { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import { useSelector } from 'react-redux'
import { FIREBASE_AUTH } from '../../Firebase'

const LoadingScreen = () => {
  return <ActivityIndicator />
}

export const MainStack = () => {
  const Stack = createNativeStackNavigator()
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState<any>(null)
  const isUserEmailVerified = useSelector((state) => state?.authData?.isEmailVerified)

  useEffect(() => {
    const unsubscribe = FIREBASE_AUTH.onAuthStateChanged((user) => {
      setUser(user)

      if (initializing) {
        setInitializing(false)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [initializing])

  if (initializing) {
    return <LoadingScreen />
  }

  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerShown: false,
        gestureEnabled: false,
      })}
    >
      {user && isUserEmailVerified ? (
        <Stack.Screen name="UserLoggedStack" component={UserLoggedNavigation} />
      ) : (
        <Stack.Screen name="UserNotLoggedStack" component={UserNotLoggedInNavigation} />
      )}
    </Stack.Navigator>
  )
}
