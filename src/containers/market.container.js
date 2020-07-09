import React from 'react';
import {StatusBar, View} from 'react-native';
import {Layout, List, Spinner, withStyles} from 'react-native-ui-kitten';
import {MarketPortfolioItem} from '../components/market/market.portfolioItem';
import {MarketCommodityItem} from '../components/market/market.commodityItem';
import {getAuth0Token, userLogout} from '../core/auth';
import {connect} from 'react-redux';

class MarketContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      commodityData: [],
      portfolios: []
    };
  };

  getPortfolios() {
    getAuth0Token()
      .then(Auth0Token => {
        fetch('https://next.agflow.com/api/v1/mobile/portfolio/latest', {
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
              let portfolios = responseJson.portfolio;
              portfolios[portfolios.length] = {'isAddValue': true};

              return {portfolios: portfolios};
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

  componentDidMount() {
    getAuth0Token()
      .then(Auth0Token => {
        fetch('https://next.agflow.com/api/v1/mobile/markets', {
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
            // console.log('responseJson', responseJson);
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
              // console.log('markets', responseJson.markets);
              return {...previousState, isLoading: false, commodityData: responseJson.markets};
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

    this.getPortfolios();
  }

  componentWillUnmount() {

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.addedPortfolio === true || this.props.removedPortfolio === true) {
      this.getPortfolios();
    }
  }

  onAddPortfolioPress = () => {
    this.props.navigation.navigate('Commodity');
  };

  onMarketCommodityItemPress = (commodityData) => {
    this.props.navigation.navigate('Country', {id: commodityData.id, title: commodityData.title});
  };

  renderItemPortfolio = ({item, index}) => {
    const {themedStyle} = this.props;

    return (
      <MarketPortfolioItem
        portfolioData={item}
        onAddPortfolioPress={this.onAddPortfolioPress}
      />
    )
  };

  renderItemMarketCommodity = ({item, index}) => {
    const {themedStyle} = this.props;

    return (
      <MarketCommodityItem
        commodityData={item}
        onItemPress={this.onMarketCommodityItemPress}
      />
    );
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
        <View style={themedStyle.portfolioListContainer}>
          <List
            horizontal={true}
            data={this.state.portfolios}
            style={themedStyle.portfolioList}
            // showsHorizontalScrollIndicator={false}
            renderItem={this.renderItemPortfolio}
          />
        </View>
        <View style={themedStyle.marketListContainer}>
          <List
            data={this.state.commodityData}
            style={themedStyle.marketList}
            // showsVerticalScrollIndicator={false}
            renderItem={this.renderItemMarketCommodity}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {addedPortfolio, removedPortfolio} = state.portfolio;

  return {addedPortfolio, removedPortfolio};
};

export const Market = withStyles(connect(mapStateToProps, {})(MarketContainer), (theme) => ({
  spinnerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme['background-basic-color-2'],
  },
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: theme['background-basic-color-2'],
  },
  portfolioListContainer: {
    height: 120
  },
    portfolioList: {
      backgroundColor: theme['background-basic-color-2'],
    },
  marketListContainer: {
    flex: 1,
    overflow: 'hidden',
    marginTop: 8,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: theme['background-basic-color-1'],
  },
    marketList: {
      backgroundColor: theme['background-basic-color-1'],
    }
}));
