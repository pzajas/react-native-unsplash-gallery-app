import axios from 'axios'
interface IPhoto {
  id: string
  urls: {
    small: string
  }
}

interface IFetchPhotos {
  searchQuery: string
  page: number
  setPhotos: React.Dispatch<React.SetStateAction<IPhoto[]>>
  setPage: React.Dispatch<React.SetStateAction<number>>
}

export const fetchPhotos = async ({ searchQuery, page, setPhotos, setPage }: IFetchPhotos): Promise<void> => {
  const clientId = 'j7Afpg-iZ5t_ioMkB-Ii1GwXp24rPcN8n2fqoo7cjLg'
  const apiAddress = 'https://api.unsplash.com'
  const perPage = 2

  try {
    const response = await axios.get(
      `${apiAddress}/search/photos?query=${searchQuery}&client_id=${clientId}&per_page=${perPage}&page=${page}`
    )

    const newPhotos = response.data.results as IPhoto[]

    setPhotos((prevPhotos) => (page === 1 ? newPhotos : [...prevPhotos, ...newPhotos]))
    setPage((prevPage) => prevPage + 1)
  } catch (error) {
    console.error('Error fetching photos:', error)
    throw error
  }
}
