import {mockNavigate} from '@mocks';
import {configureStore, EnhancedStore} from '@reduxjs/toolkit';
import {settlementSlice} from '@settlement';
import {render} from '@test';
import {defineFeature, loadFeature} from 'jest-cucumber';
import React from 'react';
import 'react-native';
import {fireEvent, RenderAPI} from 'react-native-testing-library';
import * as redux from 'react-redux';
import LocationSelectScreen from './location-select';
'';
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
    when('I am at "Settlement Screen"', async () => {});
    when('I press "Location Add Button"', async () => {});
    when('I should see "Location Select Screen"', async () => {
      store = configureStore({
        reducer: {settlement: settlementSlice.reducer},
      });
      component = render(<LocationSelectScreen.Component />, store);
    });
    when('I press "Lantern Hoard"', async () => {
      fireEvent.press(component.getByText('CONFIRM'));
      fireEvent.press(component.getByText('Lantern Hoard'));
    });
    when('I press "Confirm Button"', async () => {
      fireEvent.press(component.getByText('CONFIRM'));
    });
    then('I should see "Lantern Hoard"', async () => {
      expect(mockDispatch).toBeCalledWith({
        payload: 'lanternHoard',
        type: 'settlement/locationAdd',
      });
    });
  });
});
