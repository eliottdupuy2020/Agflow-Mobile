import React from 'react';
import {StatusBar, View} from 'react-native';
import {getAuth0Token, userLogout} from '../core/auth';
import {Layout, List, Spinner, withStyles} from 'react-native-ui-kitten';
import {PortfolioItem} from '../components/portfolio/portfolio.item';
import {connect} from 'react-redux';
import {removePortfolio, removePortfolio_Done} from '../reducers/PortfolioReducer';

class PortfolioContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      portfolios: []
    };
  };

  getPortfolios() {
    getAuth0Token()
      .then(Auth0Token => {
        fetch('https://next.agflow.com/api/v1/mobile/portfolio', {
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
            // console.log('portfolio', responseJson);
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
              portfolios[portfolios.length] = {'disclaimer_message': true};

              return {...previousState, isLoading: false, portfolios: portfolios};
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
  };

  componentDidMount() {
    this.getPortfolios();
  }

  componentWillUnmount() {

  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.addedPortfolio === true) {
      this.getPortfolios();
    }
  }

  onRemoveItemPress = (data) => {
    getAuth0Token()
      .then(Auth0Token => {
        fetch('https://next.agflow.com/api/v1/mobile/portfolio/' + data.id, {
          method: 'DELETE',
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
              let portfolios1 = previousState.portfolios.filter(item => item.id != data.id);
              return {...previousState, portfolios: portfolios1};
            });

            this.props.removePortfolio();
            this.props.removePortfolio_Done();
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

  renderItemPortfolio = ({item, index}) => {
    const {themedStyle} = this.props;

    return (
      <PortfolioItem
        portfolioData={item}
        index={index}
        isRemoveEnabled={this.props.isRemoveEnabled}
        onRemoveItemPress={this.onRemoveItemPress}
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
          data={this.state.portfolios}
          style={themedStyle.portfolioList}
          // showsVerticalScrollIndicator={false}
          renderItem={this.renderItemPortfolio}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const {isRemoveEnabled, addedPortfolio} = state.portfolio;

  return {isRemoveEnabled, addedPortfolio};
};

export const Portfolio = withStyles(connect(mapStateToProps, {removePortfolio, removePortfolio_Done})(PortfolioContainer), (theme) => ({
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
