import React from 'react';
import {Card as NativeCard} from 'react-native-paper';
import styled from 'styled-components/native';

interface Props {
  width: string;
  title: string;
  onPress: any;
}
const Gear = ({width, title, onPress}: Props) => (
  <Card width={width} onPress={onPress}>
    <Card.Title subtitle={title} />
  </Card>
);

const Card = styled(NativeCard)`
  margin-top: 8px;
  width: ${props => props.width};
`;

export default Gear;
