import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Selector from './screens/selector';
import ThirdScreen from './screens/thirdScreen';
import SecondScreen from './screens/secondScreen';
import { initializeTranslations } from './redux/translationsActions';
import { checkIfCacheExists, checkIfPersistedStateExists, checkIfUpdateNeeded, clearCache, getLanuageCode, getTranslationCache } from './utils/helper_functions';
import { fetchTranslationsUpdateStatus } from './api';

const Stack = createNativeStackNavigator();



const App = () => {

  const dispatch = useDispatch();
  const translations = useSelector((state) => state?.translations?.translations);
  const metaData = useSelector((state) => state?.translations?.metaData);


  const callTranslationAPI = (langCode) => {

    if (langCode) {
      dispatch(initializeTranslations(langCode));
    } else {
      getLanuageCode('language').then(value => {
        dispatch(initializeTranslations(value));
      });
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cacheExists = await checkIfCacheExists();

        if (cacheExists) {
          console.log("Cache exists, checking if it needs an update by sending lastUpdatedTime...");
          const updateNeeded = false;
          // const updateNeeded = await checkIfUpdateNeeded(metaData.digitalAppLanguageId, metaData.digitalAppLastUpdated);

          if (updateNeeded) {
            // Perform actions if an update is needed
            await callTranslationAPI(metaData.digitalAppLanguageId);
          } else {
            // Perform actions if no update is needed
          }
        } else {
          console.log("Cache does not exist, calling API");
          await callTranslationAPI();
        }
      } catch (error) {
        // Handle errors
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [dispatch]);




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
            options={{ title: translations?.change_language }}
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
          title={translations?.change_language}
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

        <View style={{ height: 20 }} />

        <Button
          title={translations?.show_cache}
          onPress={() => {
            getTranslationCache().then(value => {
              Alert.alert("Cache Data", value)
            });
          }}
        />

        <View style={{ height: 20 }} />

        <Button
          title={translations?.logout}
          onPress={() => {
            clearCache();
            console.log("Cache is cleared ");
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