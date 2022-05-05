import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchScreen from '../screens/SearchScreen';
import SelectScreen from '../screens/SelectScreen';
import TextScreen from '../screens/TextScreen';
import HighlightScreen from '../screens/HighlightedArticle';
import SavedClipScreen from '../screens/SavedClipScreen';
import {TouchableOpacity, Text} from 'react-native';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Select" component={SelectScreen} />
      <Stack.Screen name="Text" component={TextScreen} />
      <Stack.Screen name="SavedClip" component={SavedClipScreen} />
      <Stack.Screen name="Highlight" component={HighlightScreen} />
    </Stack.Navigator>
  );
};

/* export const ResultsNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Select" component={SelectScreen} />
      <Stack.Screen name="Text" component={TextScreen} />
    </Stack.Navigator>
  );
};

export const SavedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SavedClip" component={SavedClipScreen} />
      <Stack.Screen name="Highlight" component={HighlightScreen} />
    </Stack.Navigator>
  );
}; */

export const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        name="Home"
        component={AppNavigator}
        options={({navigation}) => ({
          tabBarIcon: ({}) => (
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Icon name="search" color={'blue'} size={24} />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Saved"
        component={AppNavigator}
        options={({navigation}) => ({
          tabBarIcon: ({}) => (
            <TouchableOpacity onPress={() => navigation.navigate('SavedClip')}>
              <Icon name="book" color={'blue'} size={24} />
            </TouchableOpacity>
          ),
        })}
      />
    </Tab.Navigator>
  );
};
