import { ACTION } from '../actions/types';

const initialState = {
  products: [],
  error: { message: '' },
  selectedProduct: {},
  fileredProducts: [],
};
const emptyError = () => ({ message: '' });

export const productsReducer = (state = initialState, action) => {
  // console.log('[REDUCER] ACTION recevied:', action.type, action.payload);

  switch (action.type) {
    case ACTION.GET_PRODUCTS:
      return { ...state, products: action.payload, error: emptyError() };
    case ACTION.GET_PRODUCT:
      return { ...state, products: action.payload };
    case ACTION.UPDATE_PRODUCT:
      return {
        ...state,
        products: [
          state.products.map((item) => {
            if (item._id === action.payload._id) {
              return { ...item, ...action.payload };
            }
            return item;
          }),
        ],
        error: emptyError(),
      };

    case ACTION.ADD_PRODUCT:
      const foundProduct = state.products.find(
        (item) =>
          item.barcode === action.payload.barcode ||
          item._id === action.payload._id
      );
      if (foundProduct) {
        return {
          ...state,
          products: [...state.products],
          error: emptyError(),
        };
      } else {
        return {
          ...state,
          products: [...state.products, action.payload],
          error: emptyError(),
        };
      }
    case ACTION.ADD_SCANNED_PRODUCT:
      const existProduct = state.products.find(
        (item) =>
          item.barcode === action.payload.barcode ||
          item._id === action.payload._id
      );
      if (existProduct) {
        return {
          ...state,
          products: [...state.products],
          error: emptyError(),
        };
      } else {
        return {
          ...state,
          products: [...state.products, action.payload],
          error: emptyError(),
        };
      }

    case ACTION.SELECT_PRODUCT:
      return { ...state, selectedProduct: action.payload, error: emptyError() };

    case ACTION.CLEAR_SELECT_PRODUCT:
      return { ...state, selectedProduct: {}, error: emptyError() };

    case ACTION.FILTER_PRODUCTS:
      const filteredData = state.products.filter((item) => {
        const searchWord = [
          item.brand,
          ...item.tags,
          item.productName,
          item.productName_jp,
          ...item.category,
          ...item.country,
          ...item.store,
          item.barcode,
        ];
        const filterUndefined = searchWord.filter((item) => !undefined && item);
        const result = filterUndefined.filter((item) => {
          return item.toLowerCase().includes(action.payload);
        });
        return result.length >= 1;
      });
      return {
        ...state,
        fileredProducts: [...filteredData],
        error: emptyError(),
      };
    case ACTION.CLEAR_FILTER_PRODUCTS:
      return {
        ...state,
        fileredProducts: [],
        error: emptyError(),
      };

    case ACTION.SET_ERROR_PRODUCT:
      return { ...state, error: action.payload };
    case ACTION.CLEAR_ERROR_PRODUCT:
      return { ...state, error: emptyError() };
    default:
      return state;
  }
};
