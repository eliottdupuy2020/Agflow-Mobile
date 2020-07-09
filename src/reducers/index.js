import {combineReducers} from 'redux';
import PortfolioReducer from './PortfolioReducer';

export default combineReducers({
  portfolio: PortfolioReducer,
});
