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

import {fetchNews} from '../store/actions/news';
import SummaryCard from '../components/SummaryCard';

import SearchBar from '../components/SearchBar';

const SelectScreen = props => {
  const {loadedArticles} = useSelector(state => state.news);

  const dispatch = useDispatch();
  const searchPhrasePass = props.route.params.searchPhrasePass;

  const [searchPhrase, setSearchPhrase] = useState(searchPhrasePass);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    dispatch(fetchNews());
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View>
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

        <SummaryCard
          searchPhrase={searchPhrase}
          data={loadedArticles}
          setClicked={setClicked}
        />

        {/* <FlatList
          data={loadedArticles}
          keyExtractor={(item) => item.id}
          renderItem={(itemData) => (
            <SummaryCard
              title={itemData.item.title}
              source={itemData.item.source}
              description={itemData.item.description}
              date={itemData.item.publishTime}
              onSelect={() => {
                selectContentHandler(itemData.item.id);
              }}
            />
          )}
        /> */}
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
