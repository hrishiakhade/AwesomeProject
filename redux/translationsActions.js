// translationsActions.js
import { setTranslations } from './translationsSlice';
import englishTrans from '../locales/en.json';
import spanishTrans from '../locales/es.json';
import hindiTrans from '../locales/hi.json';
import { getFormattedData } from '../utils/helper_functions';


export const initializeTranslations = (language) => (dispatch) => {
    let fetchedTranslations;

    if (language === 'es') {
        fetchedTranslations = getFormattedData(spanishTrans);
    } else if (language === 'hi') {
        fetchedTranslations = getFormattedData(hindiTrans);
    } else {
        fetchedTranslations = getFormattedData(englishTrans);
    }
    dispatch(setTranslations(fetchedTranslations));
};
