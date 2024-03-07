Description
Yeast is a mobile application developed using React Native, Expo, and Firebase. It allows users to search and view photos. The application includes features such as authentication, photo fetching, and social login options.

Version
1.0.0

Table of Contents
Installation
Usage
Dependencies
Development
Testing
Contributing
License
Installation
Clone the repository: git clone https://github.com/your-username/yeast.git
Navigate to the project directory: cd yeast
Install dependencies: yarn install
Usage
To run the application on different platforms:

Android: yarn android
iOS: yarn ios
Web: yarn web
Dependencies
Expo
Firebase
React Native
Redux
TypeScript
and more (see package.json for the full list)
Development
To start development, follow these steps:

Install development dependencies: yarn install --dev
Start the development server: yarn start
Testing
The application uses Jest for testing. Run tests with the command: yarn test

Contributing
Feel free to contribute by creating issues or submitting pull requests. Follow the Contribution Guidelines for more details.

License
This project is licensed under the MIT License.

Additional Information
HomeScreen Tests
The HomeScreen component is tested using the @testing-library/react-native library. Three tests are included to ensure the correct rendering of the component, fetching photos based on a search query, and displaying an alert in case of no internet connection.

HomeScreen Component
The HomeScreen component is a React functional component that utilizes various dependencies such as react-hook-form, react-redux, and Expo libraries for fetching photos, navigation, and UI components.

Redux Store Configuration
The application uses Redux for state management. The Redux store is configured in the store.ts file, with persistence handled by redux-persist and AsyncStorage.

Main Navigation Stack
The main navigation stack is implemented using @react-navigation/native-stack. The MainStack component decides whether to show the user-logged or user-not-logged stack based on authentication status.

Firebase Authentication Utility
The checkLoginStatus function in authenticationUtility.ts checks the user's login status using Firebase authentication and waits for the user to be available.

LoginScreen Component
The LoginScreen component handles user authentication using Firebase email/password authentication. It includes form validation and error handling.

RegisterScreen Component
The RegisterScreen component provides options for social login and user registration using Firebase authentication. It includes a toggle for switching between login and registration forms.
