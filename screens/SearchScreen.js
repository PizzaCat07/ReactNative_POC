import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
} from 'react-native';
import {useDispatch} from 'react-redux';

import SearchBar from '../components/SearchBar';
import {fetchNews} from '../store/actions/news';

const SearchScreen = props => {
  const [searchPhrasePass, setSearchPhrase] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchPhrasePass}
        onChangeText={setSearchPhrase}
      />
      {/* <Button title="Search" color={"green"} /> */}
      <Button
        color={'red'}
        title="Search"
        onPress={() =>
          props.navigation.navigate('Select', {
            searchPhrasePass: searchPhrasePass,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
  },
});

export default SearchScreen;
