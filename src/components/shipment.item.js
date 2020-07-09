import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  withStyles, Text, Icon
} from 'react-native-ui-kitten';
import {PriceChart} from '../components/price.chart';

class ShipmentItemComponent extends React.Component {
  onAddItemPress = (data) => {
    this.props.onAddItemPress(data);
  };

  render() {
    const {themedStyle, data} = this.props;
    const chartData = [];

    if (data.disclaimer_message) {
      return (
        <View style={themedStyle.disclaimer_message_container}>
          <Text style={themedStyle.disclaimer_message}>This mobile app is providing you a snapshot of our database. For exhaustive usage, please go to the web platform.</Text>
        </View>
      );
    }

    const priceList = [];
    for (let i = 0; i < 4; i++) {
      if (data.aggregates[i]) {
        const aggregate = data.aggregates[i];
        const deliveryDate = new Date(aggregate.delivery * 1000);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const deliveryMonth = months[deliveryDate.getMonth()];
        chartData[i] = aggregate.value;

        priceList.push(
          <View style={themedStyle.priceContainer} key={i}>
            <View style={themedStyle.priceDateContainer}>
              <Text style={themedStyle.priceDate}>{deliveryMonth} </Text>
              <Text style={themedStyle.priceDateRaise} status={aggregate.ratio >= 0 ? 'success' : 'danger'}>
                {aggregate.ratio >= 0 ? '+' : ''}{aggregate.ratio}%
              </Text>
            </View>
            <View style={themedStyle.price}>
              <Text>${aggregate.value}</Text>
            </View>
          </View>
        );
      } else {
        priceList.push(
          <View style={themedStyle.priceContainer} key={i}>
            <Text></Text>
          </View>
        );
      }
    }

    return (
      <View style={themedStyle.container}>
        <View style={themedStyle.commodityDetailContainer}>
          <View style={themedStyle.commodityNameContainer}>
            <TouchableOpacity
              disabled={data.inPortfolio ? true : false}
              style={data.inPortfolio ? themedStyle.addButtonDisabled : themedStyle.addButton}
              onPress={() => {this.onAddItemPress({id: data.id, index: this.props.index})}}
            >
              <Icon style={themedStyle.add_icon} name='plus' fill={data.inPortfolio ? 'grey' : '#fff'} />
            </TouchableOpacity>
            <Text
              style={themedStyle.commodityName}
              category='h6'>
              {data.destination} / {data.incoterm}
            </Text>
          </View>
          <View style={themedStyle.priceList}>
            {priceList}
          </View>
        </View>
        <View style={themedStyle.chartContainer}>
          <PriceChart chartData={chartData} />
        </View>
      </View>
    );
  }
}

export const ShipmentItem = withStyles(ShipmentItemComponent, (theme) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme['border-basic-color-2'],
    backgroundColor: theme['background-basic-color-1'],
  },
    chartContainer: {
      width: 70,
      justifyContent: 'flex-end',
    },
    commodityDetailContainer: {
      flex: 1,
      flexDirection: 'column',
    },
      commodityNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
        addButton: {
          width: 15,
          height: 15,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
          borderRadius: 15,
          borderColor: 'white',
        },
        addButtonDisabled: {
          width: 15,
          height: 15,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
          borderRadius: 15,
          borderColor: 'grey',
        },
          add_icon: {
            width: 12,
            height: 12,
            color: 'white',
          },
        commodityName: {
          marginLeft: 6,
          fontFamily: 'OpenSans-Regular',
        },
      priceList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
        priceContainer: {
          flex: 1,
        },
          priceDateContainer: {
            flex: 1,
            flexDirection: 'row',
          },
            priceDate: {
              fontSize: 10,
              fontFamily: 'OpenSans-Regular',
            },
            priceDateRaise: {
              fontSize: 10,
              fontFamily: 'OpenSans-Regular',
            },
  disclaimer_message_container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
    disclaimer_message: {
      fontSize: 10,
      fontFamily: 'OpenSans-Regular',
    }
}));

