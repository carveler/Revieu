import { ACTION } from '../actions/types';

const initialState = '';

export const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.SEARCH:
      return action.payload;
    case ACTION.SEARCH_CLEAR:
      return '';
    default:
      return state;
  }
};
