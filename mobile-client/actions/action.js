import { ACTION } from './types';

export const search = (searchKeyword) => {
  return { type: ACTION.SEARCH, payload: searchKeyword };
};
export const searchClear = () => {
  return { type: ACTION.SEARCH_CLEAR };
};

export const login = ({ data, headers }) => {
  return { type: ACTION.LOGIN, payload: { data, headers } };
};

export const signup = (user) => {
  return { type: ACTION.SIGNUP, payload: user };
};
export const logout = (errorObj) => {
  return { type: ACTION.LOGOUT, errorObj };
};

export const restoreUserInfo = (userinfo) => {
  return { type: ACTION.RESTORE_USER, payload: userinfo };
};

export const getProducts = (products) => {
  return { type: ACTION.GET_PRODUCTS, payload: products };
};
export const getProduct = (product) => {
  return { type: ACTION.GET_PRODUCT, payload: product };
};
export const addProduct = (product) => {
  return { type: ACTION.ADD_PRODUCT, payload: product };
};
export const updateProduct = (product) => {
  return { type: ACTION.UPDATE_PRODUCT, payload: product };
};
export const filterProducts = (keyword) => {
  return { type: ACTION.FILTER_PRODUCTS, payload: keyword };
};
export const selectProduct = (keyword) => {
  return { type: ACTION.SELECT_PRODUCT, payload: keyword };
};
export const clearSelectProduct = () => {
  return { type: ACTION.CLEAR_SELECT_PRODUCT };
};
export const getReviews = (reviews) => {
  return { type: ACTION.GET_REVIEWS, payload: reviews };
};
export const addNewReview = (review) => {
  return { type: ACTION.ADD_REVIEW, payload: review };
};

export const addScannedProduct = (product) => {
  return { type: ACTION.ADD_SCANNED_PRODUCT, payload: product };
};

export const setProductError = (payload) => {
  return { type: ACTION.SET_ERROR_PRODUCT, payload };
};
export const clearProductError = () => {
  return { type: ACTION.CLEAR_ERROR_PRODUCT };
};

export const setReviewError = (payload) => {
  return { type: ACTION.SET_ERROR_REVIEW, payload };
};
export const clearReviewError = () => {
  return { type: ACTION.CLEAR_ERROR_REVIEW };
};
export const setUserError = (payload) => {
  return { type: ACTION.SET_ERROR_USER, payload };
};
export const clearUserError = () => {
  return { type: ACTION.CLEAR_ERROR_USER };
};
