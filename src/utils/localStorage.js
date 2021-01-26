import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native'
import { Constants } from './Constants'

const storage = AsyncStorage;
const tokenKey = Constants.access_Token;

export const setToken = token => {
  storage.setItem(
    tokenKey,
    JSON.stringify({
      value: token,
    }),
  );
};

export const getToken = async () => {
  const encodedStoredToken = await storage.getItem(tokenKey);
  if (encodedStoredToken) {
    try {
      const storedToken = JSON.parse(encodedStoredToken);
      return storedToken.value;
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const removeToken = async (props) => {
  try {
    await Alert.alert(
      'Silk Innovation',
      `Are you sure you want to logout?`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('cancel')
          },
          style: 'cancel',
        },
        {
          text: 'Continue',
          onPress: () => {
            storage.removeItem(tokenKey)
            props.navigation.replace("Auth");
          },
        },
      ],
      { cancelable: false }
    )

  } catch (error) {
    // Error retrieving data
  }
}
