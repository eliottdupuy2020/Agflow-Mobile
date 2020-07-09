import React from 'react';
import {
  withStyles,
  TopNavigationAction,
  TopNavigation,
} from 'react-native-ui-kitten';
import {SafeAreaView} from '../../core/navigation';
import {
  ArrowIosBackFill,
  AddPortfolioIconFill,
  RemovePortfolioIconFill,
  CloseIconOutline,
} from '../../assets/icons';

import {connect} from 'react-redux';
import {enablePortfolioRemove, disablePortfolioRemove} from '../../reducers/PortfolioReducer';

class PortfolioHeaderComponent extends React.Component {
  state = {
    removeIconEnabled: true,
  };

  componentDidMount() {

  }

  onBackPress = () => {
    this.props.onBack();
  };

  onAddPress = () => {
    this.props.onAdd();
  };

  onRemovePress = () => {
    if(this.state.removeIconEnabled){
      this.props.enablePortfolioRemove();
    } else {
      this.props.disablePortfolioRemove();
    }

    this.setState(previousState => (
      {removeIconEnabled: !previousState.removeIconEnabled}
    ));
  };

  renderLeftControl = () => {
    return (
      <TopNavigationAction
        icon={ArrowIosBackFill}
        onPress={this.onBackPress}
      />
    );
  };

  renderAddIcon = (style) => {
    const { themedStyle } = this.props;

    return AddPortfolioIconFill({ ...style });
  };

  renderRemoveIcon = (style) => {
    const { themedStyle } = this.props;

    if (this.state.removeIconEnabled)
      return RemovePortfolioIconFill({ ...style });
    else
      return CloseIconOutline({ ...style });
  };

  renderRightControls = () => {
    return ([
      <TopNavigationAction
        icon={this.renderAddIcon}
        onPress={this.onAddPress}
      />,
      <TopNavigationAction
        icon={this.renderRemoveIcon}
        onPress={this.onRemovePress}
      />,
    ]);
  };

  render() {
    const { themedStyle, title } = this.props;

    return (
      <SafeAreaView style={themedStyle.container}>
        <TopNavigation
          alignment='center'
          title={title}
          // leftControl={this.renderLeftControl()}
          rightControls={this.renderRightControls()}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  const {isRemoveEnabled} = state.portfolio;

  return {isRemoveEnabled};
};

export const PortfolioHeader = withStyles(connect(mapStateToProps, {enablePortfolioRemove, disablePortfolioRemove})(PortfolioHeaderComponent), (theme) => ({
  container: {
    backgroundColor: theme['background-basic-color-1'],
  },
}));
