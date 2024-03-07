import 'react-native-gesture-handler'
import { HomeScreen } from '../screens/HomeScreen'
import { ProfileScreen } from '../screens/profiles/ProfileScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { InstagramIcon } from '../assets/icons/InstagramIcon'
import { theme } from '../styles/theme'
import { Dimensions, StyleSheet, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const devWidth = Dimensions.get('window').width

export const UserLoggedNavigation = () => {
  const Tab = createBottomTabNavigator()
  const HomeIcon = Ionicons
  const PersonIcon = Ionicons

  return (
    <Tab.Navigator
      initialRouteName="WelcomeScreen"
      backBehavior="history"
      screenOptions={{
        tabBarStyle: {
          width: '100%',
        },
        tabBarShowLabel: false,
        header: () => <></>,
        tabBarActiveTintColor: theme.colors.white,
        tabBarActiveBackgroundColor: theme.colors.white,
        tabBarInactiveBackgroundColor: theme.colors.white,
        tabBarIcon: ({ focused }) => <InstagramIcon focused={focused} />,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => (
            <View style={[styles.tabIcon, { zIndex: -2 }]}>
              <HomeIcon name="home-outline" size={30} color={theme.colors.primary} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <View style={[styles.tabIcon, { zIndex: -2 }]}>
              <PersonIcon name="person-outline" size={30} color={theme.colors.primary} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabIcon: {
    width: devWidth / 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerTab: {
    width: (devWidth / 3) * 0.4,
    height: (devWidth / 3) * 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -(((devWidth / 3) * 0.4) / 2),
    backgroundColor: theme.colors.primary,
    borderRadius: ((devWidth / 3) * 0.4) / 2,
  },
  timerTabContent: {
    backgroundColor: theme.colors.primary,
    width: (devWidth / 3) * 0.4 - 20,
    height: (devWidth / 3) * 0.4 - 20,
    borderRadius: ((devWidth / 3) * 0.4 - 20) / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
