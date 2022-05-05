import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import HighlightCard from '../components/HighlightCard';
import {useDispatch} from 'react-redux';
import {db} from '../database/db';

import {deleteSavedHighlight} from '../store/actions/saveHighlight';

const SavedClipScreen = props => {
  //set state for highlight
  const [highlight, setHighlight] = useState([]);
  const dispatch = useDispatch();

  //function to get highlights from local db
  const getHighlight = () => {
    //reset highlight state to empty array
    setHighlight([]);
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM highlight', [], (tx, results) => {
        const temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setHighlight(temp);
      });
    });
  };

  //function to del highlight from local db
  const delHighlight = pk => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM highlight WHERE pk=?', [pk]);
    });
  };

  //combine functions to delete highlights from state and local db
  const delHighlightHandler = (pk, id) => {
    delHighlight(pk);
    dispatch(deleteSavedHighlight(id));
    setHighlight(getHighlight());
  };

  useEffect(() => {
    getHighlight();
    console.log('get highlights');
  }, []);

  const savedHighlights = highlight;

  //navigation to move to highlight screen
  const returnArticleHandler = articleId => {
    props.navigation.navigate('Highlight', {
      articleId: articleId,
    });
  };

  return (
    <View>
      <View>
        <View>
          <FlatList
            data={savedHighlights}
            keyExtractor={item => item.pk}
            renderItem={itemData => (
              <HighlightCard
                text={itemData.item.text}
                id={itemData.item.id}
                onSelect={() => returnArticleHandler(itemData.item.id)}
                onDel={() =>
                  delHighlightHandler(itemData.item.pk, itemData.item.state_id)
                }
              />
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SavedClipScreen;
