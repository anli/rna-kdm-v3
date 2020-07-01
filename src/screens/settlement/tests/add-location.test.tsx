import {mockNavigate} from '@mocks';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {getSettlementSlice, settlementSlice} from '@settlement';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import * as redux from 'react-redux';
import SettlementScreen from '../settlement';

const feature = loadFeature('./e2e/add-location.feature');

defineFeature(feature, test => {
  let component: RenderAPI;
  let store: EnhancedStore<any>;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockNavigate.mockReset();
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    mockDispatch.mockReset();
  });

  test('add location', ({given, when, then}) => {
    given('I am any', async () => {});
    when('I am at "Settlement Screen"', async () => {
      store = configureStore({
        reducer: {settlement: settlementSlice.reducer},
      });
      component = render(<SettlementScreen.Component />, store);
    });
    when('I press "Location Add Button"', async () => {
      fireEvent.press(component.getByTestId('LocationAddButton'));
    });
    when('I should see "Location Select Screen"', async () => {
      expect(mockNavigate).toBeCalledWith('LocationSelectScreen');
    });
    when('I press "Lantern Hoard"', async () => {});
    when('I press "Confirm Button"', async () => {});
    then('I should see "Lantern Hoard"', async () => {
      store = configureStore({
        reducer: {
          settlement: getSettlementSlice({
            principles: {
              newLife: undefined,
              death: undefined,
              conviction: undefined,
              society: undefined,
            },
            locations: ['lanternHoard'],
          }).reducer,
        },
      });
      component = render(<SettlementScreen.Component />, store);

      expect(component.getByText('Lantern Hoard')).toBeDefined();
      fireEvent.press(component.getByText('Lantern Hoard'));
      fireEvent.press(component.getByTestId('LocationResetButton'));
    });
  });
});
