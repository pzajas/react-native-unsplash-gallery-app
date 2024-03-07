import { FIREBASE_AUTH } from '../../Firebase'

export const checkLoginStatus = async () => {
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
