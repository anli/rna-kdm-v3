import {mockNavigate} from '@mocks';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {getSettlementSlice, settlementSlice} from '@settlement';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import * as redux from 'react-redux';
import SettlementScreen from './settlement';

const feature = loadFeature('./e2e/add-active-innovation.feature');

defineFeature(feature, test => {
  let component: RenderAPI;
  let store: EnhancedStore<any>;
  const mockDispatch = jest.fn();

  beforeEach(() => {
    mockNavigate.mockReset();
    jest.spyOn(redux, 'useDispatch').mockReturnValue(mockDispatch);
    mockDispatch.mockReset();
  });

  test('reset active innovation', ({given, when, then}) => {
    given('I am any', async () => {});
    given('data of "Innovation" is "Language"', async () => {
      store = configureStore({
        reducer: {
          settlement: getSettlementSlice({
            principles: {
              newLife: undefined,
              death: undefined,
              conviction: undefined,
              society: undefined,
            },
            innovations: ['language'],
          }).reducer,
        },
      });
    });
    when('I am at "Settlement Screen"', async () => {
      component = render(<SettlementScreen.Component />, store);
    });
    when('I press "Innovation Reset Button"', async () => {
      mockDispatch.mockReset();
      fireEvent.press(component.getByTestId('InnovationResetButton'));
    });
    then('I should see "No Innovations"', async () => {
      expect(mockDispatch).toBeCalledWith({
        payload: undefined,
        type: 'settlement/innovationReset',
      });
      expect(mockDispatch).toBeCalledTimes(1);
    });
  });

  test('add active innovation', ({given, when, then}) => {
    given('I am any', async () => {});
    when('I am at "Settlement Screen"', async () => {
      store = configureStore({
        reducer: {settlement: settlementSlice.reducer},
      });
      component = render(<SettlementScreen.Component />, store);
    });
    when('I press "Innovation Add Button"', async () => {
      fireEvent.press(component.getByTestId('InnovationAddButton'));
    });
    then('I should see "Innovation Select Screen"', async () => {
      expect(mockNavigate).toBeCalledWith('InnovationSelectScreen', {
        innovations: [],
      });
    });
    when('I press "Language"', async () => {});
    when('I press "Confirm Button"', async () => {});
    then('I should see "Language"', async () => {});
  });
});
