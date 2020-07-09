import React from 'react';
import { Platform } from 'react-native';
import {
  SafeAreaView as SafeAreaViewReactNavigation,
} from 'react-navigation';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export class SafeAreaView extends React.Component {

  statusBarHeight: number = Platform.select({
    ios: getStatusBarHeight(),
    android: 0,
  });

  componentDidMount() {
    // @ts-ignore (private API)
    // https://github.com/expo/expo/issues/2940#issuecomment-445937038

    SafeAreaViewReactNavigation.setStatusBarHeight(this.statusBarHeight);
  }

  render() {
    return (
      <SafeAreaViewReactNavigation {...this.props}/>
    );
  }
}
