import { useEffect, useState } from 'react'
import { StyleSheet, Image, TextInput, SafeAreaView, Dimensions, FlatList, Text, View, Alert } from 'react-native'
import { fetchPhotos } from '../../api/fetchPhotos'
import { checkLoginStatus } from '../../firebase/utils/authenticationUtility'
import { theme } from '../styles/theme'
import { checkInternetConnection } from '../../utils/networkUtility'
import React from 'react'

const { width } = Dimensions.get('window')
interface IPhotoItem {
  id: string
  urls: {
    small: string
  }
}
interface IPhoto {
  id: string
  urls: {
    small: string
  }
}

export const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [photos, setPhotos] = useState<IPhoto[]>([])
  const [page, setPage] = useState(1)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    void checkLoginStatus()
  }, [])

  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await checkInternetConnection()

      if (!isConnected) {
        Alert.alert('No Internet Connection', 'Please check your internet connection and try again.', [{ text: 'OK' }])
      }
    }

    void checkConnection()
  }, [])

  const fetchPhotosData = async (): Promise<void> => {
    try {
      await fetchPhotos({ searchQuery, page, setPhotos, setPage })
      setHasError(false)
    } catch (error) {
      if (!hasError) {
        setHasError(true)
        Alert.alert('Error', 'An error occurred while fetching photos. Please try again later.', [
          { text: 'OK', onPress: () => setHasError(false) },
        ])
      }
    }
  }

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchQuery !== '') {
        setPhotos([])
        setPage(1)
        void fetchPhotosData()
      } else {
        setPhotos([])
        setPage(1)
      }
    }, 300)

    return () => clearTimeout(delaySearch)
  }, [searchQuery])

  const handleEndReached = () => {
    void fetchPhotosData()
  }

  const renderItem = ({ item }: { item: IPhotoItem }) => (
    <Image source={{ uri: item?.urls?.small }} style={styles.image} key={item.urls.small} />
  )

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Enter search query"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
        placeholderTextColor={theme.colors.gray}
      />
      {photos.length ? (
        <FlatList
          data={photos}
          keyExtractor={(item, index) => `${item.urls.small}${index}`}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
        />
      ) : (
        <View style={styles.emptyFlatlist}>
          <Text>No photos loaded</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    padding: 16,
  },
  textInput: {
    height: 40,
    borderColor: theme.colors.black,
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    fontSize: 18,
  },
  image: {
    width: width * 0.44,
    aspectRatio: 1,
    margin: 4,
    borderRadius: 8,
  },
  flatListContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyFlatlist: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
})
