import React from 'react';
import {useScreens} from 'react-native-screens';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import {AuthLoading} from '../../containers/authLoading.container';
import {SignIn} from '../../containers/signin.container';
import {Market} from '../../containers/market.container';
import {Settings} from '../../containers/settings.container';
import {Portfolio} from '../../containers/portfolio.container';
import {Country} from '../../containers/country.container';
import {Shipment} from '../../containers/shipment.container';
import {Commodity} from '../../containers/commodity.container';
import {
  MenuNavigationOptions,
  MarketNavigationOptions,
  PortfolioNavigationOptions,
} from '../../core/navigation/options';
import {MenuContainer} from '../../containers/menu.container';

const MarketNavigatorMap = {
  ['Market']: Market,
  ['Settings']: {
    screen: Settings,
    navigationOptions: MenuNavigationOptions
  },
  ['Country']: {
    screen: Country,
    navigationOptions: MenuNavigationOptions
  },
  ['Shipment']: {
    screen: Shipment,
    navigationOptions: MenuNavigationOptions
  },
  ['Commodity']: {
    screen: Commodity,
    navigationOptions: MenuNavigationOptions
  },
};

const PortfolioNavigatorMap = {
  ['Portfolio']: Portfolio,
};

const MarketNavigator = createStackNavigator(
  {
    ...MarketNavigatorMap
  },
  {
    defaultNavigationOptions: MarketNavigationOptions,
  }
);

const PortfolioNavigator = createStackNavigator(
  {
    ['Portfolio']: Portfolio,
  },
  {
    defaultNavigationOptions: PortfolioNavigationOptions,
  }
);

const MenuNavigator = createBottomTabNavigator(
  {
    ['Market']: MarketNavigator,
    ['Portfolio']: PortfolioNavigator
  },
  {
    tabBarComponent: MenuContainer
  }
);

const AuthNavigator = createStackNavigator(
  {
    'SignIn': SignIn
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    ['Home']: MenuNavigator,
    ...MarketNavigatorMap,
    ...PortfolioNavigatorMap
  },
  {
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: null,
    }
  }
);

const SwitchNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppNavigator,
    Auth: AuthNavigator,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const createAppRouter = (container) => {
  useScreens();
  return createAppContainer(container);
};

export const Router = createAppRouter(SwitchNavigator);
