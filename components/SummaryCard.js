import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Highlighter from 'react-native-highlight-words';

//create item component
const Item = ({title, searchWords, source, date, description}) => (
  <View style={styles.card}>
    <View>
      <Text style={styles.title}>
        <Highlighter
          highlightStyle={{backgroundColor: 'yellow'}}
          searchWords={searchWords}
          textToHighlight={title}
        />
      </Text>
    </View>
    <View>
      <Text>{source}</Text>
    </View>
    <View>
      <Text>{date}</Text>
    </View>
    <View>
      <Text style={styles.description}>{description}</Text>
    </View>
  </View>
);

const SummaryCard = ({searchPhrase, setClicked, data}) => {
  //data is the loaded articles from state
  const navigation = useNavigation();
  const searchWords = [searchPhrase];

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Text', {articleId: item.id})}>
        <View>
          <Item
            title={item.title}
            searchWords={searchWords}
            source={item.source}
            date={item.publishTime}
            description={item.description}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      onStartShouldSetResponder={() => {
        setClicked(false);
      }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
    color: 'red',
  },
  description: {
    color: 'black',
    paddingTop: 5,
  },
});

export default SummaryCard;
