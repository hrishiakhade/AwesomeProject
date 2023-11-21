
import React from 'react';
import { View, Text } from 'react-native';
import {useSelector } from 'react-redux';


const ThirdScreen = ({ navigation }) => {
    const translations = useSelector((state) => state?.translations?.translations);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 22 }}>{translations.third}</Text>
        </View>
    );
}

export default ThirdScreen;