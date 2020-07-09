const PORTFOLIO_REMOVE_ENABLED = 'portfolio_remove_enabled';
const PORTFOLIO_REMOVE_DISABLED = 'portfolio_remove_disabled';
const PORTFOLIO_ADDED = 'portfolio_added';
const PORTFOLIO_REMOVED = 'portfolio_removed';
const PORTFOLIO_ADDED_DONE = 'portfolio_added_done';
const PORTFOLIO_REMOVED_DONE = 'portfolio_removed_done';

const INITIAL_STATE = {
  isRemoveEnabled: false,
  addedPortfolio: false,
  removedPortfolio: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PORTFOLIO_REMOVE_ENABLED:
      return {
        ...state,
        isRemoveEnabled: true
      };
    case PORTFOLIO_REMOVE_DISABLED:
      return {
        ...state,
        isRemoveEnabled: false
      };
    case PORTFOLIO_ADDED:
      return {
        ...state,
        addedPortfolio: true
      };
    case PORTFOLIO_REMOVED:
      return {
        ...state,
        removedPortfolio: true
      };
    case PORTFOLIO_ADDED_DONE:
      return {
        ...state,
        addedPortfolio: false
      };
    case PORTFOLIO_REMOVED_DONE:
      return {
        ...state,
        removedPortfolio: false
      };
    default:
      return state;
  }
}

export const enablePortfolioRemove = () => {
  return {
    type: PORTFOLIO_REMOVE_ENABLED,
    payload: {},
  }
};

export const disablePortfolioRemove = () => {
  return {
    type: PORTFOLIO_REMOVE_DISABLED,
    payload: {},
  }
};

export const addPortfolio = () => {
  return {
    type: PORTFOLIO_ADDED,
    payload: {},
  }
};

export const removePortfolio = () => {
  return {
    type: PORTFOLIO_REMOVED,
    payload: {},
  }
};

export const addPortfolio_Done = () => {
  return {
    type: PORTFOLIO_ADDED_DONE,
    payload: {},
  }
};

export const removePortfolio_Done = () => {
  return {
    type: PORTFOLIO_REMOVED_DONE,
    payload: {},
  }
};
