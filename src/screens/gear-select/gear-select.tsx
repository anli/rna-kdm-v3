import {Gear, Screen} from '@components';
import React from 'react';
import {Button as NativeButton, List} from 'react-native-paper';
import {SectionGrid} from 'react-native-super-grid';
import styled from 'styled-components/native';
import useGearSelect from './hooks';

const Component = () => {
  const {data, actions} = useGearSelect();
  return (
    <Screen testID="GearSelectScreen">
      <Section>
        <SectionGrid<any>
          itemDimension={130}
          sections={data?.gears}
          renderItem={({item}) => (
            <Gear
              width="100%"
              key={item.id}
              title={item.name}
              onPress={() => actions.select(item)}
            />
          )}
          renderSectionHeader={({section}) => (
            <List.Subheader>{section.title}</List.Subheader>
          )}
        />
      </Section>
      <Footer>
        <Button mode="outlined" onPress={actions.cancel}>
          CANCEL
        </Button>
        <Button mode="contained" onPress={actions.confirm}>
          CONFIRM
        </Button>
      </Footer>
    </Screen>
  );
};

const options = {headerShown: false, title: ''};

export default class {
  static Component = Component;
  static options = options;
}

const Footer = styled.View`
  background-color: white;
  padding: 16px 8px 16px 8px;
  flex-direction: row;
`;

const Section = styled(List.Section)`
  flex: 1;
`;

const Button = styled(NativeButton)`
  flex: 1;
  margin-right: 8px;
  margin-left: 8px;
`;
