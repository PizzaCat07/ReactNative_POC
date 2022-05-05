import React, {useEffect, useState} from 'react';

import {View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';

import {fetchNews, fetchNews2, fetchNews_all} from '../store/actions/news';
import SummaryCard from '../components/SummaryCard';

const SelectScreen = props => {
  //load articles from state
  const {loadedArticles} = useSelector(state => state.news);

  //declared for useEffect, sets it that it re-renders when screen is loaded
  const isFocused = useIsFocused();

  const dispatch = useDispatch();

  //get params from search screen via navigation
  const searchPhrasePass = props.route.params.searchPhrasePass;
  const switch_api1 = props.route.params.api1;
  const switch_api2 = props.route.params.api2;

  //needed to make highlighting of serach phrase
  const [searchPhrase, setSearchPhrase] = useState(searchPhrasePass);
  const [clicked, setClicked] = useState(false);

  //function to determine which API to call, and to pass the search phrase for filtering/searching

  const fetchData = () => {
    if (switch_api1 === true && switch_api2 === false) {
      return fetchNews(searchPhrase);
    }
    if (switch_api1 === false && switch_api2 === true) {
      return fetchNews2(searchPhrase);
    }
    if (switch_api1 === true && switch_api2 === true) {
      return fetchNews_all(searchPhrase);
    }
  };

  useEffect(() => {
    if (isFocused) {
      dispatch(fetchData());
    }
  }, [isFocused]);

  return (
    <View>
      <View>
        <View>
          <SummaryCard
            searchPhrase={searchPhrase}
            data={loadedArticles}
            setClicked={setClicked}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SelectScreen;
