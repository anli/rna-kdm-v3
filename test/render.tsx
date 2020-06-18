import React, {ReactElement} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {render as RNTRender} from 'react-native-testing-library';

const render = (children: ReactElement) => {
  return RNTRender(<PaperProvider>{children}</PaperProvider>);
};

export default render;
