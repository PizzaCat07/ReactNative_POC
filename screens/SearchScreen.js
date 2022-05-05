import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Button,
  TextInput,
  Switch,
} from 'react-native';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {useIsFocused} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  delArticle,
  delHighlight,
  db,
  insertArticle,
  insertHighlight,
} from '../database/db';

const SearchScreen = props => {
  // Set states to re render on changes

  const [searchPhrasePass, setSearchPhrase] = useState('');
  const [api1, setApi1] = useState(true);
  const [api2, setApi2] = useState(true);
  let [syncArticle, setSyncArticle] = useState([]);
  let [syncHighlight, setSyncHighlight] = useState([]);

  //declared for useEffect, sets it that it re-renders when screen is loaded
  const isFocused = useIsFocused();

  // debug function to delete all data from SQL lite DB
  const delAll = () => {
    delArticle();
    delHighlight();
    console.log('reset');
    getAllArticle();
    getAllHighlight();
  };

  //on render run the functions, re run on focus
  useEffect(() => {
    if (isFocused) {
      getAllArticle();
      getAllHighlight();
    }
  }, [isFocused]);

  //function to upload DB info to 'cloud' via api
  const postAPI = (item, highlight) => {
    const userId = 1;
    const res = axios.put(
      `https://app-test-ed25d-default-rtdb.firebaseio.com/article/${userId}/article.json`,
      {item, highlight},
    );
    console.log('post article');
  };

  //function to download all articles from local db and push it a empty array, and set the state to array
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

  //function to download all highlights from local db and push it a empty array, and set the state to array
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

  //download all data from cloud and insert it into local database
  const downloadAPI = () => {
    const userId = 1;
    axios
      .get(
        `https://app-test-ed25d-default-rtdb.firebaseio.com/article/${userId}/article.json`,
      )
      .then(function (response) {
        const article = response.data.item;
        const highlight = response.data.highlight;

        //imported function to insert article into local db
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

        //imported function to insert highlight into local db
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

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchPhrasePass}
        onChangeText={setSearchPhrase}
      />
      {/* Search button that passes the search criteria and API flags to the select Articles screen */}
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
      {/* <Button
        title="Saved Clips"
        onPress={() => props.navigation.navigate('SavedClip')}
      /> */}
      <View style={styles.cloud}>
        <TouchableHighlight
          onPress={() => postAPI(syncArticle, syncHighlight)}
          underlayColor="yellow">
          <Icon name="md-cloud-upload-sharp" size={40} color="blue" />
        </TouchableHighlight>
        <TouchableHighlight
          onPress={() => downloadAPI()}
          underlayColor="yellow">
          <Icon name="md-cloud-download-sharp" size={40} color="blue" />
        </TouchableHighlight>
      </View>
      <View>
        <View style={styles.filterContainer}>
          <Text>Api 1</Text>
          <Switch value={api1} onValueChange={newValue => setApi1(newValue)} />
        </View>
        <View style={styles.filterContainer}>
          <Text>Api 2</Text>
          <Switch value={api2} onValueChange={newValue => setApi2(newValue)} />
        </View>
      </View>
      <View style={styles.debug}>
        {/* <Button
          title="Test Article "
          onPress={() => console.log(syncArticle.length)}
        />
        <Button
          title="Test Highlight "
          onPress={() => console.log(syncHighlight.length)}
        /> */}
        <Button title="Delete DB" color={'red'} onPress={() => delAll()} />
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
  cloud: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '40%',
  },
  debug: {
    flexDirection: 'row',
    paddingVertical: 220,
  },
});

export default SearchScreen;
