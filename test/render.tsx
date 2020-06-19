import React, {ReactElement} from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {render as RNTRender} from 'react-native-testing-library';
import {Provider as StoreProvider} from 'react-redux';

const render = (children: ReactElement, store: any) => {
  return RNTRender(
    <StoreProvider store={store}>
      <PaperProvider>{children}</PaperProvider>
    </StoreProvider>,
  );
};

export default render;
