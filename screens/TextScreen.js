import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SelectableText} from '@alentoma/react-native-selectable-text';

import {setHighlight} from '../store/actions/saveHighlight';
import {deleteSavedHighlight} from '../store/actions/saveHighlight';

const TextScreen = props => {
  const articleId = props.route.params.articleId;

  const selectedArticle = useSelector(state =>
    state.news.loadedArticles.find(article => article.id === articleId),
  );

  const storeHighlight = useSelector(state =>
    state.highlight.savedHighlights.filter(
      highlight => highlight.articleId === articleId,
    ),
  );
  let highlightId = Math.floor(Math.random() * 1000) + 1;

  const dispatch = useDispatch();

  const addToSaved = (highlightId, articleId, highlightText, start, end) => {
    dispatch(setHighlight(highlightId, articleId, highlightText, start, end));
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
        <View style={styles.content}>
          <SelectableText
            menuItems={['Highlight and Save']}
            onSelection={({
              eventType,
              content,
              selectionStart,
              selectionEnd,
            }) => {
              addToSaved(
                highlightId,
                articleId,
                content,
                selectionStart,
                selectionEnd,
              );
            }}
            highlights={storeHighlight}
            highlightColor="yellow"
            onHighlightPress={id => dispatch(deleteSavedHighlight(id))}
            style={styles.content}
            value={`${selectedArticle.description}\n\n${selectedArticle.content}`}
          />
        </View>
      </View>

      <View>
        {/*  <Button
          title="Array"
          color={'blue'}
          onPress={() => console.log(highlightList)}
        />
        <Button
          title="State"
          color={'green'}
          onPress={() => console.log(storeHighlight)}
        /> */}
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
    color: 'red',
  },
  content: {
    fontSize: 15,
    color: 'black',
  },
});

export default TextScreen;
