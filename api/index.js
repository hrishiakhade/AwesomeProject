import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.0.103:3000/api',          // backend original API
});

export const fetchTranslations = async (language) => {
  try {
    const response = await api.get(`/translations/${language}`);
    return response.data;
  } catch (error) {
    console.log('error from API', error);
    throw error;
  }
};


export const fetchTranslationsUpdateStatus = async (language) => {
    try {
      const response = await api.get(`/translations/${language}/digitalAppLastUpdated`);
      return response.data;
    } catch (error) {
      console.log('error from API', error);
      throw error;
    }
  };