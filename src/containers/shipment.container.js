import React from 'react';
import {StatusBar, View} from 'react-native';
import {Layout, List, Spinner, withStyles} from 'react-native-ui-kitten';
import {ShipmentItem} from '../components/shipment.item';
import {getAuth0Token, userLogout} from '../core/auth';
import {connect} from 'react-redux';
import {addPortfolio, addPortfolio_Done} from '../reducers/PortfolioReducer';

class ShipmentContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      markets: [],
      parent: [],
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

  onAddItemPress = (data) => {
    getAuth0Token()
      .then(Auth0Token => {
        fetch('https://next.agflow.com/api/v1/mobile/portfolio/' + data.id, {
          method: 'POST',
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
            // console.log(responseJson);
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
              let markets1 = previousState.markets;
              markets1[data.index].inPortfolio = true;
              return {...previousState, markets: markets1};
            });

            this.props.addPortfolio();
            this.props.addPortfolio_Done();
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch(error => {
        console.log(error);
        this.props.navigation.navigate('Auth');
      });
  };

  renderItemShipment = ({item, index}) => {
    const {themedStyle} = this.props;

    return (
      <ShipmentItem
        data={item}
        index={index}
        onAddItemPress={this.onAddItemPress}
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
          renderItem={this.renderItemShipment}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {addedPortfolio, removedPortfolio} = state.portfolio;

  return {addedPortfolio, removedPortfolio};
};

export const Shipment = withStyles(connect(mapStateToProps, {addPortfolio, addPortfolio_Done})(ShipmentContainer), (theme) => ({
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
