import axios from 'axios';
import config from '../../../config';
import { apiCallBegan, apiCallFailed, apiCallSuccess } from '../api';

const api = (store) => (next) => async (action) => {
  if (action.type !== apiCallBegan.type) return next(action);

  const { baseURL } = config;
  const {
    url, method, data, onStart, onSuccess, onError,
  } = action.payload;

  if (onStart) store.dispatch({ type: onStart });
  next(action);

  try {
    const response = await axios.request({
      baseURL,
      url,
      method,
      data,
    });
    if (onSuccess) store.dispatch({ type: onSuccess, payload: response.data });
    return store.dispatch(apiCallSuccess(response.data));
  } catch (error) {
    if (onError) store.dispatch({ type: onError, payload: error.message });
    return store.dispatch(apiCallFailed(error.message));
  }
};

export default api;
