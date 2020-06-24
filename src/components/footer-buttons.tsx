import React from 'react';
import {Button as NativeButton} from 'react-native-paper';
import styled from 'styled-components/native';

interface Props {
  confirm: () => any;
  cancel: () => any;
}
const FooterButton = ({confirm, cancel}: Props) => (
  <Footer>
    <Button mode="outlined" onPress={cancel}>
      CANCEL
    </Button>
    <Button mode="contained" onPress={confirm}>
      CONFIRM
    </Button>
  </Footer>
);

export default FooterButton;

const Footer = styled.View`
  background-color: white;
  padding: 16px 8px 16px 8px;
  flex-direction: row;
`;

const Button = styled(NativeButton)`
  flex: 1;
  margin-right: 8px;
  margin-left: 8px;
`;
