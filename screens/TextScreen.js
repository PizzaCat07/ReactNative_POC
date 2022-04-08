import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Clipboard from '@react-native-clipboard/clipboard';
import Highlighter from 'react-native-highlight-words';
import HighlightItem from '../models/highlightItem';
import {SelectableText} from '@alentoma/react-native-selectable-text';

import {setHighlight} from '../store/actions/saveHighlight';

const TextScreen = props => {
  const articleId = props.route.params.articleId;

  const selectedArticle = useSelector(state =>
    state.news.loadedArticles.find(article => article.id === articleId),
  );

  let [save, setSave] = useState('');
  let [startHighlight, setStartHighlight] = useState(0);
  let [endHighlight, setEndHighlight] = useState(0);
  let [startHighlightContent, setStartHighlightContent] = useState(0);
  let [endHighlightContent, setEndHighlightContent] = useState(0);

  const dispatch = useDispatch();

  const highlightClip = async () => {
    const savedClip = await Clipboard.getString();
    setSave(savedClip);
  };

  let highlightText = [save];
  let highlightId = Math.floor(Math.random() * 1000) + 1;

  const addToSaved = (highlightId, articleId, highlightText) => {
    dispatch(setHighlight(highlightId, articleId, highlightText));
  };

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
          <SelectableText
            menuItems={['Highlight']}
            onSelection={({
              eventType,
              content,
              selectionStart,
              selectionEnd,
            }) => {
              setStartHighlight(selectionStart);
              setEndHighlight(selectionEnd);
              setSave(content);
              addToSaved(highlightId, articleId, [save]);
            }}
            highlights={[{start: [startHighlight], end: [endHighlight]}]}
            highlightColor="yellow"
            value={selectedArticle.description}
          />
        </View>
        <View style={styles.content}>
          <SelectableText
            menuItems={['Highlight']}
            onSelection={({
              eventType,
              content,
              selectionStart,
              selectionEnd,
            }) => {
              setStartHighlightContent(selectionStart);
              setEndHighlightContent(selectionEnd);
              console.log(content);
              setSave(content);
              addToSaved(highlightId, articleId, [save]);
            }}
            highlights={[
              {start: [startHighlightContent], end: [endHighlightContent]},
            ]}
            highlightColor="yellow"
            value={selectedArticle.content}
          />
        </View>
      </View>

      <View>
        <Button
          title="Highlight"
          color={'blue'}
          onPress={() => highlightClip()}
        />
        <Button
          title="Save"
          color={'green'}
          onPress={() => addToSaved(highlightId, articleId, highlightText)}
        />
        <Button
          title="Saved Clips"
          onPress={() => props.navigation.navigate('SavedClip')}
        />
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

export default TextScreen;
