import {Gear} from '@components';
import React from 'react';
import styled from 'styled-components/native';

interface Item {
  name: string;
}

interface Props {
  data: (Item | undefined)[];
  onPress: (index: number) => any;
}

const Gears = ({data, onPress}: Props) => {
  return (
    <Wrapper>
      {data?.map((item, index) => (
        <Gear
          width="30%"
          key={index}
          title={item?.name || 'None'}
          onPress={() => onPress(index)}
        />
      ))}
    </Wrapper>
  );
};

export default Gears;

const Wrapper = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;
