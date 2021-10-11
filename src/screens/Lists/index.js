import React, {useEffect, useState, useRef, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  FlatList,
  SafeAreaView,
  Button,
} from 'react-native';
import {Dimensions} from 'react-native';
let {height, width} = Dimensions.get('window');
import {listData, loginUser, reinitializeArray} from './actions';
import {TextInput} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-material-dropdown';
import Constants, {By, For, Search} from '../../res/Constants';

const Lists = props => {
  const loading = useSelector(state => state.list.loading);
  const error = useSelector(state => state.list.error);
  const data = useSelector(state => state.list.data);
  const [currentPage, setCurrentPage] = useState(0);
  const [pLoader, pSetLoader] = useState(false);
  const savedCallback = useRef();
  const [searchText, setSearchText] = useState('');
  const [search, setSearch] = useState('story');
  const [by, setBy] = useState('');
  const [forDate, setForDate] = useState('');

  const dispatch = useDispatch();

  useInterval(() => {
    setCurrentPage(currentPage + 1);
    dispatch(listData(createParams()));
  }, 5000);

  const itemOPress = item => () => {
    Alert.alert(item.title, 'Author : ' + item.author, [{text: 'OK'}]);

    // Linking.openURL(item.url);
  };
  const getData = () => {
    //
  };

  const createParams = () => {
    return `tags=${search}&page=${currentPage}&query=${searchText}`;
  };

  const onRefresh = () => {
    pSetLoader(true);
    dispatch(listData(1));
    pSetLoader(false);
  };

  return (
    <>
      <SafeAreaView style={{flex: 1}} />

      <FlatList
        contentContainerStyle={styles.listWrapperStyle}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        ListHeaderComponent={
          <TextInput
            style={styles.ti_searchStyle}
            placeholderTextColor={'white'}
            placeholder={'Search stories by title author'}
            onChangeText={text => {
              dispatch(reinitializeArray([]));
              setSearchText(text);
            }}
          />
        }
        refreshing={pLoader}
        data={data}
        onEndReached={getData}
        ListFooterComponent={
          !loading ? null : <ActivityIndicator size={'large'} />
        }
        onEndReachedThreshold={0.1}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={itemOPress(item)}
            style={styles.listItemWrapper}>
            <Text style={styles.headlineWrapper}>{item.title}</Text>
            <View style={styles.authorViewWrapper}>
              <Text style={styles.authorStyle}>Author : </Text>
              <Text style={styles.authorNameStyle}>{item.author}</Text>
            </View>
            <View style={styles.dateViewWrapper}>
              <Text style={styles.dataStyle}>Date : </Text>
              <Text style={styles.dataTextStyle}>
                {new Date(item.created_at_i).toString('MMM dd')}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <View
        style={{
          height: 50,
          width: '80%',
          position: 'absolute',
          backgroundColor: 'grey',
          bottom: 20,
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
        }}>
        <View style={{flex: 0.3, justifyContent: 'center'}}>
          <Dropdown
            value={search}
            style={[{color: '#3B3B3B', fontSize: 14}]}
            onChangeText={(text, index, data) => {
              dispatch(reinitializeArray([]));
              setSearch(text);
            }}
            label={'Search'}
            data={Search}
          />
        </View>
        <View style={{flex: 0.3, justifyContent: 'center'}}>
          <Dropdown
            value={by}
            style={[{color: '#3B3B3B', fontSize: 14}]}
            onChangeText={(text, index, data) => {
              dispatch(reinitializeArray([]));
              setBy(text);
            }}
            label={'by'}
            data={By}
          />
        </View>
        <View style={{flex: 0.3, justifyContent: 'center'}}>
          <Dropdown
            value={forDate}
            style={[{color: '#3B3B3B', fontSize: 14}]}
            onChangeText={(text, index, data) => {
              dispatch(reinitializeArray([]));
              setForDate(text);
            }}
            label={'for'}
            data={For}
          />
        </View>
      </View>

      <SafeAreaView />
    </>
  );
};

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export const getItemLayout = (data, index) => ({
  length: width * 0.453,
  offset: width * 0.453 * index,
  index,
});

export default Lists;

const styles = StyleSheet.create({
  listWrapperStyle: {
    // flex: 1,
    flexGrow: 1,
    marginHorizontal: 20,
  },
  listItemWrapper: {
    height: 100,
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: 'white',
    shadowColor: '#0000000F',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 10,
    shadowRadius: 10,
    elevation: 1,
  },
  headlineWrapper: {fontWeight: '500', fontSize: 14, padding: 10},
  titleTextStyle: {},
  authorViewWrapper: {flexDirection: 'row', paddingHorizontal: 10},
  authorNameStyle: {fontSize: 12},

  dateViewWrapper: {flexDirection: 'row', paddingHorizontal: 10},
  dataTextStyle: {fontSize: 12, paddingTop: 3},
  ti_searchStyle: {
    height: 40,
    backgroundColor: 'grey',
    color: 'white',
    paddingHorizontal: 10,
  },
  dropdown: {
    // borderRadius: Dimen.vvvSmallTextSize,
    height: 140,
    paddingRight: 5,
    paddingHorizontal: 2,
    width: 100,
    justifyContent: 'center',
  },
});
