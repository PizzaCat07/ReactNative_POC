import React from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import HighlightCard from '../components/HighlightCard';
import {useSelector} from 'react-redux';

const SavedClipScreen = props => {
  const {savedHighlights} = useSelector(state => state.highlight);

  const returnArticleHandler = (id, text) => {
    props.navigation.navigate('Highlight', {
      articleId: id,
      text: text,
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
                  itemData.item.articleId,
                  itemData.item.text,
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
