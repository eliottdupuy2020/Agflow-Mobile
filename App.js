import React from 'react';
import {ApplicationProvider, IconRegistry} from 'react-native-ui-kitten';
import {mapping, dark as theme} from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {DynamicStatusBar} from './src/components/common/dynamicStatusBar.component';
import {Router} from './src/core/navigation/routes';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import SplashScreen from 'react-native-splash-screen';

export default class App extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <React.Fragment>
          <IconRegistry icons={EvaIconsPack} />
          <ApplicationProvider mapping={mapping} theme={theme}>
            <DynamicStatusBar />
            <Router />
          </ApplicationProvider>
        </React.Fragment>
      </Provider>
    );
  }
};
