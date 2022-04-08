import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
  FlatList,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Highlighter from 'react-native-highlight-words';

const Item = ({title, source, date, description}) => (
  <View style={styles.card}>
    <View>
      <Text style={styles.title}>{title}</Text>
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
  const navigation = useNavigation();
  const searchWords = [searchPhrase];

  const renderItem = ({item}) => {
    // when no input, show all
    if (searchPhrase === '') {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('Text', {articleId: item.id})}>
          <View>
            <Item
              title={item.title}
              source={item.source}
              date={item.date}
              description={item.description}
            />
          </View>
        </TouchableOpacity>
      );
    }
    // filter of the name
    if (
      item.title
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('Text', {articleId: item.id})}>
          <View style={styles.card}>
            <View>
              <Text style={styles.title}>
                <Highlighter
                  highlightStyle={{backgroundColor: 'yellow'}}
                  searchWords={searchWords}
                  textToHighlight={item.title}
                />
              </Text>
            </View>
            <View>
              <Text>{item.source}</Text>
            </View>
            <View>
              <Text>{item.date}</Text>
            </View>
            <View>
              <Text style={styles.description}>
                <Highlighter
                  highlightStyle={{backgroundColor: 'yellow'}}
                  searchWords={searchWords}
                  textToHighlight={item.description}
                />
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
    if (
      item.description
        .toUpperCase()
        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
    ) {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('Text', {articleId: item.id})}>
          <View style={styles.card}>
            <View>
              <Text style={styles.title}>
                <Highlighter
                  highlightStyle={{backgroundColor: 'yellow'}}
                  searchWords={searchWords}
                  textToHighlight={item.title}
                />
              </Text>
            </View>
            <View>
              <Text>{item.source}</Text>
            </View>
            <View>
              <Text>{item.date}</Text>
            </View>
            <View>
              <Text style={styles.description}>
                <Highlighter
                  highlightStyle={{backgroundColor: 'yellow'}}
                  searchWords={searchWords}
                  textToHighlight={item.description}
                />
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
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

/* const SummaryCard = (props) => {
  return (
    <TouchableNativeFeedback onPress={props.onSelect} useForeground>
      <View style={styles.card}>
        <View>
          <Text style={styles.title}>{props.title}</Text>
        </View>
        <View>
          <Text>{props.source}</Text>
        </View>
        <View>
          <Text>{props.date}</Text>
        </View>
        <View>
          <Text style={styles.description}>{props.description}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}; */

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
  description: {
    paddingTop: 10,
  },
});

export default SummaryCard;
