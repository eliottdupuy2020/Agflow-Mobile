import React from 'react';
import {MenuContainer} from '../../containers/menu.container';
import {ArrowIosBackFill} from '../../assets/icons/index';
import {TopNavigationBar} from './components/topNavigationBar.component';
import {MarketHeader} from '../../components/market/market.header';
import {PortfolioHeader} from '../../components/portfolio/portfolio.header';
import {
  getCurrentRouteState,
  isRootRoute,
  getCurrentRouteIndex,
} from './util';
import {KEY_NAVIGATION_BACK} from './constants';

const MenuTopNavigationParams = {
  header: (props) => {
    const {routeName, params} = getCurrentRouteState(props.navigation);
    const index = getCurrentRouteIndex(props.navigation);

    let title = routeName;
    if (params && params['title']) {
      title = params['title'];
    }

    return (
      <TopNavigationBar
        {...props}
        title={title}
        backIcon={isRootRoute(index) && ArrowIosBackFill}
        onBackPress={() => {
          props.navigation.goBack(KEY_NAVIGATION_BACK);
        }}
      />
    );
  },
};

const MarketMenuTopNavigationParams = {
  header: (props) => {
    const state = getCurrentRouteState(props.navigation);

    const onBackPress = () => {
      props.navigation.goBack(KEY_NAVIGATION_BACK);
    };

    const onSettingsPress = () => {
      props.navigation.navigate({
        key: state.routeName,
        routeName: 'Settings',
      });
    };

    return (
      <MarketHeader
        title='Market Overview'
        onBack={onBackPress}
        onSettings={onSettingsPress}
      />
    );
  },
};

const PortfolioMenuTopNavigationParams = {
  header: (props) => {
    const onBackPress = () => {
      props.navigation.goBack(KEY_NAVIGATION_BACK);
    };

    const onAddPress = () => {
      props.navigation.navigate('Commodity');
    };

    return (
      <PortfolioHeader
        title='My Portfolio'
        onBack={onBackPress}
        onAdd={onAddPress}
      />
    );
  },
};

const MenuBottomNavigationParams = {
  bottomNavigation: (props) => {
    return (
      <MenuContainer {...props} />
    );
  },
};

export const MenuNavigationOptions = {
  ...MenuTopNavigationParams,
  ...MenuBottomNavigationParams,
};

export const MarketNavigationOptions = MarketMenuTopNavigationParams;
export const PortfolioNavigationOptions = PortfolioMenuTopNavigationParams;
