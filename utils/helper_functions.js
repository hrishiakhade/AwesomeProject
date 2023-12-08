import EncryptedStorage from 'react-native-encrypted-storage';
import { persistor } from '../redux-persist/store'; // Adjust the path accordingly
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchTranslationsUpdateStatus } from '../api';


export const getLanuageCode = async (key) => {
    try {
        const value = await EncryptedStorage.getItem(key);
        if (value)
            return value;
        else {
            setLanguageCode('en');
            return 'en';
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const setLanguageCode = (code) => {
    EncryptedStorage.setItem('language', code);
}



export const getFormattedData = (jsonData) => {
    const translations = jsonData[0].digital_app_elements.reduce((result, element) => {
        result[element.element_name] = element.element_value;
        return result;
    }, {});

    const convertedData = {
        metaData: {
            digitalAppLanguageId: jsonData[0].digitalAppLanguageId,
            digitalAppLanguageName: jsonData[0].digitalAppLanguageName,
            digitalAppLastUpdated: jsonData[0].digitalAppLastUpdated,
        },
        translationsData: translations
    }
    return convertedData;
}

// for handling parameterized translations . This is how i18n handles parameters
export const formatTranslation = (translation, params) => {
    return Object.keys(params).reduce((formattedTranslation, paramKey) => {
        const placeholder = `{{${paramKey}}}`;
        const paramValue = params[paramKey];
        return formattedTranslation.replace(placeholder, paramValue);
    }, translation);
};

// Manually clear the cache for logout button
export const clearCache = () => {
    persistor.purge(); // Optional: Clear existing data from Async and Redux
}


export const getTranslationCache = async () => {
    const storageKey = 'persist:udb-translations';
    try {
        const value = await AsyncStorage.getItem(storageKey);
        if (value) {
            const parsedData = JSON.parse(value);
            return parsedData['translations'];
        } else {
            return null
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const checkIfCacheExists = async () => {
    try {
        const persistedStateJSON = await AsyncStorage.getItem('persist:udb-translations');
        const persistedState = persistedStateJSON ? JSON.parse(JSON.parse(persistedStateJSON)?.translations) : null;

        if (persistedState && Object.keys(persistedState)?.length) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
};

export const checkIfUpdateNeeded = (digitalAppLanguageId, cacheDigitalAppLastUpdated) => {
    return new Promise((resolve, reject) => {
        fetchTranslationsUpdateStatus(digitalAppLanguageId)
            .then(res => {
                const lastUpdatedTime = res.digitalAppLastUpdated;

                // Compare lastUpdatedTime with cacheDigitalAppLastUpdated
                if (lastUpdatedTime > cacheDigitalAppLastUpdated) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(err => {
                // If there's an error, assume an update is needed
                resolve(true);
            });
    });
};

