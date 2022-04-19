import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  FlatList,
  TextInput,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {fetchNews, fetchNews2, fetchNews_all} from '../store/actions/news';
import SummaryCard from '../components/SummaryCard';

import SearchBar from '../components/SearchBar';

const SelectScreen = props => {
  const {loadedArticles} = useSelector(state => state.news);

  const dispatch = useDispatch();
  const searchPhrasePass = props.route.params.searchPhrasePass;
  const switch_api1 = props.route.params.api1;
  const switch_api2 = props.route.params.api2;

  const [searchPhrase, setSearchPhrase] = useState(searchPhrasePass);
  const [clicked, setClicked] = useState(false);

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
    dispatch(fetchData());
  }, []);

  return (
    <View>
      <View>
        {/*  <Button title="Api 1" onPress={() => dispatch(fetchNews())} />
        <Button
          title="Api 2"
          onPress={() => dispatch(fetchNews2(searchPhrase))}
        />
        <Button
          title="refresh"
          onPress={() => dispatch(fetchNews_all(searchPhrase))}
        />
        <Button
          title="Saved Clips"
          onPress={() => props.navigation.navigate('SavedClip')}
        />
        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
        /> */}
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
