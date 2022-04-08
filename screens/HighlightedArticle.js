import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Button,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import Highlighter from 'react-native-highlight-words';
import HighlightItem from '../models/highlightItem';

import {setHighlight} from '../store/actions/saveHighlight';

const HighlightScreen = props => {
  const articleId = props.route.params.articleId;
  const textHighlight = props.route.params.text;

  const selectedArticle = useSelector(state =>
    state.news.loadedArticles.find(article => article.id === articleId),
  );
  //const highlightedArticles = useSelector((state) => highlight.savedHighlights);

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
        <Text style={styles.content} selectable={true} selectionColor="yellow">
          <Highlighter
            highlightStyle={{backgroundColor: 'yellow'}}
            searchWords={textHighlight}
            textToHighlight={selectedArticle.description}
          />
        </Text>
        <Text style={styles.content} selectable={true} selectionColor="yellow">
          <Highlighter
            highlightStyle={{backgroundColor: 'yellow'}}
            searchWords={textHighlight}
            textToHighlight={selectedArticle.content}
          />
        </Text>
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
    paddingTop: 10,
    fontSize: 12,
  },
});

export default HighlightScreen;
