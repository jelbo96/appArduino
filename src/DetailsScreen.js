import React from 'react';
import {
  RefreshControl,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  View,
  FlatList,
  Dimensions,
  ToastAndroid
} from 'react-native';

import Constants from 'expo-constants';

const widthConst = Dimensions.get('screen').width;

export default function DetailsScreen() {
  const initialData = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Susan Bert',
      image: '1'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Neil Arms',
      image: '2'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Carla Neice',
      image: '3'
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53cbb28ba',
      title: 'Janice Hanner',
      image: '4'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fcd91aa97f63',
      title: 'James Sullivan',
      image: '5'
    }
  ];
  const [refreshing, setRefreshing] = React.useState(false);
  const [listData, setListData] = React.useState(initialData);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);

    const response = await fetch(
      'http://www.mocky.io/v2/5e3315753200008abe94d3d8?mocky-delay=2000ms'
    );
    const responseJson = await response.json();
    console.log(responseJson);

    setListData(responseJson.result.concat(initialData));

    setRefreshing(false);
  }, [refreshing]);

  function Item({ title, image }) {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{title}</Text>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>
        <Text style={styles.titleText}>Detalles</Text>
        <FlatList
          data={listData}
          renderItem={({ item }) => <Item title={item.title} image={item.image} />}
          keyExtractor={(item) => item.id}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          contentContainerStyle={styles.list}
        />
        <View style={styles.enappdWrapper} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewContainer: {
    padding: 20,
    paddingTop: 35
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#eeeeee'
  },
  list: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: widthConst,
    flex: 1
  },
  enappdWrapper: {
    position: 'absolute',
    bottom: 0
  },

  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 20
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#aaa'
  },
  itemText: {
    paddingTop: 5,
    paddingLeft: 10,
    fontSize: 18
  },
  titleText: {
    fontSize: 42,
    fontWeight: 'bold',
    paddingBottom: 15
  }
});
