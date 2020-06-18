import React from 'react';
import styled from 'styled-components/native';
import Gear from './gear';

interface Item {
  name: string;
}

interface Props {
  data: (Item | undefined)[];
}

const Gears = ({data}: Props) => {
  return (
    <Wrapper>
      {data?.map((item, index) => (
        <Gear width="30%" key={index} title={item?.name || 'None'} />
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
