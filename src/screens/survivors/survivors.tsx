import React from 'react';
import {List} from 'react-native-paper';
import {Gears, Screen} from './components';
import useSurvivors from './hooks';

const Component = () => {
  const {data} = useSurvivors();

  return (
    <Screen testID="SurvivorsScreen">
      <List.Section>
        <List.Item title="Gear Grid" />
        <Gears data={data.gears} />
      </List.Section>
    </Screen>
  );
};

const options = {headerShown: false, title: ''};

export default class {
  static Component = Component;
  static options = options;
}
