import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SelectableText} from '@alentoma/react-native-selectable-text';
import SQLite from 'react-native-sqlite-storage';

import {setHighlight} from '../store/actions/saveHighlight';

const HighlightScreen = props => {
  const articleId = props.route.params.articleId;

  const db = SQLite.openDatabase('articles_2.db');
  const [article, setArticle] = useState([]);
  const [highlight, setHighlight] = useState([]);

  const getArticle = () => {
    setArticle([]);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM article WHERE ID=?',
        [articleId],
        (tx, results) => {
          setArticle(results.rows.item(0));
        },
      );
    });
  };

  const getHighlight = () => {
    setHighlight([]);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM highlight WHERE id = ?',
        [articleId],
        (tx, results) => {
          const temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setHighlight(temp);
        },
      );
    });
  };

  useEffect(() => {
    getArticle();
    getHighlight();
  }, []);

  const selectedArticle = article;
  const storeHighlight = highlight;

  /* const selectedArticle = useSelector(state =>
    state.news.loadedArticles.find(article => article.id === articleId),
  ); */
  //const highlightedArticles = useSelector((state) => highlight.savedHighlights);

  /* const storeHighlight = useSelector(state =>
    state.highlight.savedHighlights.filter(
      highlight => highlight.articleId === articleId,
    ),
  ); */

  return (
    <ScrollView>
      <View>
        <Text style={styles.title}>{selectedArticle.title}</Text>
      </View>
      <View>
        <Text>{selectedArticle.source}</Text>
      </View>
      <View>
        <Text>{selectedArticle.date}</Text>
      </View>
      <View>
        <View>
          <Text>{selectedArticle.title}</Text>
        </View>
        <View style={styles.content}>
          <SelectableText
            highlights={storeHighlight}
            highlightColor={'yellow'}
            value={`${selectedArticle.description}\n\n${selectedArticle.content}`}
          />
        </View>
        {/* <Button title="run" onPress={() => getArticle()} />
        <Button title="Test" onPress={() => console.log(article)} /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 15,
    color: 'black',
  },
});

export default HighlightScreen;
