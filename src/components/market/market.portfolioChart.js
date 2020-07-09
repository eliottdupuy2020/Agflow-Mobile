import React from 'react';
import {View} from 'react-native';
import {
  withStyles
} from 'react-native-ui-kitten';
import {LineChart} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

class MarketPortfolioChartComponent extends React.Component {

  render() {
    const { themedStyle, chartData } = this.props;

    return (
      <View style={themedStyle.container}>
        <LineChart
          style={themedStyle.chart}
          data={chartData}
          curve={shape.curveNatural}
          svg={{ stroke: 'rgb(134, 65, 244)' }}
          contentInset={{ top: 5, bottom: 3 }}
        />
      </View>
    );
  }
}

export const MarketPortfolioChart = withStyles(MarketPortfolioChartComponent, (theme) => ({
  container: {
    marginTop: 5,
    width: 75,
    height: 55,
    backgroundColor: theme['background-basic-color-1'],
  },
  chart: {
    flex: 1,
    height: 55,
  },
}));

