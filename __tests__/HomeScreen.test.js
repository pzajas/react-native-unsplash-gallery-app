import { render, fireEvent, waitFor } from '@testing-library/react-native'
import { HomeScreen } from '../src/screens/HomeScreen'
import { Alert } from 'react-native'
import React from 'react'

jest.mock('../api/fetchPhotos', () => ({
  fetchPhotos: jest.fn(),
}))
jest.mock('../firebase/utils/authenticationUtility', () => ({
  checkLoginStatus: jest.fn(),
}))
jest.mock('../utils/networkUtility', () => ({
  checkInternetConnection: jest.fn(),
}))

const mockFetchPhotos = (response) => {
  require('../api/fetchPhotos').fetchPhotos.mockResolvedValue(response)
}

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText } = render(<HomeScreen />)
    const searchInput = getByPlaceholderText('Enter search query')

    expect(searchInput).toBeDefined()
  })

  it('fetches photos when search query is entered', async () => {
    const { getByPlaceholderText } = render(<HomeScreen />)
    const searchInput = getByPlaceholderText('Enter search query')

    const mockPhotoData = {
      photos: [
        { id: '1', urls: { small: 'https://example.com/photo1.jpg' } },
        { id: '2', urls: { small: 'https://example.com/photo2.jpg' } },
      ],
    }

    mockFetchPhotos(mockPhotoData)

    fireEvent.changeText(searchInput, 'nature')
    fireEvent(searchInput, 'submitEditing')

    await waitFor(() => {
      expect(require('../api/fetchPhotos').fetchPhotos).toHaveBeenCalledWith({
        searchQuery: 'nature',
        page: 1,
        setPhotos: expect.any(Function),
        setPage: expect.any(Function),
      })
    })
  })
  it('displays an alert if there is no internet connection', async () => {
    const alertSpy = jest.spyOn(Alert, 'alert').mockImplementation()

    require('../utils/networkUtility').checkInternetConnection.mockResolvedValue(false)

    const { getByPlaceholderText } = render(<HomeScreen />)
    const searchInput = getByPlaceholderText('Enter search query')

    fireEvent.changeText(searchInput, 'nature')
    fireEvent(searchInput, 'submitEditing')

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        'No Internet Connection',
        'Please check your internet connection and try again.',
        [{ text: 'OK' }]
      )
    })

    alertSpy.mockRestore()
  })
})
