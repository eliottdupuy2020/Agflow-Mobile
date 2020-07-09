import React from 'react';
import {StatusBar, View} from 'react-native';
import {getAuth0Token, userLogout} from '../core/auth';
import {Layout, List, Spinner, withStyles} from 'react-native-ui-kitten';
import {CommodityItem} from '../components/commodity.item';

class CommodityContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      commodityData: []
    };
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
  }

  componentWillUnmount() {

  }

  onCommodityItemPress = (commodityData) => {
    this.props.navigation.navigate('Country', {id: commodityData.id, title: commodityData.title});
  };

  renderItemCommodity = ({item, index}) => {
    const {themedStyle} = this.props;

    return (
      <CommodityItem
        data={item}
        onItemPress={this.onCommodityItemPress}
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
          data={this.state.commodityData}
          // showsVerticalScrollIndicator={false}
          renderItem={this.renderItemCommodity}
        />
      </View>
    );
  }
}

export const Commodity = withStyles(CommodityContainer, (theme) => ({
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
