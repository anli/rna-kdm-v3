import {Gear} from '@components';
import R from 'ramda';
import React from 'react';
import styled from 'styled-components/native';

interface Item {
  name: string;
  imageUrl: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
}

interface Props {
  data: (Item | undefined)[];
  onPress: (index: number, item: Item | undefined) => any;
  selectedIndex?: number;
}

const Gears = ({data, onPress, selectedIndex}: Props) => {
  return (
    <Wrapper>
      {data?.map((item, index) => {
        const isSelected = !R.isNil(selectedIndex) && index === selectedIndex;
        return (
          <Gear
            selected={isSelected}
            testID={`Gear${index}`}
            width="30%"
            key={index}
            subtitle={item?.name || 'None'}
            onPress={() => onPress(index, item)}
            top={item?.top}
            right={item?.right}
            bottom={item?.bottom}
            left={item?.left}
          />
        );
      })}
    </Wrapper>
  );
};

export default Gears;

const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
