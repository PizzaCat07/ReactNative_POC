import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';

import {AppNavigator, TabNavigator} from './navigation/Navigator';
import newsReducer from './store/reducers/news';
import highlightReducer from './store/reducers/saveHighlight';
import {init_article, init_highlight} from './database/db';

init_article()
  .then(() => {
    console.log('Init DB Article Table SUCCESS');
  })
  .catch(err => {
    console.log('Init DB Article Table FAIL');
    console.log(err);
  });

init_highlight()
  .then(() => {
    console.log('Init DB Article Highlight SUCCESS');
  })
  .catch(err => {
    console.log('Init DB Article Highlight FAIL');
    console.log(err);
  });

const rootReducer = combineReducers({
  news: newsReducer,
  highlight: highlightReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <AppNavigator /> */}
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
}
