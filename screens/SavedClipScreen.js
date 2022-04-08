import React from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import HighlightCard from '../components/HighlightCard';
import {useSelector} from 'react-redux';

const SavedClipScreen = props => {
  const {savedHighlights} = useSelector(state => state.highlight);

  const returnArticleHandler = articleId => {
    props.navigation.navigate('Text', {
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
        <FlatList
          data={savedHighlights}
          keyExtractor={item => item.id}
          renderItem={itemData => (
            <HighlightCard
              text={itemData.item.text}
              id={itemData.item.id}
              onSelect={() => returnArticleHandler(itemData.item.articleId)}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SavedClipScreen;
