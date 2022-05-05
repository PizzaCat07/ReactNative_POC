import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {SelectableText} from '@alentoma/react-native-selectable-text';

import {setHighlight} from '../store/actions/saveHighlight';
import {deleteSavedHighlight} from '../store/actions/saveHighlight';
import {insertArticle, insertHighlight} from '../database/db';

const TextScreen = props => {
  //get article unique ID from summary card component
  const articleId = props.route.params.articleId;

  //get articles from state which equal the article unique ID
  const selectedArticle = useSelector(state =>
    state.news.loadedArticles.find(article => article.id === articleId),
  );

  const articleContent = selectedArticle.content;
  const articleDescription = selectedArticle.description;
  const articleDate = selectedArticle.publishTime;
  const articleSource = selectedArticle.source;
  const articleTitle = selectedArticle.title;

  //get highlights from state based on article unique ID
  const storeHighlight = useSelector(state =>
    state.highlight.savedHighlights.filter(
      highlight => highlight.articleId === articleId,
    ),
  );

  //create random unique ID for highlight
  let highlightId = Math.floor(Math.random() * 1000) + 1;

  const dispatch = useDispatch();

  //function to combine several functions for highlight and save button, it pushes highlights to both the state via actions and to the internal DB along with the article
  const addToSaved = (
    highlightId,
    articleId,
    highlightText,
    start,
    end,
    articleSource,
    articleTitle,
    articleDescription,
    articleDate,
    articleContent,
  ) => {
    //dispatch action to save highlight in state
    dispatch(setHighlight(highlightId, articleId, highlightText, start, end));
    //insert article into local DB
    insertArticle(
      articleId,
      articleSource,
      articleTitle,
      articleDescription,
      articleDate,
      articleContent,
    );
    //insert highlight into local db
    insertHighlight(articleId, highlightText, start, end, highlightId);
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
          {/* Module to allow for highlighting and running a function via button API info at https://www.npmjs.com/package/@alentoma/react-native-selectable-text */}
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
                articleSource,
                articleTitle,
                articleDescription,
                articleDate,
                articleContent,
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
