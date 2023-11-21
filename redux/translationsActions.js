// translationsActions.js
import { setTranslations } from './translationsSlice';
import englishTrans from '../locales/en.json';
import spanishTrans from '../locales/es.json';
import hindiTrans from '../locales/hi.json';


export const initializeTranslations = (language) => (dispatch) => {
    let fetchedTranslations;

    if (language === 'es') {
        fetchedTranslations = spanishTrans;
    } else if (language === 'hi') {
        fetchedTranslations = hindiTrans;
    } else {
        fetchedTranslations = englishTrans;
    }

    dispatch(setTranslations(fetchedTranslations));
};
