import React from 'react';
import {
  withStyles,
  TopNavigation,
  TopNavigationAction,
} from 'react-native-ui-kitten';
import { textStyle } from '../../../components/common';
import { SafeAreaView } from './safeAreaView.component';

class TopNavigationBarComponent extends React.Component {

  onBackButtonPress = () => {
    if (this.props.onBackPress) {
      this.props.onBackPress();
    }
  };

  renderBackButton = (source) => {
    return (
      <TopNavigationAction
        icon={source}
        onPress={this.onBackButtonPress}
      />
    );
  };

  render() {
    const { themedStyle, title, backIcon } = this.props;
    const leftControlElement = backIcon ? this.renderBackButton(backIcon) : null;

    return (
      <SafeAreaView style={themedStyle.safeArea}>
        <TopNavigation
          alignment='center'
          title={title}
          titleStyle={textStyle.subtitle}
          subtitleStyle={textStyle.caption1}
          leftControl={leftControlElement}
        />
      </SafeAreaView>
    );
  }
}

export const TopNavigationBar = withStyles(TopNavigationBarComponent, (theme) => ({
  safeArea: {
    backgroundColor: theme['background-basic-color-1'],
  },
}));
