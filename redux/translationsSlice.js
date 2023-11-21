// translationsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  translations: {},
};

const translationsSlice = createSlice({
  name: 'translations',
  initialState,
  reducers: {
    setTranslations: (state, action) => {
      state.translations = action.payload;
    },
  },
});

export const { setTranslations } = translationsSlice.actions;

export default translationsSlice.reducer;
