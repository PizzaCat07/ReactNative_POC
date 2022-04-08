import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Body = props => {
  return (
    <View>
      <View style={styles.spacing}>
        <Text>{props.description}</Text>
      </View>
      <View style={styles.spacing}>
        <Text>{props.content}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  spacing: {
    padding: '15',
  },
});

export default Body;
