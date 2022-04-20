import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
  Switch,
} from 'react-native';
import {useDispatch} from 'react-redux';
import axios from 'axios';

import SearchBar from '../components/SearchBar';
import {fetchNews} from '../store/actions/news';
import BigList from 'react-native-big-list';

const SearchScreen = props => {
  const [searchPhrasePass, setSearchPhrase] = useState('');
  const [api1, setApi1] = useState(true);
  const [api2, setApi2] = useState(true);

  const fetchAPI = searchPhrasePass => {
    const options = {
      method: 'GET',
      url: 'https://free-news.p.rapidapi.com/v1/search',
      params: {q: searchPhrasePass, lang: 'en'},
      headers: {
        'X-RapidAPI-Host': 'free-news.p.rapidapi.com',
        'X-RapidAPI-Key': 'ea26f9eafbmsh116432203cf2f7ap100ba6jsn92d116678e77',
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(searchPhrasePass);
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const fetchApi_1 = async () => {
    const res = await axios.get(
      'https://newsapi.org//v2/top-headlines?country=ca&apiKey=f48f7a5665ab4ed484c1090882ecb228',
    );
    console.log(res.data);
  };

  const renderItem = ({item}) => (
    <View>
      <Text>{item.label}</Text>
    </View>
  );

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
            api1: api1,
            api2: api2,
          })
        }
      />
      <Button
        title="Saved Clips"
        onPress={() => props.navigation.navigate('SavedClip')}
      />
      {/* <Button title="Test API" onPress={() => fetchAPI(searchPhrasePass)} /> */}
      <View>
        <View style={styles.filterContainer}>
          <Text>Api 1</Text>
          <Switch value={api1} onValueChange={newValue => setApi1(newValue)} />
        </View>
        <View style={styles.filterContainer}>
          <Text>Api 2</Text>
          <Switch value={api2} onValueChange={newValue => setApi2(newValue)} />
          {/* {console.log(`API 1: ${api1}`)}
          {console.log(`API 2: ${api2}`)} */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  input: {
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default SearchScreen;
