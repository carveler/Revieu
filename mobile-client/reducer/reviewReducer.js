import { ACTION } from '../actions/types';

const emptyError = () => ({ message: '' });
const initialState = { reviews: [], error: { message: '' } };

export const reviewReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION.GET_REVIEWS:
      return { ...state, reviews: payload, error: emptyError() };
    case ACTION.ADD_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, payload],
        error: emptyError(),
      };
    case ACTION.SET_ERROR:
      return { ...state, error: payload };
    case ACTION.CLEAR_ERROR:
      return { ...state, error: emptyError() };

    default:
      return state;
  }
};
