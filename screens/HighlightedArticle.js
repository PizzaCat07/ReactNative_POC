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
import {SelectableText} from '@alentoma/react-native-selectable-text';

import {setHighlight} from '../store/actions/saveHighlight';

const HighlightScreen = props => {
  const articleId = props.route.params.articleId;
  const highlightId = props.route.params.id;
  const highlightStart = props.route.params.start;
  const highlightEnd = props.route.params.end;

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
        <View>
          <Text>{selectedArticle.title}</Text>
        </View>
        <View style={styles.content}>
          <SelectableText
            highlights={[
              {id: highlightId, start: highlightStart, end: highlightEnd},
            ]}
            highlightColor={'yellow'}
            value={selectedArticle.content}
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
    paddingTop: 10,
    fontSize: 12,
  },
});

export default HighlightScreen;
