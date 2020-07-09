import React from 'react';
import {View, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Text, Button, Layout} from 'react-native-ui-kitten';
import {withStyles} from 'react-native-ui-kitten';
import {textStyle} from '../components/common/style';
import imageAppLogo from '../assets/images/logo-white-landscape.png';
import Auth0 from 'react-native-auth0';
import DeviceInfo from 'react-native-device-info';

const credentials = { domain: 'agflow.eu.auth0.com', clientId: 'KAhRG1YVo0UKFiS6yHIy6bAl2iI2OziG' };
const auth0 = new Auth0(credentials);

class SignInContainer extends React.Component {
  state = {
    accessToken: null
  };

  setUserToken = async (credentials) => {
    const expiresIn = 's:' + (Date.now() + (credentials.expiresIn * 1000) - 3000);
    await AsyncStorage.setItem('accessToken', credentials.accessToken);
    await AsyncStorage.setItem('idToken', credentials.idToken);
    await AsyncStorage.setItem('expiresIn', expiresIn);
  };

  onSignInButtonPress = () => {
    console.log('DeviceInfo', DeviceInfo.getUniqueId());
    auth0.webAuth
      .authorize({
        scope: 'openid profile email',
        audience: 'https://next.agflow.com',
      })
      .then(credentials => {
        console.log('credentials', credentials);
        this.setUserToken(credentials);
        this.props.navigation.navigate('App');
      })
      .catch(error => console.log(error));
  };

  onSignUpButtonPress = () => {

  };

  render() {
    const {themedStyle} = this.props;

    return (
      <Layout style={themedStyle.container}>
        <View style={themedStyle.headerContainer}>
          <Image style={themedStyle.imageStyle} source={imageAppLogo} />
          <Text
            style={themedStyle.AgFlowDescription}
            category='h5'>
            Your trusted source for physical market data across grains, oilseeds and vegoils
          </Text>
        </View>
        <Button
          style={themedStyle.signInButton}
          textStyle={textStyle.button}
          size='giant'
          onPress={this.onSignInButtonPress}>
          SIGN IN
        </Button>
        {/* <Button
          style={themedStyle.signUpButton}
          textStyle={themedStyle.signUpText}
          appearance='ghost'
          activeOpacity={0.75}
          onPress={this.onSignUpButtonPress}>
          Don't have an account? Sign Up
        </Button> */}
      </Layout>
    );
  }
}

export const SignIn = withStyles(SignInContainer, (theme) => ({
  container: {
    flex: 1,
    width: '100%',
  },
  headerContainer: {
    flex: 1,
    minHeight: 280,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
    imageStyle: {
      height: 150,
      width: '80%',
      resizeMode: 'contain',
    },
    AgFlowDescription: {
      marginTop: 16,
      color: 'white',
      textAlign: 'center',
      ...textStyle.subtitle,
    },
  signInButton: {
    marginHorizontal: 16,
    marginVertical: 20,
  },
  signUpButton: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  signUpText: {
    color: 'white',
    ...textStyle.subtitle,
  },
}));
