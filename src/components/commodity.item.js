import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  withStyles, Text, Avatar
} from 'react-native-ui-kitten';

class CommodityItemComponent extends React.Component {
  onCommodityItemPress = (commodityData) => {
    this.props.onItemPress(commodityData);
  };

  render() {
    const { themedStyle, data } = this.props;

    const priceList = [];
    for (let i = 0; i < 4; i++) {
      if (data.aggregates[i]) {
        const aggregate = data.aggregates[i];
        const deliveryDate = new Date(aggregate.delivery * 1000);
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const deliveryMonth = months[deliveryDate.getMonth()];

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
      <TouchableOpacity
        activeOpacity={0.95}
        style={themedStyle.container}
        onPress={() => {this.onCommodityItemPress({id: data.id, title: data.commodity})}}
      >
        <View style={themedStyle.commodityImageContainer}>
          <Avatar
            style={themedStyle.commodityImage}
            source={{uri: data.icon}}
            size='medium'
            shape='rounded'
          />
        </View>
        <View style={themedStyle.commodityDetailContainer}>
          <View style={themedStyle.commodityNameContainer}>
            <Text
              style={themedStyle.commodityName}
              category='h6'>
              {data.commodity}
            </Text>
            <Text style={themedStyle.commodityInfo}>{data.destination} / {data.incoterm}</Text>
          </View>
          <View style={themedStyle.priceList}>
            {priceList}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export const CommodityItem = withStyles(CommodityItemComponent, (theme) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: theme['background-basic-color-1'],
    borderBottomWidth: 1,
    borderBottomColor: theme['border-basic-color-2'],
  },
    commodityImageContainer: {
      width: 50,
    },
      commodityImage: {
        marginTop: 5,
        borderWidth: 2,
        borderColor: 'green',
      },
    commodityDetailContainer: {
      flex: 6,
      flexDirection: 'column',
    },
      commodityNameContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
      },
        commodityName: {
          fontFamily: 'OpenSans-Regular',
        },
        commodityInfo: {
          fontSize: 10,
          marginLeft: 10,
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
            }
}));

