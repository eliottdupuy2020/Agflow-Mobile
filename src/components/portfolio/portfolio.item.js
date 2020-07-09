import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {
  withStyles, Text, Avatar, Icon
} from 'react-native-ui-kitten';

class PortfolioItemComponent extends React.Component {
  onRemoveItemPress = (data) => {
    this.props.onRemoveItemPress(data);
  };

  render() {
    const {themedStyle, portfolioData, isRemoveEnabled} = this.props;

    if (portfolioData.disclaimer_message) {
      return (
        <View style={themedStyle.disclaimer_message_container}>
          <Text style={themedStyle.disclaimer_message}>This mobile app is providing you a snapshot of our database. For exhaustive usage, please go to the web platform.</Text>
        </View>
      );
    }

    const priceList = [];
    for (let i = 0; i < 4; i++) {
      if (portfolioData.aggregates[i]) {
        const aggregate = portfolioData.aggregates[i];
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
      <View style={themedStyle.container}>
        <View style={themedStyle.commodityImageContainer}>
          <Avatar
            style={themedStyle.commodityImage}
            source={{uri: portfolioData.icon}}
            size='medium'
            shape='rounded'
          />
          {isRemoveEnabled &&
            <TouchableOpacity
              style={themedStyle.removeButton}
              onPress={() => {this.onRemoveItemPress({id: portfolioData.id, index: this.props.index})}}
            >
              <Icon style={themedStyle.remove_icon} name='minus' fill='#fff'/>
            </TouchableOpacity>
          }
        </View>
        <View style={themedStyle.commodityDetailContainer}>
          <View style={themedStyle.commodityNameContainer}>
            <Text
              style={themedStyle.commodityName}
              category='h6'>
              {portfolioData.commodity}
            </Text>
            <Text style={themedStyle.commodityInfo}>{portfolioData.destination} / {portfolioData.incoterm}</Text>
          </View>
          <View style={themedStyle.priceList}>
            {priceList}
          </View>
        </View>
      </View>
    );
  }
}

export const PortfolioItem = withStyles(PortfolioItemComponent, (theme) => ({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: theme['border-basic-color-2'],
    backgroundColor: theme['background-basic-color-1'],
  },
    commodityImageContainer: {
      width: 50,
    },
      commodityImage: {
        marginTop: 5,
        borderWidth: 2,
        borderColor: 'green',
      },
      removeButton: {
        position: 'absolute',
        top: -5,
        left: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'white',
      },
        remove_icon: {
          width: 15,
          height: 15,
          color: 'white',
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

