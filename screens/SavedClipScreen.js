import React from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import HighlightCard from '../components/HighlightCard';
import {useSelector} from 'react-redux';

const SavedClipScreen = props => {
  const {savedHighlights} = useSelector(state => state.highlight);

  const returnArticleHandler = (id, articleId, start, end) => {
    props.navigation.navigate('Highlight', {
      id: id,
      articleId: articleId,
      start: start,
      end: end,
    });
  };

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
              onSelect={() =>
                returnArticleHandler(
                  itemData.item.id,
                  itemData.item.articleId,
                  itemData.item.start,
                  itemData.item.end,
                )
              }
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SavedClipScreen;
