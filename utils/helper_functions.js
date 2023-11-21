import EncryptedStorage from 'react-native-encrypted-storage';


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