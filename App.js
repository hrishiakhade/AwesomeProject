import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Selector from './screens/selector';
import ThirdScreen from './screens/thirdScreen';
import SecondScreen from './screens/secondScreen';
import { initializeTranslations } from './redux/translationsActions';
import { getLanuageCode } from './utils/helper_functions';

const Stack = createNativeStackNavigator();

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    getLanuageCode('language').then(value => {
      dispatch(initializeTranslations(value));
    });
  }, [dispatch]);

  const translations = useSelector((state) => state?.translations?.translations);

  if (Object.keys(translations).length)
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: translations?.welcome_title }}
          />
          <Stack.Screen
            name="languageSelection"
            component={LanguageScreen}
            options={{ title: translations?.lang_btn }}
          />
          <Stack.Screen
            name="second"
            component={SecondScreen}
            options={{ title: translations?.second_screen }}
          />
          <Stack.Screen
            name="third"
            component={ThirdScreen}
            options={{ title: translations?.third_screen }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
};


const HomeScreen = ({ navigation }) => {
  const translations = useSelector((state) => state?.translations.translations);

  if (Object.keys(translations).length)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ marginBottom: 30, fontSize: 16 }}>{translations?.welcome}</Text>
        <View style={{ height: 20 }} />
        <Button
          title={translations?.lang_btn}
          onPress={() => {
            navigation.navigate('languageSelection')
          }}
        />
        <View style={{ height: 20 }} />
        <Button
          title={translations?.second_screen}
          onPress={() => {
            navigation.navigate('second')
          }}
        />
        <View style={{ height: 20 }} />
        <Button
          title={translations?.third_screen}
          onPress={() => {
            navigation.navigate('third')
          }}
        />
      </View>
    );
};


const LanguageScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}><Selector popBack={navigation.pop} /></View>
  );
}

export default App;