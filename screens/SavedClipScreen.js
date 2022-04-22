import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import HighlightCard from '../components/HighlightCard';
import {useSelector} from 'react-redux';
import SQLite from 'react-native-sqlite-storage';

const SavedClipScreen = props => {
  const [highlight, setHighlight] = useState([]);
  const [delHighlightState, setDelHighlightState] = useState(false);

  const db = SQLite.openDatabase('articles_2.db');

  const getHighlight = () => {
    setHighlight([]);
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM highlight', [], (tx, results) => {
        const temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setHighlight(temp);
      });
    });
  };

  const delHighlight = () => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM highlight WHERE pk=?', [props.id]);
    });
  };

  const delHighlightHandler = pk => {
    delHighlight(pk);
    setDelHighlightState(true);
  };

  useEffect(() => {
    getHighlight();
  }, []);

  const savedHighlights = highlight;

  /*  const {savedHighlights} = useSelector(state => state.highlight); */

  const returnArticleHandler = articleId => {
    props.navigation.navigate('Highlight', {
      articleId: articleId,
    });
  };

  /*  const returnArticleHandler = (id, articleId, start, end) => {
    props.navigation.navigate('Highlight', {
      id: id,
      articleId: articleId,
      start: start,
      end: end,
    });
  }; */

  return (
    <View>
      <View>
        <View>
          <FlatList
            data={savedHighlights}
            keyExtractor={item => item.pk}
            renderItem={itemData => (
              <HighlightCard
                text={itemData.item.text}
                id={itemData.item.pk}
                onSelect={() => returnArticleHandler(itemData.item.id)}
                onDel={() => delHighlightHandler(itemData.item.pk)}
              />
            )}
          />
        </View>
        {/*  <Button title="run" onPress={() => getHighlight()} />
        <Button title="test" onPress={() => console.log(savedHighlights)} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SavedClipScreen;
