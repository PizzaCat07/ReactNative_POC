import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  Button,
} from 'react-native';
import {useDispatch} from 'react-redux';

import {deleteSavedHighlight} from '../store/actions/saveHighlight';

const HighlightCard = props => {
  const dispatch = useDispatch();

  return (
    <View>
      <Button
        title="Delete"
        onPress={() => dispatch(deleteSavedHighlight(props.id))}
      />
      <TouchableNativeFeedback onPress={props.onSelect} useForeground>
        <View style={styles.card}>
          <View style={styles.highlight}>
            <Text>{props.text}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingBottom: 10,
  },
  title: {
    fontSize: 15,
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  highlight: {
    paddingTop: 10,
  },
});

export default HighlightCard;
