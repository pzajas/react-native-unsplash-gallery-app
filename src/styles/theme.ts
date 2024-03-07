import { DefaultTheme } from '@react-navigation/native'

export const theme = {
  colors: {
    primary: '#ff365d',

    white: '#ffffff',
    black: '#181818',
    blue: ' #4682B4',
    gray: '#808080',
  },
}

export const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FFFFFF',
  },
}
