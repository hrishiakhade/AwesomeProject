import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getLanuageCode, setLanguageCode } from '../utils/helper_functions';
import { initializeTranslations } from '../redux/translationsActions';

const LANGUAGES = [
    {
        code: 'en', label: 'English'
    },
    {
        code: 'es', label: 'Spanish'
    },
    {
        code: 'hi', label: 'Hindi'
    }
];



const Selector = ({ popBack }) => {

    const [selectedLanguageCode, setSelectedLanguageCode] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        getLanuageCode('language').then(value => {
            setSelectedLanguageCode(value);
        });
    }, []);


    const setLanguage = code => {
        setLanguageCode(code);
        dispatch(initializeTranslations(code));
        popBack();
    };

    const translations = useSelector((state) => state?.translations?.translations);

    return (
        <View style={styles.container}><View style={styles.row}><Text style={styles.title}>{translations.change_language}</Text></View>
            {LANGUAGES.map(language => {
                const selectedLanguage = language.code === selectedLanguageCode;

                return (
                    <Pressable
                        key={language.code}
                        style={styles.buttonContainer}
                        disabled={selectedLanguage}
                        onPress={() => setLanguage(language.code)}
                    ><Text
                        style={[selectedLanguage ? styles.selectedText : styles.text]}
                    >
                            {language.label}
                        </Text></Pressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingHorizontal: 16
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    title: {
        color: '#444',
        fontSize: 28,
        fontWeight: '600'
    },
    buttonContainer: {
        marginTop: 10
    },
    text: {
        fontSize: 18,
        color: '#000',
        paddingVertical: 4
    },
    selectedText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'tomato',
        paddingVertical: 4
    }
});

export default Selector;