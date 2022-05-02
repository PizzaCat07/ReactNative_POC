import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';

import SearchScreen from '../screens/SearchScreen';
import SelectScreen from '../screens/SelectScreen';
import TextScreen from '../screens/TextScreen';
import HighlightScreen from '../screens/HighlightedArticle';
import SavedClipScreen from '../screens/SavedClipScreen';

import {AppNavigator, SavedClipNavigator} from './Navigator';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={AppNavigator} />
      <Tab.Screen name="Saved Highlights" component={SavedClipNavigator} />
    </Tab.Navigator>
  );
};
