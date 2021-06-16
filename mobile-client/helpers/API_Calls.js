import axios from './axios-global-instance';

const extractApiError = (errAxios) => {
  return errAxios.response
    ? errAxios.response.data
    : { error: { message: 'fetch call failed' } };
};

// async => wrap normal returns with a promise!
export const loginUser = async (userCredentials) => {
  try {
    const response = await axios.post(`/users/login`, userCredentials);
    return response;
  } catch (err) {
    let error = extractApiError(err);
    return error;
  }
};

export const googleLoginUser = async (userCredentials) => {
  try {
    const response = await axios.post(`/users/googleLogin`, userCredentials);
    return response.data;
  } catch (err) {
    let error = extractApiError(err);
    return error;
  }
};

export const logOutUser = async () => {
  try {
    const response = await axios.get('/users/logout');
    return response.data;
  } catch (err) {
    let error = extractApiError(err);
    return error;
  }
};

export const signUpUser = async (data) => {
  try {
    const response = await axios.post('/users', data);
    return response.data;
  } catch (err) {
    let error = extractApiError(err);
    return error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await axios.get('/products');
    return response.data;
  } catch (err) {
    let error = extractApiError(err);
    return error;
  }
};
export const getProduct = async (_id) => {
  try {
    const response = await axios.get(`/products/${_id}`);
    return response.data;
  } catch (err) {
    let error = extractApiError(err);
    return error;
  }
};

export const addNewProduct = async (product) => {
  try {
    const response = await axios.post(`/products`, product);
    return response.data;
  } catch (err) {
    let error = extractApiError(err);
    return error;
  }
};

export const updateProduct = async (data, _id) => {
  try {
    const response = await axios.patch(`/products/${_id}`, data);
    return response.data;
  } catch (err) {
    let error = extractApiError(err);
    return error;
  }
};

export const fetchProductReviews = async (id) => {
  try {
    const response = await axios.get(`/products/${id}/reviews`);
    return response.data;
  } catch (err) {
    let error = extractApiError(err);
    return error;
  }
};

export const addReview = async (reviewData) => {
  try {
    const response = await axios.post(`/reviews`, reviewData);
    return response.data;
  } catch (err) {
    let error = extractApiError(err);
    return error;
  }
};

export const updateReview = async (data, id) => {
  const res = await axios.post(`/reviews/${id}`, data);
  return res.data;
};

export const deleteReview = async (id) => {
  const res = await axios.delete(`/reviews/${id}`);
  return res.data;
};

export const checkFavorits = async (product) => {
  const { text, _id, status } = product;
  const data = await axios.patch(`/products/${_id}`, {
    text: text,
    status: !status,
  });

  return data;
};

export const verifyUser = async (token) => {
  try {
    const response = await axios.post(`/users/verify`, { token: token });
    return response.data;
  } catch (err) {
    let error = extractApiError(err);
    return error;
  }
};

export const fetchOpenFoodFacts = async (query) => {
  try {
    const response = await axios.post(
      `https://world.openfoodfacts.org/api/v0/product/${query}.json`
    );
    return response.data;
  } catch (err) {
    let error = extractApiError(err);
    return error;
  }
};
