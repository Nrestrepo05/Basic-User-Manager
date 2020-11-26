import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './api';
import config from '../../config';

const { usersURL } = config;

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    usersAdded: (users, action) => {
      users.list.push(action.payload);
    },
    usersModified: (user, action) => {
      if (action.payload.name) user.list.name = action.payload.name;
      if (action.payload.lastName) user.list.lastName = action.payload.lastName;
    },
    usersRequested: (users) => {
      users.loading = true;
    },
    usersRequestFailed: (users) => {
      users.loading = false;
    },
    usersReceived: (users, action) => {
      users.list = action.payload;
      users.loading = false;
    },
    userRequestById: (users) => {
      users.loading = true;
    },
    userRequestByIdFailed: (users) => {
      users.loading = false;
    },
    userReceivedById: (users, action) => {
      users.list = action.payload;
      users.loading = false;
    },
  },
});

export default usersSlice.reducer;

const {
  usersAdded,
  usersModified,
  usersRequested,
  usersRequestFailed,
  usersReceived,
  userRequestById,
  userReceivedById,
  userRequestByIdFailed,
} = usersSlice.actions;

// Action Creators

export const addUser = (user) => apiCallBegan({
  url: usersURL,
  method: 'post',
  data: user,
  onSuccess: usersAdded.type,
});

export const modifyUser = (userId, user) => apiCallBegan({
  url: `${usersURL}/${userId}`,
  method: 'patch',
  data: user,
  onSuccess: usersModified.type,
});

export const loadUsers = () => apiCallBegan({
  url: usersURL,
  onStart: usersRequested.type,
  onSuccess: usersReceived.type,
  onError: usersRequestFailed.type,
});

export const loadUserById = (userId) => apiCallBegan({
  url: `${usersURL}/${userId}`,
  onStart: userRequestById.type,
  onSuccess: userReceivedById.type,
  onError: userRequestByIdFailed.type,
});
