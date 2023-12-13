import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import authReducer from './auth';
import entriesReducer from './entriesSlice';
import categoriesReducer from './categoriesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    entries: entriesReducer,
    categories: categoriesReducer,
  },
});

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export default store;
