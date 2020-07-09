import React from 'react';
import { SafeAreaView } from '../../core/navigation/components/safeAreaView.component';
import {
  ThemeProvider,
  withStyles,
  BottomNavigation,
  BottomNavigationTab,
} from 'react-native-ui-kitten';
import {MarketIconFill, PortfolioIconFill} from '../../assets/icons';

class MenuComponent extends React.Component {

  onTabSelect = (index) => {
    this.props.onTabSelect(index);
  };

  render() {
    const { selectedIndex, themedStyle } = this.props;
    const AppTheme = {
      "color-primary-100": "#FFF6F2",
      "color-primary-200": "#FFE1D4",
      "color-primary-300": "#FFBD9E",
      "color-primary-400": "#FF854D",
      "color-primary-500": "#FF6721"
    };

    return (
      <SafeAreaView style={themedStyle.safeAreaContainer}>
        <ThemeProvider theme={{...this.props.theme, ...AppTheme}}>
          <BottomNavigation
            appearance='noIndicator'
            selectedIndex={selectedIndex}
            onSelect={this.onTabSelect}>
            <BottomNavigationTab
              title='Market'
              icon={MarketIconFill}
            />
            <BottomNavigationTab
              title='My Portfolio'
              icon={PortfolioIconFill}
            />
          </BottomNavigation>
        </ThemeProvider>
      </SafeAreaView>
    );
  }
}

export const Menu = withStyles(MenuComponent, (theme) => ({
  safeAreaContainer: {
    backgroundColor: theme['background-basic-color-1'],
  },
}));
