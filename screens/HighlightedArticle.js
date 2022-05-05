import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {SelectableText} from '@alentoma/react-native-selectable-text';
import {db} from '../database/db';

const HighlightScreen = props => {
  //get articleID from props sent from highlight card component
  const articleId = props.route.params.articleId;

  const [article, setArticle] = useState([]);
  const [highlight, setHighlight] = useState([]);

  //function to get article from local db
  const getArticle = () => {
    //reset article state to empty array
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

  //function to get highlights from local db
  const getHighlight = () => {
    //reset highlight state to empty array
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
