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
import {useIsFocused} from '@react-navigation/native';

import SearchBar from '../components/SearchBar';
import {fetchNews} from '../store/actions/news';
import {
  delArticle,
  delHighlight,
  db,
  insertArticle,
  insertHighlight,
} from '../database/db';

const SearchScreen = props => {
  const [searchPhrasePass, setSearchPhrase] = useState('');
  const [api1, setApi1] = useState(true);
  const [api2, setApi2] = useState(true);

  let [syncArticle, setSyncArticle] = useState([]);
  let [syncHighlight, setSyncHighlight] = useState([]);
  const isFocused = useIsFocused();

  const delAll = () => {
    delArticle();
    delHighlight();
    console.log('reset');
  };

  useEffect(() => {
    if (isFocused) {
      getAllArticle();
      getAllHighlight();
    }
  }, [isFocused]);

  //const date = new Date();

  const postAPI = (item, highlight) => {
    const userId = 1;
    const res = axios.put(
      `https://app-test-ed25d-default-rtdb.firebaseio.com/article/${userId}/article.json`,
      {item, highlight},
    );
    console.log('post article');
  };

  const getAllArticle = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * from article', [], (tx, results) => {
        const temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        console.log('get articles');
        setSyncArticle(temp);
      });
    });
  };

  const getAllHighlight = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * from highlight', [], (tx, results) => {
        const temp = [];
        for (let i = 0; i < results.rows.length; ++i)
          temp.push(results.rows.item(i));
        console.log('get highlights');
        setSyncHighlight(temp);
      });
    });
  };

  const downloadAPI = () => {
    const userId = 1;
    axios
      .get(
        `https://app-test-ed25d-default-rtdb.firebaseio.com/article/${userId}/article.json`,
      )
      .then(function (response) {
        const article = response.data.item;
        const highlight = response.data.highlight;

        for (let x in article) {
          insertArticle(
            article[x].id,
            article[x].source,
            article[x].title,
            article[x].description,
            article[x].date,
            article[x].content,
          );
          //console.log(article[x]);
          console.log('insert Article complete');
        }

        for (let x in highlight) {
          insertHighlight(
            highlight[x].id,
            highlight[x].text,
            highlight[x].start,
            highlight[x].end,
            highlight[x].state_id,
          );
          //console.log(highlight[x]);
          console.log('insert Highlight complete');
        }
        getAllArticle();
        getAllHighlight();
        console.log('download complete');
      });
  };

  /*  const fetchAPI = searchPhrasePass => {
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
 */

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
        color={'green'}
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

      <Button
        title="Upload"
        color={'teal'}
        onPress={() => postAPI(syncArticle, syncHighlight)}
      />
      <Button title="Download" color={'teal'} onPress={() => downloadAPI()} />

      <View>
        <View style={styles.filterContainer}>
          <Text>Api 1</Text>
          <Switch value={api1} onValueChange={newValue => setApi1(newValue)} />
        </View>
        <View style={styles.filterContainer}>
          <Text>Api 2</Text>
          <Switch value={api2} onValueChange={newValue => setApi2(newValue)} />
        </View>
        <View>
          <Button
            title="Test Article "
            onPress={() => console.log(syncArticle.length)}
          />
          <Button
            title="Test Highlight "
            onPress={() => console.log(syncHighlight.length)}
          />
          <Button title="Reset" color={'red'} onPress={() => delAll()} />
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
