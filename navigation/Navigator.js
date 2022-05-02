import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Icon from 'react-native-vector-icons/Ionicons';

import SearchScreen from '../screens/SearchScreen';
import SelectScreen from '../screens/SelectScreen';
import TextScreen from '../screens/TextScreen';
import HighlightScreen from '../screens/HighlightedArticle';
import SavedClipScreen from '../screens/SavedClipScreen';

const Navigator = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <Navigator.Navigator screenOptions={{headerShown: false}}>
      <Navigator.Screen name="Search" component={SearchScreen} />
      <Navigator.Screen name="Select" component={SelectScreen} />
      <Navigator.Screen name="Text" component={TextScreen} />
    </Navigator.Navigator>
  );
};

export const SavedClipNavigator = () => {
  return (
    <Navigator.Navigator screenOptions={{headerShown: false}}>
      <Navigator.Screen name="SavedClip" component={SavedClipScreen} />
      <Navigator.Screen name="Highlight" component={HighlightScreen} />
    </Navigator.Navigator>
  );
};
