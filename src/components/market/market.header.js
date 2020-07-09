import React from 'react';
import {
  withStyles,
  TopNavigationAction,
  TopNavigation,
} from 'react-native-ui-kitten';
import { SafeAreaView } from '../../core/navigation';
import {
  ArrowIosBackFill,
  SettingsIconFill,
} from '../../assets/icons';

class MarketHeaderComponent extends React.Component {
  onBackPress = () => {
    this.props.onBack();
  };

  onSettingsPress = () => {
    this.props.onSettings();
  };

  renderLeftControl = () => {
    return (
      <TopNavigationAction
        icon={ArrowIosBackFill}
        onPress={this.onBackPress}
      />
    );
  };

  renderSettingsIcon = (style) => {
    const {themedStyle} = this.props;

    return SettingsIconFill({ ...style });
  };

  renderRightControls = () => {
    return ([
      <TopNavigationAction
        icon={this.renderSettingsIcon}
        onPress={this.onSettingsPress}
      />,
    ]);
  };

  render() {
    const { themedStyle, title } = this.props;

    return (
      <SafeAreaView style={themedStyle.container}>
        <TopNavigation
          alignment='center'
          title={title}
          // leftControl={this.renderLeftControl()}
          rightControls={this.renderRightControls()}
        />
      </SafeAreaView>
    );
  }
}

export const MarketHeader = withStyles(MarketHeaderComponent, (theme) => ({
  container: {
    backgroundColor: theme['background-basic-color-1'],
  },
}));

