// store.js
import { configureStore } from '@reduxjs/toolkit';
import translationsReducer from './translationsSlice';

const store = configureStore({
  reducer: {
    translations: translationsReducer,
    // Add other reducers here if needed
  },
});

export default store;
