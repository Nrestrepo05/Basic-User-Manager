import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import api from './middleware/api';
import usersReducer from './users';

export default function ConfigureStore() {
  const store = configureStore({
    reducer: usersReducer,
    middleware: [
      ...getDefaultMiddleware(),
      api,
    ],
  });
  return store;
}
