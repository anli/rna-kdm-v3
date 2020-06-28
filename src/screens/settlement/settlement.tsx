import {Gear, Preview, Screen} from '@components';
import React from 'react';
import {ScrollView} from 'react-native';
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

/* istanbul ignore next */
const Component = () => {
  const {props, actions} = useSettlement();

  return (
    <Screen testID="SettlementScreen">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Preview
          height="240px"
          testID="Preview"
          uri={props.preview?.imageUrl}
          imageHeight="360px"
        />
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
                  testID="PrincipleRemoveButton"
                  {...itemProps}
                  icon="delete"
                  onPress={actions.principleRemove}
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

        <List.Section>
          <List.Item
            testID="Innovations"
            title="Innovations"
            right={itemProps => (
              <>
                <IconButton
                  testID="InnovationResetButton"
                  {...itemProps}
                  icon="sync"
                  onPress={actions.innovationReset}
                />
                <IconButton
                  testID="InnovationAddButton"
                  {...itemProps}
                  icon="plus"
                  onPress={actions.innovationAdd}
                />
              </>
            )}
          />
          <Innovations horizontal showsHorizontalScrollIndicator={false}>
            {props.innovations.map(innovation => (
              <Gear
                key={innovation.id}
                selected={innovation.id === props.innovationSelectedId}
                testID={`Innovation.${innovation.id}`}
                width="120px"
                subtitle={innovation.name}
                onPress={() =>
                  actions.innovationSelected(innovation.id, innovation)
                }
              />
            ))}
          </Innovations>
        </List.Section>
      </ScrollView>
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

const Innovations = styled.ScrollView`
  margin-left: 16px;
`;
