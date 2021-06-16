import { ACTION } from '../actions/types';
import { storeData, getData, removeData } from '../helpers/asyncStorage';
import { storeToken, getToken, removeToken } from '../helpers/tokenStorage';

const initialState = {
  user: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  error: { message: '' },
  isLoadingUser: true,
  isSignout: false,
  message: '',
};
const emptyError = () => ({ message: '' });

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.LOGIN:
      const { data, headers } = action.payload;
      storeData('user', data.user);
      storeToken('accessToken', headers.accesstoken);
      storeToken('refreshToken', headers.refreshtoken);
      return {
        ...state,
        user: data.user,
        accessToken: headers.accesstoken,
        refreshToken: headers.refreshtoken,
        error: emptyError(),
        isSignout: false,
        message: '',
      };
    case ACTION.SIGNUP:
      return {
        ...state,
        error: emptyError(),
        isSignout: false,
        message: 'Sign Up Successful. Please Login',
      };
    case ACTION.LOGOUT:
      removeData('user');
      return {
        ...state,
        user: undefined,
        error: action.payload ? action.payload : emptyError(),
        isSignout: true,
      };
    case ACTION.RESTORE_USER:
      return {
        ...state,
        user: action.payload.user,
        error: emptyError(),
        isLoadingUser: false,
      };

    case ACTION.SET_ERROR_USER:
      return { ...state, error: action.payload };
    case ACTION.CLEAR_ERROR_USER:
      return { ...state, error: emptyError() };

    default:
      return state;
  }
};
