import NetInfo from '@react-native-community/netinfo'

export const checkInternetConnection = async () => {
  const netInfoState = await NetInfo.fetch()
  return netInfoState.isConnected
}
