import AsyncStorage from '@react-native-community/async-storage';

export const getAuth0Token = async () => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  const idToken = await AsyncStorage.getItem('idToken');
  const expiresIn = await AsyncStorage.getItem('expiresIn');

  if (expiresIn.substr(2) * 1 < Date.now()) {
    await AsyncStorage.clear();
    throw "expired_token";
  }

  return {accessToken: accessToken, idToken: idToken};
};

export const userLogout = async () => {
  await AsyncStorage.clear();
  return {};
};
