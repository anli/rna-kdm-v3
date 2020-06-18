import React from 'react';
import {Card as NativeCard} from 'react-native-paper';
import styled from 'styled-components/native';

interface Props {
  width: string;
  title: string;
}
const Gear = ({width, title}: Props) => (
  <Card width={width}>
    <Card.Title subtitle={title} />
  </Card>
);

const Card = styled(NativeCard)`
  margin-top: 8px;
  width: ${props => props.width};
`;

export default Gear;
