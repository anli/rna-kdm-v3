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

const feature = loadFeature('./e2e/remove-location.feature');

defineFeature(feature, test => {
  let component: RenderAPI;
  let store: EnhancedStore<any>;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockNavigate.mockReset();
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    mockDispatch.mockReset();
  });

  test('remove location', ({given, when, then}) => {
    given('I am any', async () => {});
    given('data of "Locations" is "Blacksmith"', async () => {
      store = configureStore({
        reducer: {
          settlement: getSettlementSlice({
            principles: {
              newLife: undefined,
              death: undefined,
              conviction: undefined,
              society: undefined,
            },
            locations: ['blacksmith'],
          }).reducer,
        },
      });
    });
    given('I am at "Settlement Screen"', async () => {
      component = render(<SettlementScreen.Component />, store);
    });
    when('I press "Blacksmith"', async () => {
      fireEvent.press(component.getByTestId('LocationRemoveButton'));
      fireEvent.press(component.getByText('Blacksmith'));
    });
    when('I press "Location Remove Button"', async () => {
      fireEvent.press(component.getByTestId('LocationRemoveButton'));
    });
    then('I should see "No Blacksmith"', async () => {
      expect(mockDispatch).toHaveBeenLastCalledWith({
        payload: 'blacksmith',
        type: 'settlement/locationRemove',
      });
    });
  });
});
