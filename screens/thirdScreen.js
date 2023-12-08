
import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { formatTranslation } from '../utils/helper_functions';


const ThirdScreen = ({ navigation }) => {
    const translations = useSelector((state) => state?.translations?.translations);
    const  transactionDetailsParams = { amount: 2500, accountNumber : 'XXXXXXXX2367' };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' ,padding:10}}>
            <Text style={{ fontSize: 22 }}>{translations.third}</Text>

            <Text style={{ fontSize: 22 , marginTop:20 }}>{formatTranslation(translations.curr_balance, transactionDetailsParams)}</Text>
        </View>
    );
}

export default ThirdScreen;