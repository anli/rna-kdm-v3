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
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}
const Gear = ({
  width,
  title,
  subtitle,
  onPress,
  testID,
  selected = false,
  top,
  right,
  bottom,
  left,
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
    {top && <TopAffinity color={top} />}
    {left && <LeftAffinity color={left} />}
    {right && <RightAffinity color={right} />}
    {bottom && <BottomAffinity color={bottom} />}
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

const LeftAffinity = styled.View`
  width: 8px;
  height: 24px;
  background-color: ${props => props?.color};
  position: absolute;
  top: 50%;
  margin-top: -12px;
`;

const RightAffinity = styled.View`
  width: 8px;
  height: 24px;
  background-color: ${props => props?.color};
  position: absolute;
  top: 50%;
  right: 0;
  margin-top: -12px;
`;

const TopAffinity = styled.View`
  width: 24px;
  height: 8px;
  background-color: ${props => props?.color};
  position: absolute;
  align-self: center;
`;

const BottomAffinity = styled.View`
  width: 24px;
  height: 8px;
  background-color: ${props => props?.color};
  position: absolute;
  align-self: center;
  bottom: 0;
`;
