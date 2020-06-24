import {FooterButtons, Gear, Preview, Screen} from '@components';
import React from 'react';
import {List} from 'react-native-paper';
import {SectionGrid} from 'react-native-super-grid';
import styled from 'styled-components/native';
import useGearSelect from './hooks';

const Component = () => {
  const {data, actions} = useGearSelect();
  return (
    <Screen testID="GearSelectScreen">
      <Preview testID="Preview" uri={data.selected?.imageUrl} />
      <Section>
        <SectionGrid<any>
          itemDimension={130}
          sections={data?.gears}
          renderItem={({item}) => {
            const isSelected = data.selected && data.selected.id === item.id;
            return (
              <Gear
                selected={isSelected}
                testID={`Gear.${item.id}`}
                width="100%"
                key={item.id}
                subtitle={item.name}
                onPress={() => actions.select(item)}
              />
            );
          }}
          renderSectionHeader={({section}) => (
            <List.Subheader>{section.title}</List.Subheader>
          )}
        />
      </Section>
      <FooterButtons confirm={actions.confirm} cancel={actions.cancel} />
    </Screen>
  );
};

const options = {headerShown: false, title: ''};

export default class {
  static Component = Component;
  static options = options;
}

const Section = styled(List.Section)`
  flex: 1;
`;
