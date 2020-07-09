import React from 'react';
import {StatusBar} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {Layout, Spinner} from 'react-native-ui-kitten';
import {withStyles} from 'react-native-ui-kitten';

class AuthLoadingContainer extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(accessToken ? 'App' : 'Auth');
  };

  render() {
    const {themedStyle} = this.props;

    return (
      <Layout style={themedStyle.container}>
        <Spinner />
        <StatusBar barStyle="default" />
      </Layout>
    );
  }
}

export const AuthLoading = withStyles(AuthLoadingContainer, (theme) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
