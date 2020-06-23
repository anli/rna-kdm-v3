import React from 'react';
import {Card as NativeCard} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

interface Props {
  width: string;
  title?: string;
  onPress: any;
  testID: string;
  selected?: boolean;
  subtitle?: string;
}
const Gear = ({
  width,
  title,
  subtitle,
  onPress,
  testID,
  selected = false,
}: Props) => (
  <Card testID={testID} width={width} onPress={onPress}>
    <Card.Title
      title={title}
      subtitle={subtitle}
      right={(props: any) =>
        selected && (
          <SelectedIcon
            testID={`${testID}.Selected`}
            {...props}
            name="check-circle"
            size={24}
            color="#5807eb"
          />
        )
      }
    />
  </Card>
);

export default Gear;

const Card = styled(NativeCard)`
  margin-top: 8px;
  width: ${props => props.width};
`;

const SelectedIcon = styled(Icon)`
  margin-right: 8px;
`;
