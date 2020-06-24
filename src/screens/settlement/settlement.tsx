import {Gear, Preview, Screen} from '@components';
import React from 'react';
import {IconButton, List} from 'react-native-paper';
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
      <Preview height="240px" testID="Preview" uri={props.preview?.imageUrl} />
      <List.Section>
        <List.Item
          testID="Principles"
          title="Principles"
          right={itemProps => (
            <>
              <IconButton
                testID="PrincipleResetButton"
                {...itemProps}
                icon="sync"
                onPress={actions.principleReset}
              />
              <IconButton
                testID="PrincipleSetButton"
                {...itemProps}
                icon="plus"
                onPress={actions.principleSet}
              />
            </>
          )}
        />
        <Principles>
          {PRINCIPLES.map(principle => (
            <Gear
              key={principle.key}
              selected={principle.key === props.principleSelectedId}
              testID={`Principle.${principle.key}`}
              width="45%"
              subtitle={props.principles[principle.key]?.name || 'None'}
              title={principle.label}
              onPress={() =>
                actions.principleSelected(
                  principle.key,
                  props.principles[principle.key],
                )
              }
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
