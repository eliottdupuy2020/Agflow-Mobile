import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  withStyles, Text, Icon
} from 'react-native-ui-kitten';
import {MarketPortfolioChart} from './market.portfolioChart';

class MarketPortfolioItemComponent extends React.Component {
  onAddPortfolioPress = () => {
    this.props.onAddPortfolioPress();
  };

  render() {
    const {themedStyle, portfolioData} = this.props;
    const chartData = [];
    let current_ratio = [];
    current_ratio.push(
      <Text key='0'></Text>
    );
    const priceList = [];

    if (portfolioData.isAddValue) {
      return (
        <View style={themedStyle.container1}>
          <View style={themedStyle.portfolioContainer}>
            <View style={themedStyle.row_addValue1}>
              <Text
                style={themedStyle.commodityName}
                category='h6'>
                Add value
              </Text>
            </View>
            <View style={themedStyle.row_addValue2}>
              <TouchableOpacity
                style={themedStyle.addValueButton}
                onPress={this.onAddPortfolioPress}
              >
                <Icon style={themedStyle.plus_icon} name='plus' fill='#fff' />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    } else {
      for (let i = 0; i < 3; i++) {
        if (portfolioData.aggregates[i]) {
          const aggregate = portfolioData.aggregates[i];
          chartData[i] = aggregate.value;
          if (i === 0) {
            current_ratio = (
              <Text style={themedStyle.priceRaise} status={aggregate.ratio >= 0 ? 'success' : 'danger'}>
                {aggregate.ratio >= 0 ? '+' : ''}{aggregate.ratio}%
              </Text>
            );
          }

          priceList.push(
            <Text key={i} style={themedStyle.price} status={aggregate.ratio >= 0 ? 'success' : 'danger'}>${aggregate.value}</Text>
          );
        } else {
          priceList.push(
            <Text key={i} style={themedStyle.price} status={aggregate.ratio >= 0 ? 'success' : 'danger'}>-</Text>
          );
        }
      }

      return (
        <View style={themedStyle.container}>
          <View style={themedStyle.portfolioContainer}>
            <View style={themedStyle.row_commodity}>
              <View style={themedStyle.commodityNameContainer}>
                <Text
                  style={themedStyle.commodityName}
                  category='h6'>
                  {portfolioData.commodity}
                </Text>
                <Text style={themedStyle.priceRaise}>{current_ratio}</Text>
              </View>
              <View style={themedStyle.commodityInfoContainer}>
                <Text style={themedStyle.commodityInfo}>{portfolioData.destination} / {portfolioData.incoterm}</Text>
              </View>
            </View>
            <View style={themedStyle.row_price}>
              <View style={themedStyle.priceContainer}>
                {priceList}
              </View>
              <View style={themedStyle.chartContainer}>
                <MarketPortfolioChart chartData={chartData} />
              </View>
            </View>
          </View>
        </View>
      );
    }
  }
}

export const MarketPortfolioItem = withStyles(MarketPortfolioItemComponent, (theme) => ({
  container: {
    width: 160,
    overflow: 'hidden',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: theme['background-basic-color-1'],
  },
  portfolioContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: theme['background-basic-color-1'],
  },
    row_commodity: {
      flexDirection: 'column',
    },
      commodityNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
        commodityName: {
          fontFamily: 'OpenSans-Regular',
        },
        priceRaise: {
          fontSize: 12,
          fontFamily: 'OpenSans-Regular',
        },
      commodityInfoContainer: {
      },
        commodityInfo: {
          fontSize: 12,
          fontFamily: 'OpenSans-Regular',
        },
    row_price: {
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
      priceContainer: {
        width: 60,
        justifyContent: 'space-between',
      },
        price: {
          fontSize: 15,
          fontFamily: 'OpenSans-SemiBold',
        },
      chartContainer: {
        flex: 1,
        width: 100,
      },

  // Add value
  container1: {
    width: 160,
    overflow: 'hidden',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: theme['background-basic-color-1'],
  },
    row_addValue1: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    row_addValue2: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
      addValueButton: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderRadius: 60,
        borderColor: 'white',
      },
        plus_icon: {
          width: 50,
          height: 50,
          color: 'white',
        },
}));

