import {mockNavigate} from '@mocks';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {getSettlementSlice} from '@settlement';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import * as redux from 'react-redux';
import SettlementScreen from '../settlement';

const feature = loadFeature('./e2e/draw-settlement-event.feature');

defineFeature(feature, test => {
  let component: RenderAPI;
  let store: EnhancedStore<any>;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockNavigate.mockReset();
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    mockDispatch.mockReset();
  });

  test('draw settlement event', ({given, when, then}) => {
    given('I am any', async () => {});
    when('I am at "Settlement Screen"', async () => {
      store = configureStore({
        reducer: {
          settlement: getSettlementSlice({
            principles: {
              newLife: undefined,
              death: undefined,
              conviction: undefined,
              society: undefined,
            },
          }).reducer,
        },
      });
      component = render(<SettlementScreen.Component />, store);
    });
    when('I press "Draw Settlement Event Button"', async () => {
      fireEvent.press(component.getByTestId('SettlementEventDrawButton'));
    });
    then('I should see "Settlement Event"', async () => {
      expect(component.getByTestId('SettlementEvent')).toBeDefined();
    });
  });
});
