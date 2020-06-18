import React from 'react';
import {Text, View} from 'react-native';

const Component = () => {
  return (
    <View testID="HomeScreen">
      <Text>Home</Text>
    </View>
  );
};

const HomeScreenOptions = {headerShown: false, title: ''};

export default class {
  static Component = Component;
  static Options = HomeScreenOptions;
}
