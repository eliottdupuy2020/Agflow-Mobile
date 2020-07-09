import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {withStyles, Toggle, Text} from 'react-native-ui-kitten';
import {textStyle} from '../components/common';
import {ContainerView} from '../components/common/containerView.component';
import AsyncStorage from '@react-native-community/async-storage';
import {getAuth0Token} from '../core/auth';

class SettingsComponent extends React.Component {
  state = {priceUpdateEnabled: true};

  onEditProfilePress = () => {

  };

  onChangePasswordPress = () => {

  };

  onPriceUpdateEnabledChange = (priceUpdateEnabled) => {
    this.setState({ priceUpdateEnabled });
  };

  onLogoutPress = () => {
    this.logout().then(() => {});
  };

  logout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
    return {}
  };

  render() {
    const { themedStyle } = this.props;
    const soundEnabled = this.state.priceUpdateEnabled;

    return (
      <View style={themedStyle.container}>
        <View style={themedStyle.sections_container}>
          {/*<View*/}
          {/*  style={[themedStyle.section, themedStyle.accountSection]}>*/}
          {/*  <Text*/}
          {/*    style={themedStyle.sectionText}*/}
          {/*    category='s1'>*/}
          {/*    Account*/}
          {/*  </Text>*/}
          {/*</View>*/}
          {/*<TouchableOpacity*/}
          {/*  activeOpacity={0.65}*/}
          {/*  style={themedStyle.section}*/}
          {/*  onPress={this.onEditProfilePress}>*/}
          {/*  <Text*/}
          {/*    style={themedStyle.sectionText}*/}
          {/*    category='s2'>*/}
          {/*    Edit Profile*/}
          {/*  </Text>*/}
          {/*</TouchableOpacity>*/}
          <TouchableOpacity
            activeOpacity={0.65}
            style={themedStyle.section}
            onPress={this.onChangePasswordPress}>
            <Text
              style={themedStyle.sectionText}
              category='s2'>
              Change Password
            </Text>
          </TouchableOpacity>

          {/*<View*/}
          {/*  style={[themedStyle.section, themedStyle.notificationSection]}>*/}
          {/*  <Text*/}
          {/*    style={themedStyle.sectionText}*/}
          {/*    category='s1'>*/}
          {/*    Push Notification*/}
          {/*  </Text>*/}
          {/*</View>*/}
          <View
            style={[themedStyle.section, themedStyle.priceUpdateEnabledSection]}>
            <Text
              style={themedStyle.sectionText}
              category='s2'>
              Push Notification
            </Text>
            <Toggle
              checked={soundEnabled}
              onChange={this.onPriceUpdateEnabledChange}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.65}
            style={[themedStyle.section, themedStyle.logoutSection]}
            onPress={this.onLogoutPress}>
            <Text
              style={themedStyle.sectionText}
              category='s2'>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        <View style={themedStyle.disclaimer_message_container}>
          <Text style={themedStyle.disclaimer_message}>This mobile app is providing you a snapshot of our database. For exhaustive usage, please go to the web platform.</Text>
        </View>
      </View>
    );
  }
}

export const Settings = withStyles(SettingsComponent, (theme) => ({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme['background-basic-color-1'],
    borderTopWidth: 1,
    borderTopColor: theme['border-basic-color-2'],
    borderBottomWidth: 1,
    borderBottomColor: theme['border-basic-color-2'],
  },
  sections_container: {
  },
    section: {
      padding: 16,
      backgroundColor: theme['background-basic-color-1'],
      borderBottomWidth: 1,
      borderBottomColor: theme['border-basic-color-2'],
    },
    notificationSection: {
      paddingTop: 40,
    },
    priceUpdateEnabledSection: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    logoutSection: {
      // paddingTop: 40,
    },
    sectionText: textStyle.subtitle,
  disclaimer_message_container: {
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
    disclaimer_message: {
      fontSize: 10,
      fontFamily: 'OpenSans-Regular',
    }
}));
