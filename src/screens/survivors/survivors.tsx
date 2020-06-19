import {Preview, Screen} from '@components';
import React from 'react';
import {IconButton, List} from 'react-native-paper';
import {Gears} from './components';
import useSurvivors from './hooks';

const Component = () => {
  const {data, actions} = useSurvivors();

  return (
    <Screen testID="SurvivorsScreen">
      <Preview testID="Preview" uri={data.preview?.imageUrl} />
      <List.Section>
        <List.Item
          title="Gear Grid"
          right={props => (
            <>
              <IconButton
                testID="GearRemoveButton"
                {...props}
                icon="delete"
                onPress={actions.gearRemove}
              />
              <IconButton
                testID="GearAddButton"
                {...props}
                icon="plus"
                onPress={actions.gearAdd}
              />
            </>
          )}
        />
        <Gears
          data={data.gears}
          onPress={actions.gearSelect}
          selectedIndex={data.gearSelectedIndex}
        />
      </List.Section>
    </Screen>
  );
};

const options = {headerShown: false, title: ''};

export default class {
  static Component = Component;
  static options = options;
}
