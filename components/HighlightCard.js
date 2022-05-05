import React from 'react';
import {View, Text, StyleSheet, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const HighlightCard = props => {
  return (
    <View>
      <TouchableNativeFeedback onPress={props.onSelect} useForeground>
        <View style={styles.card}>
          <View style={styles.highlight}>
            <Text>{props.text}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      <View style={styles.icon}>
        <Icon name="md-trash-sharp" size={30} onPress={props.onDel} />
      </View>
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
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default HighlightCard;
