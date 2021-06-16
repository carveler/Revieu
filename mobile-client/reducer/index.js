import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { searchReducer } from './searchReducer';
import { productsReducer } from './productsReducer';
import { reviewReducer } from './reviewReducer';

const reducers = combineReducers({
  userReducer,
  searchReducer,
  productsReducer,
  reviewReducer,
});

export default reducers;
