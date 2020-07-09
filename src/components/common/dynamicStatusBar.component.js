import React from 'react';
import {
  View,
  StatusBar,
  Platform,
} from 'react-native';
import {
  withStyles,
} from 'react-native-ui-kitten';
import {getStatusBarHeight} from 'react-native-status-bar-height';

class DynamicStatusBarComponent extends React.Component {

  getStatusBarContent = () => {
    const currentTheme = 'dark';

    if (currentTheme !== 'dark') {
      return 'dark-content';
    } else {
      return 'light-content';
    }
  };

  render() {
    const {themedStyle} = this.props;

    const androidStatusBarBgColor = themedStyle.container.backgroundColor;
    const barStyle = this.getStatusBarContent();

    return (
      <View style={themedStyle.container}>
        <StatusBar
          backgroundColor={androidStatusBarBgColor}
          barStyle={barStyle}
        />
      </View>
    );
  }
}

export const DynamicStatusBar = withStyles(DynamicStatusBarComponent, (theme) => ({
  container: {
    backgroundColor: theme['background-basic-color-1'],
    height: Platform.select({
      ios: getStatusBarHeight(),
      android: 0,
    }),
  },
}));
