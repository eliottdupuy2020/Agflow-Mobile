import React from 'react';
import {StatusBar, View} from 'react-native';
import {getAuth0Token, userLogout} from '../core/auth';
import {Layout, List, Spinner, withStyles} from 'react-native-ui-kitten';
import {CountryItem} from '../components/country.item';

class CountryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      markets: [],
      commodityData: [],
    };
  }

  componentDidMount() {
    const id = this.props.navigation.state.params.id;

    getAuth0Token()
      .then(Auth0Token => {
        fetch('https://next.agflow.com/api/v1/mobile/markets/' + id, {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + Auth0Token.accessToken
          }
        })
          .then((response) => {
            if (response.status) {
              return {error: response.status};
            } else {
              return response.json();
            }
          })
          .then((responseJson) => {
            if (responseJson.error === 401) {
              userLogout()
                .then(() => {
                  this.props.navigation.navigate('Auth');
                });
              return;
            } else if (responseJson.error) {
              return;
            }

            this.setState((previousState, props) => {
              let markets = responseJson.markets;
              markets[markets.length] = {'disclaimer_message': true};

              return {...previousState, isLoading: false, markets: markets, parent: responseJson.parent};
            });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch(error => {
        console.log(error);
        this.props.navigation.navigate('Auth');
      });
  }

  componentWillUnmount() {

  }

  onCountryItemPress = (data) => {
    this.props.navigation.navigate('Shipment', {id: data.id, title: data.title});
  };

  renderItemCountry = ({item, index}) => {
    const {themedStyle} = this.props;

    return (
      <CountryItem
        data={item}
        onItemPress={this.onCountryItemPress}
      />
    )
  };

  render() {
    const {themedStyle} = this.props;

    if (this.state.isLoading) {
      return (
        <Layout style={themedStyle.spinnerContainer}>
          <Spinner />
          <StatusBar barStyle="default" />
        </Layout>
      );
    }

    return (
      <View style={themedStyle.container}>
        <List
          data={this.state.markets}
          // showsVerticalScrollIndicator={false}
          renderItem={this.renderItemCountry}
        />
      </View>
    );
  }
}

export const Country = withStyles(CountryContainer, (theme) => ({
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme['background-basic-color-2'],
  },
  container: {
    flex: 1,
    width: '100%',
    paddingVertical: 2,
    backgroundColor: theme['background-basic-color-2'],
  },
}));
