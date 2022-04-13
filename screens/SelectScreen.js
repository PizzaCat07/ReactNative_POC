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

  const [searchPhrase, setSearchPhrase] = useState(searchPhrasePass);
  const [clicked, setClicked] = useState(false);

  const refresh = () => {
    dispatch(fetchNews());
    dispatch(fetchNews2());
  };

  useEffect(() => {
    dispatch(fetchNews_all());
  }, []);

  return (
    <View>
      <View>
        <View>
          <Button title="Api 1" onPress={() => dispatch(fetchNews())} />
          <Button title="Api 2" onPress={() => dispatch(fetchNews2())} />
          <Button title="refresh" onPress={() => dispatch(fetchNews_all)} />
          <Button
            title="Saved Clips"
            onPress={() => props.navigation.navigate('SavedClip')}
          />
          <SearchBar
            searchPhrase={searchPhrase}
            setSearchPhrase={setSearchPhrase}
            clicked={clicked}
            setClicked={setClicked}
          />
        </View>
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
