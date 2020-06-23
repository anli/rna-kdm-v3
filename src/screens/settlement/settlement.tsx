import {Gear, Screen} from '@components';
import React from 'react';
import {List} from 'react-native-paper';
import styled from 'styled-components/native';
import useSettlement from './hooks';

type PrincipleKey = 'newLife' | 'death' | 'conviction' | 'society';

const PRINCIPLES: {label: string; key: PrincipleKey}[] = [
  {label: 'New Life', key: 'newLife'},
  {label: 'Death', key: 'death'},
  {label: 'Conviction', key: 'conviction'},
  {label: 'Society', key: 'society'},
];

const Component = () => {
  const {props, actions} = useSettlement();

  return (
    <Screen testID="SettlementScreen">
      <List.Section>
        <List.Item testID="Principles" title="Principles" />
        <Principles>
          {PRINCIPLES.map(principle => (
            <Gear
              key={principle.key}
              selected={false}
              testID={`Principle.${principle.key}`}
              width="45%"
              title={props[principle.key]}
              subtitle={principle.label}
              onPress={() => actions.principleSelected(principle.key)}
            />
          ))}
        </Principles>
      </List.Section>
    </Screen>
  );
};

const options = {headerShown: false, title: ''};

export default class {
  static Component = Component;
  static options = options;
}

const Principles = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
