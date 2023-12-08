// translationsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  translations: {}, // Initially an empty object or the default translations
  metaData: {}      //  digitalAppLanguageId , digitalAppLanguageName,digitalAppLastUpdated
};

const translationsSlice = createSlice({
  name: 'translations',
  initialState,
  reducers: {
    setTranslations: (state, action) => {
      state.translations = action.payload.translationsData;
      state.metaData = action.payload.metaData;
    },
  },
});

export const { setTranslations } = translationsSlice.actions;

export default translationsSlice.reducer;
