// store.js
import translationsReducer from '../redux/translationsSlice';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';


// Configuration for redux-persist
const persistConfig = {
    key: 'udb-translations', // Key for the storage
    storage: AsyncStorage, // AsyncStorage for React Native
    whitelist: ['translations','metaData'], // List of reducers to persist
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, translationsReducer);

// Create the Redux store
const store = configureStore({
    reducer: {
        translations: persistedReducer,
    },
    middleware: [...getDefaultMiddleware({ serializableCheck: false })],

});

// Create a persistor for the store
const persistor = persistStore(store);

// Export the store and persistor
export { store, persistor };