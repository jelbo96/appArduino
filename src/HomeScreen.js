import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

import Constants from 'expo-constants';

const PrintAlgo = (x) => console.log(x);

function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text>Pantalla de Inicio</Text>

        <Text>
          Parrafo 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis orci
          quis interdum euismod. Pellentesque dui eros, fringilla vitae dignissim at, finibus vitae
          nisi. Pellentesque interdum risus scelerisque condimentum sodales. Sed convallis
          ullamcorper faucibus. Nulla facilisis venenatis ligula pharetra dictum. Etiam lacinia
          ultrices lectus ut placerat. Fusce ac vestibulum nisl. Donec iaculis, dui vel commodo
          hendrerit, quam magna aliquet libero, in eleifend nulla sem in ante. Proin laoreet commodo
          iaculis. Pellentesque sed posuere ex. Fusce a velit laoreet felis lacinia finibus at eu
          tortor. Vivamus feugiat cursus mollis. Nulla blandit, eros a maximus mollis, mi enim
          facilisis massa, et tincidunt eros metus sit amet erat. Sed ut consequat ligula. Quisque
          ut purus eget ante imperdiet scelerisque. Etiam aliquet, lorem non vestibulum malesuada,
          dolor ante sodales leo, vitae maximus nisl erat sed nunc. Sed laoreet rhoncus purus, id
          tempus ex viverra eget. Aenean non vulputate quam. In dictum leo nec fringilla posuere.
          Aliquam dignissim aliquet sapien at auctor. Interdum et malesuada fames ac ante ipsum
          primis in faucibus. In hac habitasse platea dictumst. Orci varius natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Morbi hendrerit odio id gravida
          aliquam. Nunc enim ex, volutpat eget sapien sit amet, lobortis dapibus magna.
        </Text>
        <Text>
          Parrafo 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam venenatis orci
          quis interdum euismod. Pellentesque dui eros, fringilla vitae dignissim at, finibus vitae
          nisi. Pellentesque interdum risus scelerisque condimentum sodales. Sed convallis
          ullamcorper faucibus. Nulla facilisis venenatis ligula pharetra dictum. Etiam lacinia
          ultrices lectus ut placerat. Fusce ac vestibulum nisl. Donec iaculis, dui vel commodo
          hendrerit, quam magna aliquet libero, in eleifend nulla sem in ante. Proin laoreet commodo
          iaculis. Pellentesque sed posuere ex. Fusce a velit laoreet felis lacinia finibus at eu
          tortor. Vivamus feugiat cursus mollis. Nulla blandit, eros a maximus mollis, mi enim
          facilisis massa, et tincidunt eros metus sit amet erat. Sed ut consequat ligula. Quisque
          ut purus eget ante imperdiet scelerisque. Etiam aliquet, lorem non vestibulum malesuada,
          dolor ante sodales leo, vitae maximus nisl erat sed nunc. Sed laoreet rhoncus purus, id
          tempus ex viverra eget. Aenean non vulputate quam. In dictum leo nec fringilla posuere.
          Aliquam dignissim aliquet sapien at auctor. Interdum et malesuada fames ac ante ipsum
          primis in faucibus. In hac habitasse platea dictumst. Orci varius natoque penatibus et
          magnis dis parturient montes, nascetur ridiculus mus. Morbi hendrerit odio id gravida
          aliquam. Nunc enim ex, volutpat eget sapien sit amet, lobortis dapibus magna.
        </Text>

        {PrintAlgo('hola')}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight
  },
  scrollView: {
    // backgroundColor: 'white'
    // marginHorizontal: 20
  }
});

export default HomeScreen;
